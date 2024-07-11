<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->string('short_url', 10)->unique();
            $table->text('original_url');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedInteger('clicks')->default(0);
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            // Adding a foreign key constraint (assuming a 'users' table exists)
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('link_clicks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('link_id');
            $table->string('ip_address');
            $table->string('user_agent');
            $table->string('referrer')->nullable();
            $table->string('location')->nullable();
            $table->timestamps();

            $table->foreign('link_id')->references('id')->on('links')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
