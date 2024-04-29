---
external: false
title: "Membuat animasi loading dengan SVG dan CSS"
date: 2022-06-07
draft: false
ogImagePath: "https://dashboardsdesign.com/full-preview/"
description: "Halo , Kali ini Saya membagikan blog tentang animasi svg dengan css mungkin untuk yang sudah mahir dengan pemrograman css dan html bisa skip blog ini, hehe."
---

Halo , Kali ini Saya membagikan blog tentang animasi svg dengan css mungkin untuk yang sudah mahir dengan pemrograman css dan html bisa skip blog ini, hehe.

Salah satu cara terbaik untuk membuat **animasi loading** untuk proyek web Anda yang tidak melibatkan aset loading dari server web Anda, CDN eksternal atau plugin Javascript pihak ketiga membuatnya dalam aplikasi web kamu menggunakan teknologi web yang sama, yang kamu gunakan untuk merender loading animasi. Ini memastikan bahwa animasi kamu muncul segera setelah kamu membutuhkannya untuk memastikan user experience tidak terpengaruh berdasarkan kecepatan koneksi pengguna.

Dalam tutorial ini kita akan membuat animasi loading sederhana untuk proyek web menggunakan HTML dan CSS.

Hasil akhir yang kita buat adalah animasi berikut.

![animasi_loading.gif](https://storage.googleapis.com/kotakode-prod-public/images/7acf1035-b553-4e43-8ed0-4563b67de830-animasi_loading.gif)

Tambahkan template html berikut:

```html
<div class="svg-loader">
  <svg class="svg-container" height="100" width="100" viewBox="0 0 100 100">
    <circle class="loader-svg bg" cx="50" cy="50" r="45"></circle>
    <circle class="loader-svg animate" cx="50" cy="50" r="45"></circle>
  </svg>
</div>
```

Bukti dari ilustrasi di atas, template animasi terdiri dari dua lingkaran yang bertumpuk satu sama lain, dengan lingkaran pertama lebih tebal dari yang kedua, keduanya memiliki keliling yang sama sehingga memberikan ilusi bahwa satu lingkaran berada di dalam lingkaran lainnya.

Atribut cx dan cy di dalam lingkaran masing-masing adalah koordinat sumbu x dan sumbu y dari kedua lingkaran. Mereka memastikan bahwa kedua lingkaran berpusat pada koordinat yang sama.

Tambahkan sintak css berikut:

```css
.svg-loader {
  display: flex;
  position: relative;
  align-content: space-around;
  justify-content: center;
}
.loader-svg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  fill: none;
  stroke-width: 5px;
  stroke-linecap: round;
  stroke: rgb(64, 0, 148);
}
.loader-svg.bg {
  stroke-width: 8px;
  stroke: rgb(207, 205, 245);
}
```

Css di atas memastikan komponen pemuatan berada pada posisi tengah, juga memastikan ada lebar goresan dan warna yang berbeda untuk kedua lingkaran.

Kita kemudian menganimasikan lingkaran kedua, yang akan berada di atas lingkaran pertama dengan CSS untuk menyelesaikan animasi loading:
Lanjutan sintak css sebelumnya.

```css
.animate {
  stroke-dasharray: 242.6;
  animation: fill-animation 1s cubic-bezier(1, 1, 1, 1) 0s infinite;
}

@keyframes fill-animation {
  0% {
    stroke-dasharray: 40 242.6;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 141.3;
    stroke-dashoffset: 141.3;
  }
  100% {
    stroke-dasharray: 40 242.6;
    stroke-dashoffset: 282.6;
  }
}
```

Penjelasan css di atas. Saat kita menggambar lingkaran kita, itu hanyalah satu goresan garis/dash stroke yang melukis garis besar bentuk kita dari awal hingga akhir lingkaran, atribut [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) memberi kita kemampuan untuk memecahnya menjadi pola garis dan celah. Fitur ini dapat kita manfaatkan untuk mendapatkan hasil akhir animasi yang kita inginkan.

Untuk mendapatkan efek animasi yang halus seperti di atas kita perlu mengetahui keliling lingkaran, dimana keliling = 2 x pi x jari-jari. Kami kemudian menggunakan atribut stroke-dasharray untuk menggambar maksimal satu tanda hubung dan celah yang bergantian ukurannya di berbagai status animasi sambil mempertahankan panjang keliling saat keduanya ditambahkan.

Dengan jari-jari lingkaran 45 kita mendapatkan keliling 282.6, jadi ketika kita menetapkan nilai stroke-dasharray menjadi 141.3 berarti tanda hubung dan celah memiliki nilai yang sama yang dijumlahkan sehingga menghasilkan jumlah 282.6.

Atribut [stroke-dashoffset](https://developer.mozilla.org/en-us/docs/Web/SVG/Attribute/stroke-dashoffset) adalah atribut presentasi yang menentukan offset pada rendering array dasbor terkait, offset ini memberikan efek rotasi pada animasi pemuatan, jika tidak animasi akan tampak rusak. Ini semua yang terjadi dalam **_fill-animation_**.
Kami menyelesaikan dengan menerapkan animasi ini ke lingkaran kedua dengan kelas .animation memastikan bahwa animasi ini berjalan tanpa batas.

Selesai. ini hanyalah dasar untuk jenis animasi yang dapat dibuat dengan SVG dan CSS, Terimakasih sudah membaca dan mempraktekannya jangan bosen-bosen baca blog lainnya di kotakode ini.

Hasil langsung bisa diliat pada [Repl.it](https://repl.it/@Faqihyugos/Animationloading)
