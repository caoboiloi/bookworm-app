<div align="justify">

<div align="center">

![Bookworm icon](./resources/assets/bookworm_icon.svg)

</div>

# BOOKWORM APP

## Note:
* Rename the file `.env.example` to `.env`
* APP_URL, MIX_APP_FRONT_URL must be defined in `.env`

## Usage:

* install composer and npm management tool dependencies:

```console
composer install
```
```console
npm install
```

* Rename .env.example to .env
* Config **APP_URL, MIX_APP_FRONT_URL** and database connection information in .env
* Generate app key by running command:
```console
php artisan key:generate
```
* Make sure Apache/Nginx & PostgreSQL are running
on your local machine
* Migrate & seed database by running command:
```console
php artisan migrate:fresh --seed
```

## Version:

* PHP: 7.3 | 8.0
* Laravel Framework: 8.40
* ReactJS: 17.0.2
* Bootstrap: 4.6.0

</div>
