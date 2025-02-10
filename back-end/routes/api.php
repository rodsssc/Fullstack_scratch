<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/', function () {
    return "Hello world";
});

Route::get("/student", [StudentController::class, 'index'])->name("students.index");
Route::post("/student", [StudentController::class, 'store'])->name("students.store");
Route::get("/student/{id}", [StudentController::class,'show'])->name("students.show");
Route::put("/student/{id}", [StudentController::class,'update'])->name("students.update");
Route::delete("/student/{id}", [StudentController::class,'destroy'])->name("students.destroy");