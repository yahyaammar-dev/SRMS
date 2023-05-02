<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;
    protected $table = 'attributes';
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
        'DTHC_NON_HAZ_20FT',
        'DTHC_NON_HAZ_40FT',
        'DTHC_HAZ_20FT',
        'TANK_S_CHARGE_TUE',
        'GRI_TUE',
        'ROB_FEE_TUE',
        'MT_20ft',
        'MT_40HC',
        'MT_EWRI_TEU',
        'MT_BAF_TEU',
        'MT_TANK_S_CHARGE',
        'EFFECTIVE_DATE',
        'VALIDITY',
        'REMARKS',
        'datetime'
    ];    
}
