<?php

// app/Http/Controllers/QuestionController.php
namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index($pollId) {
        return Question::where('poll_id', $pollId)->get();
    }

    public function store(Request $request, $pollId) {
        $request->validate(['question_text' => 'required|string']);
        Question::create(['poll_id' => $pollId, 'question_text' => $request->question_text]);
        return response()->json(['message' => 'Question added successfully']);
    }
}
