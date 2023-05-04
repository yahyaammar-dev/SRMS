<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    public $table = 'Service';
    protected $fillable = [
        'slot_op_name',
        'identifier',
    ];  
}


