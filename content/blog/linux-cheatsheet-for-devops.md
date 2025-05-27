---
external: false
draft: false
title: Linux Cheat Sheet for DevOps Engineers.
description: Linux Cheat Sheet.
ogImagePath: "https://miro.medium.com/v2/resize:fit:1200/1*A-eofQmV8nvkabnhrRoMVw.png"
date: 2023-11-22
---

Cheat Sheet ini mencakup perintah dan konsep penting Linux yang umum digunakan dalam alur kerja DevOps:

### File System Navigation:

- `pwd` : Melihat direktori kerja saat ini.
- `ls` : Melihat daftar file dan direktori di direktori saat ini.
  - `ls -l` : Melihat daftar file dan direktori dalam format panjang.
  - `ls -a` : Melihat daftar semua file dan direktori, termasuk yang tersembunyi.
- `cd` : Ubah atau pindah dari direktori saat ini.
  - `cd ~` : Pindah ke direktori home.
  - `cd ..` : Naik satu tingkat direktori atau pindah ke direktori sebelum ini.
- `touch` : Buat file kosong.
- `mkdir` : Buat direktori baru.
- `rm` : Hapus file atau direktori.
  - `rm -r` : Hapus direktori secara rekursif.
- `mv` : Memindahkan atau mengganti nama file dan direktori.
- `cp` : Menyalin file dan direktori.
- `find` : Mencari file dan direktori.
- `grep` : Mencari teks di dalam file.
- `cat` : Menampilkan isi file.
- `more` atau `less` : Melihat konten file halaman demi halaman.
- `head` dan `tail` : Menampilkan awal atau akhir file.
- `file` : Tentukan jenis file.

### File Permission:

- `chmod` : Ubah izin file.
- `chown` : Mengubah kepemilikan file.
- `chgrp` : Ubah kepemilikan grup.
- `umask` : Tetapkan izin default untuk file dan direktori baru.

### Process Management :

 - `ps`: Daftar proses yang berjalan.  - `ps aux`: Daftar semua proses.
 - `top`: Memantau proses sistem secara real-time.
 - `kill`: Menghentikan proses.
 - `killall`: Menghentikan proses berdasarkan nama.
 - `bg` dan `fg`: Kelola proses latar belakang dan latar depan.
 - `nohup`: Jalankan perintah yang terus berjalan bahkan setelah Anda logout.

### Package Management(Debian/Ubuntu):

 - `apt-get update`: Perbarui daftar paket.
 - `apt-get upgrade`: Tingkatkan paket yang diinstal.
 - `apt-get install`: Instal paket baru.
 - `apt-get delete`: Hapus paket.
 - `apt-cache search`: Mencari paket.
 - `dpkg`: Perintah manajemen paket Debian.

### Package Management (Red Hat/CentOS):

 - `yum update`: Perbarui paket.
 - `yum install`: Instal paket.
 - `yum delete`: Hapus paket.
 - `yum search`: Mencari paket.
 - `rpm`: Perintah manajemen paket RPM.

### Networking:

 - `ifconfig` atau `ip`: Menampilkan informasi antarmuka jaringan.
 - `ping`: Periksa konektivitas jaringan.
 - `netstat`: Statistik jaringan.
 - `ssh`: Mengakses sistem jarak jauh dengan aman.
 - `scp`: Menyalin file antar sistem dengan aman.
 - `curl` atau `wget`: Mengunduh file dari internet.
 - `nc`: Netcat untuk tugas yang berhubungan dengan jaringan.
 - `iptables` atau `firewalld`: Konfigurasikan aturan firewall.

### System Information:

 - `uname`: Menampilkan informasi sistem.
 - `df`: Menampilkan penggunaan ruang disk.
 - `du`: Menampilkan penggunaan ruang direktori.
 - `gratis`: Menampilkan penggunaan memori.
 - `top` atau `htop`: Memantau sumber daya sistem.
 - `lscpu` atau `cat /proc/cpuinfo`: informasi CPU.
 - `lsblk` atau `fdisk -l`: Daftar perangkat blok.
 - `tanggal`: Menampilkan tanggal dan waktu sistem.

### Shell Scripting:

 - Membuat dan mengedit skrip shell menggunakan editor teks seperti `nano`, `vim`, atau `emacs`.
 - Gunakan `#!/bin/bash` (atau shell lain) sebagai garis shebang.
 - Jadikan skrip dapat dieksekusi dengan `chmod +x script.sh`.
 - Jalankan skrip dengan `./script.sh`.

### Version Control :

 - `git`: Perintah Git untuk kontrol versi.
 - `svn`: Perintah subversi untuk kontrol versi.

### Containerization (Docker):

 - `buruh pelabuhan`: Perintah Docker untuk manajemen kontainer.
 - `docker-compose`: Membuat beberapa container.

### Automation (cron):

 - `crontab`: Menjadwalkan tugas berulang.

### Text Processing:

 - `sed`: Editor aliran untuk manipulasi teks.
 - `awk`: Alat pengolah teks.
 - `cut`: Ekstrak bagian dari baris file.

### Monitoring and Logging:

 - Gunakan alat seperti `syslog`, `journalctl`, dan `logrotate` untuk log sistem.
 - Gunakan alat pemantauan seperti Nagios, Zabbix, atau Prometheus untuk kesehatan sistem.

Semoga bermanfaat cheat sheet nya 😬