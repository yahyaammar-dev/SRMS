<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSlotDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slot_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attribute_id');
            $table->integer('value');
            $table->unsignedBigInteger('shipment_id');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('attribute_id')->references('id')->on('attributes');
         });
    }
    
    public function down()
    {
        Schema::dropIfExists('slot_details');
    }
}
