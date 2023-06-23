<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\UserController;

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

Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);

Route::get('/getAllData', [ExcelController::class, 'getData']);

Route::get('/getFirstData', [ExcelController::class, 'getFirstData']);

Route::post('/addData', [ExcelController::class, 'addData']);
Route::post('/deleteData', [ExcelController::class, 'deleteData']);
Route::get('/getSingleItemData/{id}', [ExcelController::class, 'getSingleItemData']);
Route::post('/editData', [ExcelController::class, 'editData']);

Route::get('/welcome', function() {
    return response()->json([
        'message' => 'welcome man'
    ], 200);
});
