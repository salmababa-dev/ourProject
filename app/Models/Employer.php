<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    /** @use HasFactory<\Database\Factories\EmployerFactory> */
    use HasFactory;
    protected $table="employers";
    protected $fillable=['first_name',
        'last_name',
        'email',
        'phone',
        'position',
        'hire_date',
        'salary',];
}
