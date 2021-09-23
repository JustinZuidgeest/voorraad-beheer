<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function() {
	Route::get('products', [ProductController::class, 'index']);
	Route::post('products', [ProductController::class, 'store']);
	Route::patch('products/{product}', [ProductController::class, 'update']);
	Route::delete('products/{product}', [ProductController::class, 'destroy']);

	Route::get('users', [UserController::class, 'index']);
	Route::post('users', [UserController::class, 'store']);
	Route::patch('users/{user}', [UserController::class, 'update']);
	Route::delete('users/{user}', [UserController::class, 'destroy']);
});