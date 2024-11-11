<?php

// app/Http/Controllers/PollController.php
namespace App\Http\Controllers;

use App\Models\Poll;
use Illuminate\Http\Request;

class PollController extends Controller
{
    public function index() {
        return Poll::with('questions')->get();
    }

    public function store(Request $request) {
        $request->validate(['title' => 'required|string']);
        Poll::create($request->all());
        return response()->json(['message' => 'Poll created successfully']);
    }
}
