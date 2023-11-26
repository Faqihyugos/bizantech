---
external: false
draft: false
title: "Cara Validasi Permintaan API di Laravel 10"
ogImagePath: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*xhDwxi84D8MmrfAeqQ8bTg.jpeg"
description: "Dalam pengembangan web, API (Application Programming Interface) menjadi salah satu hal yang sangat penting untuk memfasilitasi interaksi antara aplikasi yang berbeda-beda."
date: 2023-04-11
---

![image-laravel](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*xhDwxi84D8MmrfAeqQ8bTg.jpeg)

Dalam pengembangan web, API (Application Programming Interface) menjadi salah satu hal yang sangat penting untuk memfasilitasi interaksi antara aplikasi yang berbeda-beda. Validasi permintaan API adalah salah satu aspek penting dalam memastikan keamanan API, memastikan bahwa permintaan yang masuk ke API benar-benar dari sumber yang sah.

Saat ini sebagian besar aplikasi web menggunakan API untuk operasi database, Laravel juga menyediakan fitur API.

Tetapi ada banyak kebingungan bagaimana memvalidasi permintaan API di laravel. Jangan khawatir itu mudah, di sini saya tunjukkan cara melakukannya dengan contoh validasi Post di blog, Ikuti saja langkah-langkah di bawah ini.

## Langkah Pertama: Membuat Request

Langkah pertama dalam melakukan validasi permintaan API adalah membuat request yang digunakan untuk mengumpulkan data dari permintaan yang masuk. Di Laravel, kita dapat menggunakan artisan command make:request untuk membuat request baru.

```shell
php artisan make:request StoreBlogPostRequest
```

Perintah ini akan membuatkan file StoreBlogPostRequest.php di direktori app/Http/Requests.

## Langkah Kedua: Validasi Data

Setelah membuat request, kita dapat menambahkan logika validasi ke dalam request tersebut. Dalam contoh ini, kita akan validasi permintaan yang masuk untuk menyimpan sebuah blog post.

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
```

Dalam contoh di atas, kita menambahkan dua aturan validasi untuk request yang masuk. Pertama, title harus wajib diisi dan maksimal panjang karakternya adalah 255. Kedua, body harus wajib diisi. Kita dapat menambahkan aturan validasi tambahan sesuai kebutuhan.

## Langkah 3 : Tambahkan facades “HttpResponseException” dan “Validator” di “StoreBlogPostRequest.php”.

```php
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
```

Letak nya seperti contoh dibawah ini.

```php
<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
```

## Langkah 4: Tambahkan aturan validasi laravel sesuai kebutuhan Anda dalam fungsi “rules”.

```php
public function rules()
    {
        return [
            'title' => 'required|max:255',
            'body' => 'required',
        ];
    }
```

## Langkah 5 : Setelah menambahkan aturan, Anda perlu menambahkan satu fungsi “failedValidation”.

```php
protected function failedValidation(Validator $validator)
{
   throw new HttpResponseException(response()->json([
     'success'   => false,
     'message'   => 'Validation errors',
     'data'      => $validator->errors()
   ], 422));
}
```

Fungsi ini mengirimkan respons kesalahan sebagai json jika ada validasi yang gagal. Anda dapat menetapkan nilai kunci / pasangan apa pun di json, “$validator->errors()” mengirim kesalahan dengan nama atribut sebagai respons.

## Langkah 6 : Menggunakan Request di Controller

Tambahkan file “StoreBlogPostRequest.php” di file pengontrol API.
gunakan App\Http\Requests\StoreBlogPostRequest;

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBlogPostRequest;

class BlogPostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBlogPostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBlogPostRequest $request)
    {
        // Valid request, process the data
        // ...
    }
}
```

Di dalam contoh di atas, kita mengimpor StoreBlogPostRequest yang sebelumnya telah dibuat dan menggunakannya di dalam method store. Dalam method tersebut, kita dapat memproses data dari permintaan yang masuk karena Laravel telah memvalidasi permintaan untuk kita.

**Final code dari file “StoreBlogPostRequest.php”**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreBlogPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:255',
            'body' => 'required',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
       throw new HttpResponseException(response()->json([
         'success'   => false,
         'message'   => 'Validation errors',
         'data'      => $validator->errors()
       ], 422));
    }

   public function messages() //OPTIONAL
   {
       return [
           'title.required' => 'Title atau Judul diperlukan',
           'body.reqired'   => 'Body atau isi diperlukan'
       ];
   }

}
```

## Kesimpulan

Dengan demikian, kita telah berhasil memvalidasi permintaan API di Laravel. Validasi sangat penting untuk memastikan bahwa data yang diterima oleh aplikasi adalah data yang valid dan benar. Semoga artikel ini bermanfaat bagi Anda dalam mengembangkan aplikasi web dengan Laravel. Terima kasih telah membaca!
