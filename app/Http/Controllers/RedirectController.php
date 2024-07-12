<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Models\LinkClick;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;

class RedirectController extends Controller
{
    public function open(Request $request, $slug)
    {
        $link = Link::where('slug', $slug)->first();

        if($link){
            $country = null;
            $position = Location::get($request->ip());
            if($position){
                $country = $position->countryName;
            }

            LinkClick::create([
                'link_id' => $link->id,
                'location' => $country,
                'ip_address' => $request->ip(),
                'referrer' => $request->headers->get('referer'),
                'user_agent' => $request->header('User-Agent')
            ]);

            $link->clicks++;
            $link->save();

            return redirect($link->original_url);
        }

        return redirect()->route('dashboard');
    }
}
