<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateShipmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->integer('port_id');
            $table->string('pod');
            $table->string('terminal');
            $table->integer('volume_per_teu');
            $table->string('T_S_or_diect');
            $table->string('Slot_term');
            $table->integer('operator_id');
            $table->integer('service_id');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            $table->softDeletes();
            $table->unsignedBigInteger('shipment_id');
            $table->unsignedBigInteger('slot_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipments');
    }
}