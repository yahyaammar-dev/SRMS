<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlotDetail extends Model
{
    use HasFactory;
    public $table = 'slot_details';
    protected $fillable = [
        'attribute_id',
        'value',
        'shipment_id',
    ];  
}
