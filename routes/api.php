<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Api\BookApi;
use App\Http\Api\ReviewBookApi;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('books/filter', [BookApi::class, 'filter']);

Route::get('books/{book}/reviews/filter', [ReviewBookApi::class, 'filter']);

Route::resource('books', BookApi::class);

Route::resource('books.details', ReviewBookApi::class);
