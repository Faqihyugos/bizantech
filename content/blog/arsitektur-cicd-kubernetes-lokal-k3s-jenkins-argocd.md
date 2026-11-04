---
external: false
draft: false
title: "Cara Saya Membangun Arsitektur CI/CD & Kubernetes Multi-Node di Laptop Tanpa Cloud"
description: "Catatan teknis dan langkah praktis bagaimana saya membangun lab DevOps berstandar production di laptop lokal: Terraform IaC, K3s multi-node, Jenkins Shared Library, Trivy DevSecOps, ArgoCD GitOps, hingga Envoy Gateway API."
date: 2026-11-03
ogImagePath: "/images/cicd-local-track.jpg"
---

Pernahkah kamu ingin mengeksplorasi arsitektur Kubernetes dan alur CI/CD berstandar enterprise, tapi langsung mundur teratur begitu melihat estimasi tagihan cloud?

Menyewa cluster *managed* seperti AWS EKS atau GCP GKE ditambah NAT gateway, load balancer, dan compute node bisa dengan mudah membakar jutaan rupiah per bulan. Padahal saat belajar atau riset arsitektur, kita sering butuh coba-coba, bikin kesalahan, *destroy*, lalu *re-deploy* berulang kali.

Itulah alasan kenapa saya memutuskan untuk membangun seluruh ekosistem ini langsung di laptop saya. 100% lokal, tanpa cloud, namun dengan standar arsitektur yang sama persis dengan lingkungan *production*. 

