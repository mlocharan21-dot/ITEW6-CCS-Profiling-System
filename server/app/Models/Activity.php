<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['type', 'title', 'description'];

    protected $appends = ['time'];

    public function getTimeAttribute(): string
    {
        return $this->created_at->diffForHumans();
    }
}
