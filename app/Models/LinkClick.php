<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkClick extends Model
{
    use HasFactory;

    protected $table = 'link_clicks';

    protected $fillable = [
        'link_id',
        'ip_address',
        'user_agent',
        'referrer',
        'location',
        'city'
    ];

    /**
     * Get the link that owns the click.
     */
    public function link()
    {
        return $this->belongsTo(Link::class);
    }

}
