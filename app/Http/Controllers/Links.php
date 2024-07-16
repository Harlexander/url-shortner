<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Models\LinkClick;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class Links extends Controller
{
    public function create(Request $request){
        $request->validate([
            'link' => ['required', 'url'],
            'slug' => ['nullable', "unique:links,slug"]
        ]);


        if($request->slug){
            $slug = $request->slug;

            Link::create([
                'slug' => $slug,
                'original_url' => $request->link,
                'short_url' => env('APP_URL').$slug,
                'user_id' => $request->user()->id
            ]);

            return back()->with([
                'success' => "url created successfully"
            ]);
        }

        $slug = Str::random(6);

        Link::create([
            'slug' => $slug,
            'original_url' => $request->link,
            'short_url' => env('APP_URL').$slug,
            'user_id' => $request->user()->id
        ]);

        return back()->with([
            'success' => "url created successfully"
        ]);

    }

    public function linkData(Request $request, $slug){
        $link = Link::where('slug', $slug)->first();

        $countryCount = LinkClick::where('link_id', $link->id)
        ->selectRaw('location, COUNT(*) as count')
        ->groupBy('location')
        ->get();
        $countryCount = $countryCount->sortByDesc('count')->values();

        $cityCount = LinkClick::where('link_id', $link->id)
        ->selectRaw('city, COUNT(*) as count')
        ->groupBy('city')
        ->get();
        $cityCount = $cityCount->sortByDesc('count')->values();


        error_log($cityCount);
        
        return Inertia::render('Link', [
            "link" => $link,
            "country" => $countryCount,
            "city" => $cityCount
        ]);
    }
}
