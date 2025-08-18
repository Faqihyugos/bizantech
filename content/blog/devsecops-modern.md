---
external: false
draft: false
title: "DevSecOps: Saat Keamanan Jadi Bagian Alami dari CI/CD"
description: "Menyelami apa itu DevSecOps, prinsip shift-left, praktiknya dalam pipeline modern, dan kenapa tools seperti Trivy penting banget di dalamnya."
date: 2025-08-13
ogImagePath: "https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/stock-assets/getty/image/photography/10/a3/pulse5-0156.component.crop-2by1-xs-retina.ts=1753198109671.jpg/content/adobe-cms/us/en/think/topics/devsecops/jcr:content/root/leadspace_container/leadspace_article"
---


Kalau kamu pernah merasa proses security terasa seperti “tambahan di belakang”—DevSecOps akan terasa seperti napas segar. Gaya kerja ini mengubah mindset: keamanan bukan tugas akhir, tapi bagian dari perjalanan sejak baris kode pertama ditulis.

Di artikel ini, kita bakal bahas: apa itu DevSecOps, bagaimana praktiknya diterapkan di pipeline modern, dan kenapa tools seperti Trivy (yang kita bahas lebih lengkap di artikel [ini](https://www.faqihyugos.com/blog/apa-itu-trivy)) jadi bagian penting dalam pendekatan ini.


## 1. Apa Itu DevSecOps?

Secara singkat, **DevSecOps** adalah evolusi dari DevOps yang menyisipkan keamanan sebagai elemen utama—bukan tempelan. Prinsip utamanya adalah **shift-left**: bawa keamanan sedekat mungkin ke awal proses development, bukan ditaruh pas mau production.  

DevSecOps juga mendorong agar semua pihak—developer, security engineer, hingga ops—ikut ambil bagian dalam proses keamanan. Bukan cuma tanggung jawab tim khusus security aja.


## 2. Apa Hubungannya dengan CI/CD?

Dalam CI/CD (Continuous Integration dan Continuous Delivery), kita sudah otomatis build, test, dan deploy kode. Tapi sering kali keamanan diabaikan karena dianggap menghambat. Padahal, dengan tools dan pendekatan yang tepat, kamu bisa menanamkan security **langsung ke dalam pipeline**, tanpa bikin proses jadi lambat.

Contohnya:
- Saat developer push kode, bisa langsung jalan **SAST** (Static Application Security Testing).
- Setelah build image, jalanin **dependency scanning** atau **misconfiguration check**.
- Sebelum deploy, pastikan nggak ada **secrets** yang bocor atau konfigurasi yang lemah.

Semua proses itu bisa otomatis. Tinggal disisipkan di stage pipeline CI/CD.


## 3. Praktik DevSecOps yang Relevan di Dunia Nyata

Berikut beberapa praktik yang umum dipakai:

### - Threat Modeling Sejak Awal
Diskusi keamanan dilakukan saat merancang fitur, bukan setelah fitur jadi.

### - Integrasi SAST dan SCA
Sebelum build jalan, sistem bisa otomatis jalankan pengecekan statis terhadap kode (SAST) dan libraries (SCA). Misalnya, pastikan tidak ada dependency yang punya CVE kritikal.

### - Gunakan Tools Ringan dan Efisien
Tools seperti **Trivy** sangat ideal di tahap ini. Ia bisa scan container image, Infrastructure-as-Code (IaC), dan bahkan mendeteksi secrets. Ini memungkinkan pipeline kamu tetap ringan tapi tetap aman. Penjelasan lengkap soal Trivy bisa kamu baca di [artikel ini](https://www.faqihyugos.com/blog/apa-itu-trivy).

### - Otomatisasi Policy
Gunakan tools seperti OPA atau Kyverno untuk memverifikasi bahwa setiap deploy sesuai kebijakan—misalnya tidak boleh pakai container `:latest`, atau harus ada label tertentu.

### - Monitoring dan Feedback Loop
Setelah aplikasi live, tetap pantau log, metrik, dan aktivitas tidak biasa. Kalau ada insiden, pipeline bisa bantu rollback cepat atau blokir image bermasalah.


## 4. Contoh Alur CI/CD dengan DevSecOps

Bayangkan kamu pakai GitLab CI atau GitHub Actions. Ini alur DevSecOps minimal:

1. Kode di-push
2. Jalankan **SAST** (misal CodeQL)
3. Build Docker image
4. Jalankan **Trivy** untuk:
   - CVE scan
   - Secret detection
   - Misconfig check
5. Hasilnya divisualisasi, dan pipeline stop kalau ada issue kritikal
6. Jika aman, deploy ke staging
7. Jalankan observasi runtime
8. Deploy ke production

Dengan alur ini, kamu bukan cuma punya pipeline yang cepat—tapi juga **tahan banting secara keamanan**.


## 5. Kenapa Ini Penting?

| Masalah Lama           | Solusi DevSecOps                                 |
|------------------------|--------------------------------------------------|
| Security diurus belakangan | Security jalan otomatis dari awal               |
| Scanning berat & lambat     | Tools ringan seperti Trivy masukin ke CI/CD     |
| Developer gak peduli security | Dev juga punya visibility soal issue keamanan  |
| Takut deploy cepat       | Pipeline bisa deploy cepat *dan* aman            |


## 6. Penutup

DevSecOps bukan soal tools, tapi **soal pola pikir**. Bahwa keamanan itu bukan penghambat, tapi bagian integral dari software delivery modern. Dan buat kamu yang ingin mulai, langkah kecil seperti menambahkan scanning di pipeline sudah sangat berarti.

Kalau kamu belum pernah pakai Trivy—salah satu tools DevSecOps terbaik yang ringan tapi powerfull—coba baca dulu artikel pengenalannya di sini:  
👉 [Apa Itu Trivy dan Kenapa Jadi Andalan DevSecOps?](https://www.faqihyugos.com/blog/apa-itu-trivy)


## Referensi

1. https://www.microsoft.com/en-us/security/business/security-101/what-is-devsecops  
2. https://www.ibm.com/think/topics/devsecops  
3. https://devsecopsschool.com/blog/ci-cd-in-devsecops-a-comprehensive-tutorial/  
4. https://dev.to/vellanki/modern-cicd-and-devsecops-a-complete-guide-for-2025-3gdk  
5. https://squareops.com/blog/devsecops-in-action-a-complete-guide-to-secure-ci-cd-workflows/  
6. https://www.faqihyugos.com/blog/apa-itu-trivy  
