<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public $incrementing = false;
    protected $keyType = 'integer';

    protected $fillable = [
        'id', 'first_name', 'last_name', 'email', 'phone',
        'year', 'section', 'status', 'address', 'birthday', 'enrolled_date',
    ];

    protected $casts = [
        'birthday'      => 'date:Y-m-d',
        'enrolled_date' => 'date:Y-m-d',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($student) {
            if (empty($student->id)) {
                $year   = (int) date('Y');
                $prefix = ($year - 2000) * 100000;
                $max    = static::where('id', '>=', $prefix)
                                ->where('id', '<', $prefix + 100000)
                                ->max('id');
                $student->id = $max ? $max + 1 : $prefix + 1;
            }
        });
    }
}
