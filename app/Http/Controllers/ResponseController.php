<?php

// app/Http/Controllers/ResponseController.php
namespace App\Http\Controllers;

use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResponseController extends Controller
{
    public function index($pollId) {
        // Retrieve responses for the specific pollId, along with user and question data
        $responses = Response::whereHas('question.poll', function ($query) use ($pollId) {
            $query->where('id', $pollId);
        })
        ->with(['user', 'question.poll'])
        ->get();

        return response()->json($responses);
    }
    
    public function store(Request $request, $pollId) {
        $user = Auth::user();
        foreach ($request->responses as $questionId => $answerText) {
            Response::create([
                'poll_id' => $pollId,
                'question_id' => $questionId,
                'user_id' => $user->id,
                'answer_text' => $answerText
            ]);
        }
        return response()->json(['message' => 'Responses submitted successfully']);
    }
}

