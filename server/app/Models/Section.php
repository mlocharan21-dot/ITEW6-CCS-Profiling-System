<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'SEC-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'name', 'year', 'semester', 'capacity'];
}
