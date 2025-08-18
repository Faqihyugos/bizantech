---
external: false
draft: false
title: "DevOps dan Praktik CI/CD: Teori dan Penerapan dengan Docker Pipeline"
description: "Memahami konsep DevOps, prinsip CI/CD, dan bagaimana membangunnya secara praktis menggunakan Docker dalam pipeline modern."
date: 2025-08-09
ogImagePath: "https://media.geeksforgeeks.org/wp-content/uploads/20230410112114/DevOps.png"
---

Di era software modern, kecepatan rilis dan stabilitas aplikasi bukan lagi kemewahan—itu keharusan. Nah, di sinilah **DevOps** dan **CI/CD** memainkan peran penting. Artikel ini akan bahas dari dasar: apa itu DevOps, bagaimana CI/CD bekerja, dan bagaimana kamu bisa membangun pipeline-nya sendiri menggunakan **Docker**.


## 1. DevOps dalam Teori: Kolaborasi dan Otomatisasi

**DevOps** adalah pendekatan budaya dan teknis yang menyatukan tim development (Dev) dan operations (Ops) agar bisa bekerja sama lebih efisien dalam membangun, menguji, dan merilis aplikasi. Kunci dari DevOps adalah:

- **Kolaborasi lintas tim**
- **Otomatisasi proses build, test, dan deploy**
- **Monitoring dan feedback berkelanjutan**
- **Iterasi cepat dengan risiko minimum**

Tujuannya? Menyediakan perangkat lunak yang **reliable**, **cepat dirilis**, dan **mudah di-maintain**.


## 2. Apa Itu CI/CD?

CI/CD adalah jantung dari DevOps. Istilah ini sering terdengar, tapi mari kita pecah jadi sederhana:

### Continuous Integration (CI)
CI adalah proses otomatis untuk menggabungkan kode baru ke branch utama. Setiap kali developer push kode:

- Kode diuji secara otomatis.
- Build dilakukan untuk memastikan kode tetap jalan.
- Error bisa langsung diketahui sebelum sampai production.

### Continuous Delivery (CD)
CD melanjutkan proses CI dengan otomatisasi deploy ke staging atau production. Tujuannya: **kode siap rilis kapan saja** dengan satu klik atau bahkan tanpa klik sama sekali (CD otomatis penuh).


## 3. Praktik CI/CD dengan Docker: Kenapa Ini Powerful?

**Docker** membuat semua proses build dan deployment jadi konsisten. Saat kamu membangun pipeline CI/CD, Docker memungkinkan kamu untuk:

- Menstandarkan environment build dan testing.
- Membungkus aplikasi dan dependency dalam satu image.
- Deploy image yang sama dari dev sampai production.

Keuntungannya jelas: **lebih minim error, lebih cepat deploy, dan environment selalu sama**.


## 4. Contoh Pipeline CI/CD Menggunakan Docker

Mari kita lihat contoh nyata bagaimana pipeline bekerja, misalnya di GitLab CI.

### 4.1. Struktur Project Sederhana

```
my-app/
├── Dockerfile
├── .gitlab-ci.yml
├── app/
│   └── main.py
├── tests/
│   └── test\_app.py

```

### 4.2. Contoh Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "app/main.py"]
```

### 4.3. File .gitlab-ci.yml

```yaml
stages:
  - build
  - test
  - deploy

variables:
  IMAGE_TAG: myregistry.com/my-app:$CI_COMMIT_SHORT_SHA

build:
  stage: build
  script:
    - docker build -t $IMAGE_TAG .
    - docker push $IMAGE_TAG

test:
  stage: test
  script:
    - docker run --rm $IMAGE_TAG pytest tests/

deploy:
  stage: deploy
  script:
    - echo "Deploying to production..."
    - docker run -d -p 80:8000 $IMAGE_TAG
  only:
    - main
```

Penjelasan singkat:

* **Build stage**: bikin image dan push ke container registry.
* **Test stage**: jalankan test di dalam container.
* **Deploy stage**: jalankan container kalau branch yang di-push adalah `main`.

Pipeline seperti ini bikin proses dari push kode sampai jalan di server jadi **otomatis dan stabil**.


## 5. Tips dan Best Practice CI/CD Docker Pipeline

* **Gunakan tag versi atau commit hash** untuk image agar traceable.
* **Pisahkan environment** (dev, staging, prod) dengan konfigurasi berbeda.
* **Jangan simpan secrets** dalam image—gunakan secret manager atau environment variable.
* **Scan image dari awal** pakai tools seperti \[Trivy] untuk cek CVE.
* **Simpan hasil build ke registry** yang terproteksi (misal GitHub Container Registry atau GitLab Registry).


## 6. Penutup

DevOps dan CI/CD bukan sekadar tren—mereka adalah fondasi cara kerja modern dalam membangun dan merilis software. Dengan pipeline berbasis Docker, kamu bisa menjamin proses yang konsisten, bisa direplikasi, dan mudah diotomasi.

Jadi, entah kamu masih baru atau sudah jalanin DevOps, mulai dari pipeline sederhana seperti di atas bisa jadi langkah awal yang sangat berdampak.

## Referensi

1. [https://www.netsolutions.com/insights/what-is-devops](https://www.netsolutions.com/insights/what-is-devops)
2. [https://www.atlassian.com/devops/what-is-devops/devops-best-practices](https://www.atlassian.com/devops/what-is-devops/devops-best-practices)
3. [https://opstree.com/blog/2025/05/15/devops-how-it-works-and-why-it-matters](https://opstree.com/blog/2025/05/15/devops-how-it-works-and-why-it-matters)
4. [https://roadmap.sh/devops/best-practices](https://roadmap.sh/devops/best-practices)
5. [https://docs.gitlab.com/ee/ci/docker/using\_docker\_build.html](https://docs.gitlab.com/ee/ci/docker/using_docker_build.html)
6. [https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)
