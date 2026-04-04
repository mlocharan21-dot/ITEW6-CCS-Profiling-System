<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'LAB-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'name', 'capacity', 'building', 'equipment'];

    protected $casts = ['equipment' => 'array'];
}
