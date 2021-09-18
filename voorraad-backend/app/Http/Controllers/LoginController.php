<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function login(Request $request)
	{
		Log::info('help');

		$credentials = $request->only('name', 'password');

		Log::debug('sanity');

        if (Auth::attempt($credentials)) {
			Log::debug('check');

            $request->session()->regenerate();
			
			Log::debug('pls');

            return response('Login succesful', 200)->header('Content-Type', 'text/plain');
        }
	}

	public function logout(Request $request)
	{
		Auth::logout();
		
		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return response('Logout succesful', 200)->header('Content-Type', 'text/plain');
	}
}
