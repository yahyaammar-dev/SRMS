<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExcelController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [ExcelController::class, 'index']);

Route::post('/import', [ExcelController::class, 'importData'])->name('import');

Route::get('/export', [ExcelController::class, 'exportData'])->name('export');