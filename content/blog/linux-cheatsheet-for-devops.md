---
external: false
draft: true
title: Linux Cheat Sheet for DevOps Engineers.
description: Linux Cheat Sheet.
ogImagePath: "https://res.cloudinary.com/practicaldev/image/fetch/s--sRbO3Jwd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a80qvmnfan77kc8sjgf8.png"
date: 2023-11-22
---

# Linux Cheat Sheet for DevOps Engineers

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