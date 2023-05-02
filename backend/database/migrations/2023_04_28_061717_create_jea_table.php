<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJeaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('JEA', function (Blueprint $table) {
        $table->increments('id');
        $table->string('slot_operator');
        $table->string('service_name');
        $table->string('pol');
        $table->string('pod');
        $table->string('terminal');
        $table->string('volume_per_teu');
        $table->string('TS_Or_Direct');
        $table->string('Slot_Term');
        $table->string('LDN_20ft');
        $table->string('LDN_40HC');
        $table->string('LDN_EWRI_TEU');
        $table->string('LDN_BAF_TEU');
        $table->string('ECR__PER__TEU');
        $table->string('Flexi_Sur_TEU');
        $table->string('DG_Sur_20FT');
        $table->string('DG_Sur_40FT');
        $table->string('DG_CLASS_PER_TEU');
        $table->string('REEFER__SUR');
        $table->string('DTHC_NON_HAZ_20FT_');
        $table->string('DTHC_NON_HAZ_40FT_');
        $table->string('DTHC__HAZ_20FT_');
        $table->string('TANK_SCHARGE_TUE');
        $table->string('GRI_TUE');
        $table->string('ROB_FEE_TUE');
        $table->string('MT_20ft');
        $table->string('MT_40HC');
        $table->string('MT_EWRI_TEU');
        $table->string('MT_BAF_TEU');
        $table->string('MT_TANK_SCHARGE');
        $table->string('EFFECTIVE__DATE');
        $table->string('VALIDTY');
        $table->string('REMARKS');
        $table->date('datetime');
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('JEA');
    }
}
