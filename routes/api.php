<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;
Route::options('{any}', function () {
    return response()->json();
})->where('any', '.*');

Route::apiResource('articles', ArticleController::class);
