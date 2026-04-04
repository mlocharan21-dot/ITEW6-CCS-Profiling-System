<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'RM-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'name', 'type', 'capacity', 'building'];
}
