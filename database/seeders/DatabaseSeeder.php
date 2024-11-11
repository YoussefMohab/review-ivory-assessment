<?php

namespace Database\Seeders;

use App\Models\Poll;
use App\Models\Question;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create(); // Initialize Faker

        // Generate 10 fake polls
        foreach (range(1, 10) as $index) {
            $poll = Poll::create([
                'title' => $faker->sentence, // Fake poll title
            ]);

            // Generate 3-5 fake questions for each poll
            foreach (range(1, rand(3, 5)) as $qIndex) {
                $poll->questions()->create([
                    'question_text' => $faker->sentence, // Fake question text
                ]);
            }
        }
    }
}
