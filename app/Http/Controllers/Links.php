<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
}
