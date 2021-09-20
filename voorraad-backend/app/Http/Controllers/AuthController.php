<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
	{
		$credentials = $request->only('name', 'password');

        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();

            return Auth::user();
        }

		return response()->json(['error' => 'Unknown username / password'], 401);
	}

	public function logout(Request $request)
	{
		Auth::logout();
		
		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return response('Logout succesful', 200)->header('Content-Type', 'text/plain');
	}
}
