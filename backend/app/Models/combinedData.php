<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class combinedData extends Model
{
    use HasFactory;
    protected $table = 'combined_table';
    protected $fillable = [
        'LDN_20ft',
        'LDN_40HC',
        'LDN_EWRI_TEU',
        'LDN_BAF_TEU',
        'ECR_PER_TEU',
        'Flexi_Sur_TEU',
        'DG_Sur_20FT',
        'DG_Sur_40FT',
        'DG_CLASS_1_PER_TEU',
        'REEFER_SUR',
        'TANK_S_CHARGE_TUE',
        'MT_20ft',
        'MT_40HC',
        'MT_EWRI_TEU',
        'MT_BAF_TEU',
        'EFFECTIVE_DATE',
        'VALIDITY',
        'REMARKS',
        'datetime',
        'slot_op_name',
        'service_name',
        'identifier',
        'port_id',
        'pod',
        'pol',
        'terminal',
        'volume_per_teu',
        'T_S_or_diect',
        'Slot_term',
        'service_id',
        'transit_time',
    ];
}
