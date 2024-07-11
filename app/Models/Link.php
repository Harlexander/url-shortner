<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;


    protected $fillable = [
        'original_url',
        'short_url',
        'user_id',
        'clicks',
        'expires_at'
    ];

    protected $dates = [
        'expires_at'
    ];

    /**
     * Get the user that owns the link.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the clicks for the link.
     */
    public function clicks()
    {
        return $this->hasMany(LinkClick::class);
    }
}
