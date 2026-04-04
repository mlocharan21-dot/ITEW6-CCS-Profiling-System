<?php

namespace App\Traits;

trait GeneratesStringId
{
    protected static function bootGeneratesStringId(): void
    {
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $prefix = static::$idPrefix;
                $count = static::count() + 1;
                $model->{$model->getKeyName()} = $prefix . str_pad($count, 3, '0', STR_PAD_LEFT);
            }
        });
    }
}
