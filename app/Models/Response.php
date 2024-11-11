<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    //
    protected $fillable = ['poll_id', 'question_id', 'user_id', 'answer_text'];

    public function user() { return $this->belongsTo(User::class); }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
