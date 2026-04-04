<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \App\Models\Student::observe(\App\Observers\StudentObserver::class);
        \App\Models\Faculty::observe(\App\Observers\FacultyObserver::class);
        \App\Models\Event::observe(\App\Observers\EventObserver::class);
        \App\Models\Schedule::observe(\App\Observers\ScheduleObserver::class);
    }
}
