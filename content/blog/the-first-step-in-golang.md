---
external: false
draft: false
title: "The first step in Golang( installation and hello world)"
ogImagePath: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*yLMWTwfQkFWdY3Dn.png"
description: "Golang, juga dikenal sebagai Go, adalah bahasa pemrograman sumber terbuka yang dikembangkan oleh Google pada tahun 2009."
date: 2023-11-27
---

Golang, juga dikenal sebagai Go, adalah bahasa pemrograman sumber terbuka yang dikembangkan oleh Google pada tahun 2009. Golang dirancang untuk menjadi bahasa yang sederhana, efisien, dan terukur untuk membangun sistem perangkat lunak berskala besar. Beberapa fitur utama Go meliputi:

- Waktu kompilasi yang cepat
- Pengumpulan sampah
- Dukungan konkurensi melalui goroutine dan saluran
- Pengetikan yang kuat dan keamanan mengetik
- Sintaks yang sederhana dan bersih

Berikut beberapa alasan mengapa Anda harus mempertimbangkan mempelajari Golang:

1. Aplikasi berkinerja tinggi: Golang dirancang dengan mempertimbangkan kinerja, menjadikannya pilihan tepat untuk membangun aplikasi berkinerja tinggi. Ia memiliki kecepatan kompilasi yang cepat dan runtime yang dioptimalkan untuk perangkat keras modern.

1. Konkurensi: Golang memiliki dukungan bawaan untuk konkurensi melalui goroutine dan salurannya. Hal ini memudahkan penulisan program secara bersamaan, seperti program yang menangani banyak permintaan atau tugas secara bersamaan.

1. Sistem berskala besar: Golang dirancang sebagai bahasa untuk membangun sistem berskala besar, dengan fitur seperti pengetikan yang kuat dan pengumpulan sampah yang membantu pengembang mengelola basis kode yang kompleks.

1. Komunitas sumber terbuka: Golang memiliki komunitas sumber terbuka yang berkembang dan aktif, dengan banyak perpustakaan dan kerangka kerja yang tersedia untuk digunakan. Hal ini memudahkan untuk menemukan dan menggunakan kode yang ada untuk membangun aplikasi Anda sendiri.

1. Dukungan lintas platform: Golang dapat dikompilasi untuk berbagai platform, termasuk Windows, macOS, dan Linux, menjadikannya bahasa serbaguna untuk membangun aplikasi yang dapat berjalan di berbagai sistem.

Dalam penggunaan di dunia nyata, Golang telah digunakan oleh perusahaan seperti Google, Uber, Dropbox, dan Netflix untuk membangun sistem dan aplikasi berskala besar. Beberapa contoh aplikasi populer yang dibangun menggunakan Golang antara lain Docker, Kubernetes, dan Prometheus.

Dalam postingan blog ini, kami akan memandu langkah-langkah untuk menginstal Go di komputer Anda dan membuat pesan sederhana “Halo, Dunia!” program.

**Menginstal Go-Lang**

Sebelum kita dapat mulai coding di Go, kita perlu menginstalnya di komputer kita. Go dapat diinstal di Windows, macOS, dan Linux. Dalam tutorial ini, kami akan menggunakan macOS sebagai contoh sistem operasi kami.

1. Pertama, kunjungi situs web resmi Go (https://golang.org/) dan unduh penginstal untuk sistem operasi Anda.

1. Setelah penginstal diunduh, buka dan ikuti petunjuk penginstalan.

1. Setelah instalasi selesai, buka terminal Anda dan ketik go version. Jika Go diinstal dengan benar, Anda akan melihat nomor versi ditampilkan.

**Menulis kalimat “Halo, Dunia!” program**

Sekarang kita telah menginstal Go di komputer kita, kita dapat mulai membuat kode. Kita akan mulai dengan membuat kalimat sederhana “Halo, Dunia!” program.

1. Buka editor teks pilihan Anda (misalnya Visual Studio Code, Sublime Text, Notepad++, dll.).
1. Buat file baru dan simpan dengan nama `hello.go`. Ekstensi .go digunakan untuk file Go.
1. Ketik kode berikut ke dalam file `hello.go` Anda:

```go
package main
import "fmt"
func main() {
    fmt.Println("Halo, Dunia!")
}

```

1. Simpan file dan buka terminal Anda.
1. Arahkan ke direktori tempat Anda menyimpan file hello.go.
1. Ketik go run hello.go dan tekan Enter. Anda akan melihat pesan "Halo, Dunia!" ditampilkan di terminal.

Selamat, Anda telah berhasil menginstal Go di komputer Anda dan menulis program Go pertama Anda!

**Kesimpulan**

Go adalah bahasa pemrograman yang kuat dan efisien yang mendapatkan popularitas di kalangan pengembang. Dalam postingan blog ini, kami telah membahas langkah-langkah untuk menginstal Go di komputer Anda dan membuat pesan sederhana “Halo, Dunia!” program. Sekarang setelah Anda menguasai dasar-dasarnya, Anda dapat mulai menjelajahi bahasa tersebut dan membangun aplikasi Anda sendiri.
Happy coding!
