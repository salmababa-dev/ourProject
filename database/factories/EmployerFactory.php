<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employer>
 */
class EmployerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
          return [
    'first_name' => $this->faker->firstName,
    'last_name' => $this->faker->lastName,
    'email' => $this->faker->unique()->safeEmail,
    'phone' => $this->faker->phoneNumber,
    'position' => $this->faker->jobTitle,
    'hire_date' => $this->faker->date(),
    'salary' => $this->faker->numberBetween(3000, 10000),
];

    }
}
