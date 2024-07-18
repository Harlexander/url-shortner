<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Models\LinkClick;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $userId = $request->user()->id;

        $userLinks = Link::select('short_url', 'original_url', 'clicks', 'id', 'slug')
            ->where('user_id', $userId)
            ->latest()
            ->limit(6)
            ->get();


        $linkIds = $userLinks->pluck('id');

        // Fetch the LinkClick counts grouped by location for the user's links
        $countryCount = LinkClick::whereIn('link_id', $linkIds)
            ->selectRaw('location, COUNT(*) as count')
            ->groupBy('location')
            ->get();

        $countryCount = $countryCount->sortByDesc('count')->values();

        $userLinksCount = Link::where('user_id', $userId)->count();

        $userTotalClicks = Link::where('user_id', $userId)->sum('clicks');

        return Inertia::render('Dashboard', [
            'links' => $userLinks,
            'urls' => $userLinksCount,
            'clicks' => $userTotalClicks,
            'country' => $countryCount
        ]);
    }

    public function links(Request $request){
        $userId = $request->user()->id;
        
        $userLinks = Link::where('user_id', $userId)
        ->latest()
        ->get();

        return Inertia::render('Links', [
            'links' => $userLinks
        ]);
    }
}

