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
            'slug' => ['nullable', "unique:links,slug"],
            'name' => 'required|min:4'
        ]);


        if($request->slug){
            $slug = $request->slug;

            Link::create([
                'slug' => $slug,
                'original_url' => $request->link,
                'short_url' => env('APP_URL').$slug,
                'user_id' => $request->user()->id,
                'name' => $request->name
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
            'user_id' => $request->user()->id,
            'name' => $request->name
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
        ->orderBy('count', 'desc')
        ->get();


        $cityCount = LinkClick::where('link_id', $link->id)
        ->selectRaw('city, COUNT(*) as count')
        ->groupBy('city')
        ->orderBy('count', 'desc')
        ->get();

        $devices = LinkClick::where('link_id', $link->id)
        ->selectRaw('user_agent, COUNT(*) as count')
        ->groupBy('user_agent')
        ->orderBy('count', 'desc')
        ->get();

        $days = LinkClick::where('link_id', $link->id)
        ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
        ->groupBy('date')
        ->get();

        error_log($countryCount);
        
        return Inertia::render('Link', [
            "link" => $link,
            "country" => $countryCount,
            "city" => $cityCount,
            "devices" => $devices,
            "days" => $days
        ]);
    }

    public function editLink(Request $request, $slug){
        $request->validate([
            'name' => 'required',
            'original_url' => 'required|url'
        ]);


        $link = Link::where("slug", $slug)->first();

        if($link){
            $link->name = $request->name;
            $link->original_url = $request->original_url;
            $link->save();
        }

        return back()->with([
            'message' => "Link details updated successfully"
        ]);
    }
};
