<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/polls', [PollController::class, 'index']);
    Route::post('/polls', [PollController::class, 'store']);
    Route::get('/polls/{pollId}/questions', [QuestionController::class, 'index']);
    Route::post('/polls/{pollId}/questions', [QuestionController::class, 'store']);
    Route::get('/polls/{pollId}/responses', [ResponseController::class, 'index']);
    Route::post('/polls/{pollId}/responses', [ResponseController::class, 'store']);
});
