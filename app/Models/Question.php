<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    //
    protected $fillable = ['poll_id', 'question_text'];

    public function poll() { return $this->belongsTo(Poll::class); }
}
