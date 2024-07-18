<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Models\LinkClick;
use Detection\MobileDetect;
use Faker\Provider\UserAgent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;


class RedirectController extends Controller
{
    public function open(Request $request, $slug)
    {
        $link = Link::where('slug', $slug)->first();

        if($link){
            $country = null; $city = null;
            $position = Location::get($request->ip());
            if($position){
                $country = $position->countryName;
                $city = $position->cityName;
            }

            $detect = new MobileDetect();

            if ($detect->isMobile() && !$detect->isTablet()) {
                $deviceType = 'mobile';
            } elseif ($detect->isTablet()) {
                $deviceType = 'tablet';
            } else {
                $deviceType = 'desktop';
            }

            LinkClick::create([
                'link_id' => $link->id,
                'location' => $country,
                'ip_address' => $request->ip(),
                'referrer' => $request->headers->get('referer'),
                'user_agent' => $deviceType,
                'city' => $city
            ]);

            $link->clicks++;
            $link->save();

            return redirect($link->original_url);
        }

        return redirect()->route('dashboard');
    }
}
