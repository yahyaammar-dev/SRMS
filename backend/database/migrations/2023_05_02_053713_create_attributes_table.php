<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->string('LDN_20ft');
            $table->string('LDN_40HC');
            $table->string('LDN_EWRI_TEU');
            $table->string('LDN_BAF_TEU');
            $table->string('ECR_PER_TEU');
            $table->string('Flexi_Sur_TEU');
            $table->string('DG_Sur_20FT');
            $table->string('DG_Sur_40FT');
            $table->string('DG_CLASS_1_PER_TEU');
            $table->string('REEFER_SUR');
            $table->string('DTHC_NON_HAZ_20FT');
            $table->string('DTHC_NON_HAZ_40FT');
            $table->string('DTHC_HAZ_20FT');
            $table->string('TANK_S_CHARGE_TUE');
            $table->string('GRI_TUE');
            $table->string('ROB_FEE_TUE');
            $table->string('MT_20ft');
            $table->string('MT_40HC');
            $table->string('MT_EWRI_TEU');
            $table->string('MT_BAF_TEU');
            $table->string('MT_TANK_S_CHARGE');
            $table->string('EFFECTIVE_DATE');
            $table->string('VALIDITY');
            $table->string('REMARKS');
            $table->date('datetime');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attributes');
    }
}