Arsitektur yang saya bangun ini mengacu pada blueprint **CI/CD Local Track** ([Academy DevOps Indonesia](https://academy.naipospos.cloud/#/learn/local)). Di sini, saya akan membagikan bagaimana cara saya merancang, mengonfigurasi, dan menghubungkan setiap komponennya dari awal sampai aplikasi bisa diakses dengan mulus.

![Peta Alur Arsitektur CI/CD Local Track](/images/cicd-local-track.jpg)

---

## Gambaran Besar Arsitektur yang Saya Bangun

Sebelum masuk ke konfigurasi teknis, mari lihat bagaimana alur data dan otomasi yang saya jalankan di workstation saya:

```
[ Laptop Developer ]
  │  (Repo Aplikasi: Golang / Next.js)
  │  git push (commit / PR merge)
  ▼
[ Jenkins CI Container (Docker) ]
  │  • Webhook otomatis mendeteksi push
  │  • Menjalankan Jenkinsfile via Shared Library
  │  • Build image & unit test
  │  • DevSecOps: Scanning celah keamanan via Trivy
  │  • Push image ke registry & update commit ke GitOps repo
  ▼
[ ArgoCD GitOps Controller ]
  │  • Memantau perubahan di GitOps Manifest Repo
  │  • Reconcile & Self-Healing cluster state
  │  • Kustomize Overlays (dev/staging/prod)
  ▼
[ K8s Multi-Node K3s Cluster ]
  │  • 1 Control-Plane Node + 2 Worker Nodes (VMs)
  │  • Otomatis dibuat dengan Terraform & Cloud-Init
  ▼
[ Envoy Gateway API ]
  │  • GatewayClass & Gateway CRD
  │  • HTTPRoute reverse proxy & ingress routing
  ▼
[ Aplikasi Diakses via Local DNS / Browser ]
```

Dengan desain ini, laptop saya tidak sekadar menjalankan satu container Docker yang kesepian, melainkan miniatur ekosistem cloud sejati.

Berikut adalah langkah demi langkah bagaimana cara saya mewujudkannya:

---

## Langkah 1: Menyiapkan Fondasi dan Strategi 2 Repositori

Kesalahan umum yang dulu sering saya lakukan adalah mencampuradukkan kode aplikasi dengan manifest Kubernetes dalam satu repositori Git. Akibatnya, setiap kali pipeline CI mengubah tag image di manifest, terjadi loop *infinite build*.

Untuk setup ini, saya memisahkan tanggung jawabnya menjadi **dua repositori terpisah**:

1. **`app-service` (Application Repository)**:
   Berisi source code aplikasi (misalnya Golang REST API atau Next.js), unit tests, `Dockerfile`, dan `Jenkinsfile`.
2. **`gitops-manifests` (Manifest Repository)**:
   Khusus menampung manifest Kubernetes dengan struktur Kustomize (`base/` dan `overlays/dev/`). Developer biasa tidak perlu menyentuh repo ini; repo ini hanya di-update oleh bot Jenkins dan dipantau oleh ArgoCD.

Untuk spesifikasi mesin, saya mengalokasikan sekitar 16 GB RAM dan 4 core vCPU dari laptop saya. Saya juga memastikan Docker socket (`/var/run/docker.sock`) dapat diakses secara aman oleh container Jenkins agar bisa menjalankan perintah Docker di dalam alur CI.

---

## Langkah 2: Otomasi Cluster K3s Multi-Node dengan Terraform

Saya tidak ingin menginstal VM dan Kubernetes secara manual karena jika ada yang rusak, proses instalasi ulangnya memakan waktu lama. Saya memilih **Terraform** untuk mem-provisioning 3 node virtual machine lokal (1 node *control-plane* dan 2 node *worker*):

```
master-01 (Control Plane)  : 2 vCPU, 4GB RAM
worker-01 (Worker Node 1)  : 2 vCPU, 3GB RAM
worker-02 (Worker Node 2)  : 2 vCPU, 3GB RAM
```

### Script Cloud-Init untuk K3s Bootstrap
Di dalam konfigurasi Terraform, saya menyuntikkan script *cloud-init* agar saat VM booting pertama kali, binary K3s langsung terpasang otomatis:

```bash
#!/bin/bash
# Install K3s di node master
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik --disable servicelb" sh -

# Ambil token join untuk worker node
K3S_TOKEN=$(sudo cat /var/lib/rancher/k3s/server/node-token)
echo $K3S_TOKEN > /tmp/k3s_token
```

> **Catatan Teknis Saya**: Saya sengaja menambahkan flag `--disable traefik` dan `--disable servicelb` pada instalasi K3s. Alasannya? Saya ingin menggunakan standard **Kubernetes Gateway API** dengan **Envoy** sebagai pintu masuk ingress modern kita, bukan Traefik bawaan K3s.

Setelah Terraform selesai menjalankan provisioning (`terraform apply`), saya mengekstrak file `kubeconfig` ke laptop lokal. Cukup dengan menjalankan `kubectl get nodes`, cluster 3-node lokal saya sudah berstatus `Ready`!

---

## Langkah 3: Membangun Custom Jenkins Container & Shared Library

Image Jenkins standar di Docker Hub belum memiliki peralatan lengkap untuk pipeline modern. Alih-alih melakukan instalasi manual setiap kali container restart, saya membuat `Dockerfile` kustom sendiri:

```dockerfile
FROM jenkins/jenkins:lts-jdk17
USER root

# Pasang dependency yang saya butuhkan di pipeline: Docker CLI, Trivy, kubectl, dan Helm
RUN apt-get update && apt-get install -y \
    curl \
    git \
    ca-certificates \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bookworm stable" > /etc/apt/sources.list.d/docker.list \
    && apt-get update && apt-get install -y docker-ce-cli \
    && curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin \
    && curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl \
    && rm -rf /var/lib/apt/lists/*

USER jenkins
```

Container Jenkins ini saya jalankan dengan me-mount docker socket host:
```bash
docker run -d \
  --name jenkins-ci \
  -p 8080:8080 -p 50000:50000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v jenkins_home:/var/jenkins_home \
  custom-jenkins:local
```

### Menggunakan Global Shared Library
Agar file `Jenkinsfile` di aplikasi saya tetap ringkas dan deklaratif, saya menaruh fungsi-fungsi *build*, *test*, *security scan*, dan *gitops update* ke dalam repositori **Jenkins Shared Library**. Jadi di masa mendatang, jika saya membuat microservice baru, saya hanya perlu memanggil logika yang sama tanpa *copy-paste* kode pipeline.

---

## Langkah 4: Menerapkan DevSecOps dengan Trivy

Keamanan bukanlah langkah opsional yang dipikirkan belakangan (*Shift-Left Security*). Di dalam pipeline CI yang saya bangun, saya menyisipkan pemindaian otomatis menggunakan **Trivy** sebelum image diizinkan masuk ke registry lokal.

Trivy mengecek dua hal:
1. Vulnerability (CVE) pada layer OS dan library bahasa pemrograman.
2. Misconfiguration dan kebocoran credential (secret scanner).

Berikut adalah potongan tahapan *Trivy scan* dan pembaruan GitOps yang saya jalankan di dalam `Jenkinsfile`:

```groovy
stage('DevSecOps: Trivy Security Scan') {
    steps {
        echo "Memindai celah keamanan pada container image..."
        // Hentikan pipeline jika ditemukan vulnerability dengan level CRITICAL
        sh """
            trivy image \
              --exit-code 1 \
              --severity CRITICAL \
              --no-progress \
              ${REGISTRY}/${APP_NAME}:${IMAGE_TAG}
        """
    }
}

stage('Update GitOps Manifest') {
    steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'gitops-deploy-key', keyFileVariable: 'SSH_KEY')]) {
            sh """
                git clone ${GITOPS_REPO} gitops-repo
                cd gitops-repo/overlays/dev
                kustomize edit set image ${REGISTRY}/${APP_NAME}=${REGISTRY}/${APP_NAME}:${IMAGE_TAG}
                git config user.name "Jenkins Automation"
                git config user.email "bot@ci.local"
                git commit -am "chore(release): deploy ${APP_NAME} image ${IMAGE_TAG}"
                git push origin main
            """
        }
    }
}
```

Jika ada CVE level `CRITICAL`, pipeline otomatis gagal dan image bermasalah tidak akan pernah menyentuh cluster.

---

## Langkah 5: Otomasi CD dengan ArgoCD (GitOps Engine)

Untuk Continuous Delivery, saya memasang **ArgoCD** di namespace `argocd` pada cluster K3s lokal saya.

ArgoCD bertindak sebagai rekonsiliator deklaratif. Begitu Jenkins selesai melakukan *git push* ke repo `gitops-manifests`, ArgoCD mendeteksi adanya perbedaan (*drift*) antara status di Git dan status aktual di cluster, lalu langsung melakukan sinkronisasi otomatis (*auto-sync*).

Struktur manifest Kustomize yang saya gunakan:
```
gitops-manifests/
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
└── overlays/
    └── dev/
        ├── kustomization.yaml
        └── patch-replicas.yaml
```

Dengan cara ini, saya tidak perlu lagi membuka terminal untuk menjalankan `kubectl apply`. Segala perubahan infrastruktur terdokumentasi rapi di dalam riwayat commit Git.

---

## Langkah 6: Routing Modern Menggunakan Envoy Gateway API

Banyak panduan DevOps yang masih menggunakan Ingress NGINX klasik. Namun untuk setup ini, saya memutuskan mengadopsi standar resmi terbaru Kubernetes: **Kubernetes Gateway API** dengan controller **Envoy Gateway**.

### Mengapa Gateway API?
Gateway API memisahkan peran antara penyedia infrastruktur (*cluster operator*) dan pengembang aplikasi (*developer*). Operator menentukan `GatewayClass` dan `Gateway`, sedangkan developer cukup membuat manifest `HTTPRoute`.

Berikut adalah manifest `HTTPRoute` yang saya buat untuk merutekan traffic lokal ke microservice saya:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: local-service-route
  namespace: default
spec:
  parentRefs:
    - name: eg-gateway
      namespace: envoy-gateway-system
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /api/v1
      backendRefs:
        - name: golang-web-service
          port: 8080
```

Saya cukup menambahkan satu baris resolusi domain lokal di `/etc/hosts` laptop saya:
```text
192.168.64.10  api.local.dev app.local.dev
```

Kini saat saya mengakses `http://api.local.dev/api/v1` di browser laptop saya, permintaan langsung diarahkan oleh Envoy Gateway ke pod aplikasi yang berjalan di dalam cluster K3s!

---

## Tantangan & Troubleshooting yang Saya Hadapi

Membangun arsitektur enterprise di komputer lokal tentu tidak luput dari tantangan teknis. Berikut beberapa hal yang sempat membuat saya memutar otak dan cara saya mengatasinya:

1. **Docker Socket Permission di Jenkins**:  
   Secara default, user `jenkins` di dalam container tidak memiliki izin mengeksekusi `/var/run/docker.sock`. Solusinya, saya menyelaraskan GID grup `docker` antara sistem host dan container saat proses build image.
2. **Resource Throttling**:  
   Menjalankan 3 VM sekaligus bersama Jenkins dan container registry bisa memakan banyak memori. Menggunakan K3s (bukan Kubernetes k3d/vanilla k8s) terbukti sangat menghemat konsumsi RAM dasar hingga di bawah 1 GB per node.
3. **Webhook Trigger dari Lokal**:  
   Karena Jenkins berjalan di localhost, GitHub tidak bisa langsung mengirim webhook HTTP POST ke laptop saya. Saya memanfaatkan webhook forwarding proxy (seperti `smee.io`) agar event commit dan PR merge di GitHub tetap bisa memicu pipeline CI secara instan.

---

## Kesimpulan

Membangun lab **CI/CD Local Track** ini memberikan pengalaman belajar yang luar biasa berharga bagi saya. Dengan mengintegrasikan:
- **Terraform** untuk automasi infrastruktur VM lokal,
- **K3s** sebagai cluster Kubernetes yang ringan namun tangguh,
- **Custom Jenkins + Trivy** untuk integrasi berkelanjutan yang aman,
- **ArgoCD** untuk deployment berbasis GitOps, dan
- **Envoy Gateway API** untuk routing generasi terbaru,

Saya sekarang memiliki laboratorium DevOps lengkap di laptop saya sendiri tanpa perlu mengkhawatirkan biaya sewa cloud sepeser pun.

Bagi kamu yang ingin mendalami arsitektur ini atau ingin mengikuti kurikulum pembelajaran aslinya, kamu bisa mengecek referensi lengkapnya di **[Academy DevOps Indonesia - CI/CD Local Track](https://academy.naipospos.cloud/#/learn/local)**.

Bagaimana alur CI/CD di workstation lokalmu saat ini? Jika ada pertanyaan seputar konfigurasi Terraform, Jenkinsfile, atau setup K3s di atas, silakan tinggalkan komentar di bawah!
