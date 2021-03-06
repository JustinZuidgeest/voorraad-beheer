<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
			User::factory()->create(['name' => 'John', 'password' => bcrypt('password')]);

			Product::factory(100)->create();
    }
}
