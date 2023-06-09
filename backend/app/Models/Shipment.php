<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;
    public $table = 'shipments';
    protected $fillable = [
        'port_id',
        'pod',
        'terminal',
        'volume_per_teu',
        'T_S_or_diect',
        'Slot_term',
        'operator_id',
        'service_id',
        'Slot_term',
        'shipment_id',
        'slot_id',
        'attribute_id'
    ];  
}
