---
external: false
draft: false
title: "Laravel Specific Table Migration"
ogImagePath: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*xhDwxi84D8MmrfAeqQ8bTg.jpeg"
description: "Tips for run migration and seeder specific file for Laravel Framework"
date: 2023-11-27
---

Tips for run migration and seeder specific file for Laravel Framework 10.

Migrate

```shell
php artisan migrate --path=/database/migrations/fileName.php
```

Roolback

```shell
php artisan migrate:rollback --path=/database/migrations/fileName.php
```

Refresh

```shell
php artisan migrate:refresh --path=/database/migrations/fileName.php
```

Seeder

```shell
php artisan db:seed --class=classNameTableSeeder
```

Thanks bro
:D
