<?php

namespace App\Http\Controllers;
use App\Models\Employer;
use Illuminate\Http\Request;

class EmployerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
     $employers=Employer::all();
        return response()->json($employers);
        }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated=$request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'phone'      => 'required|string|max:20',
            'position'   => 'required|string|max:255',
            'hire_date'  => 'required|date',
            'salary'     => 'required|numeric|min:0',
            'email' => 'required|email|unique:employers,email',

        ]);
      Employer::create($validated);      
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employer=Employer::find($id);
        return response()->json($employer);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, $id)
{
    $employer = Employer::findOrFail($id);

    $validated = $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name'  => 'required|string|max:255',
        'phone'      => 'required|string|max:20',
        'position'   => 'required|string|max:255',
        'hire_date'  => 'required|date',
        'salary'     => 'required|numeric|min:0',
        'email'      => 'required|email|unique:employers,email,' . $id, // ignore l'email actuel
    ]);

    $employer->update($validated);

    return response()->json(['message' => 'Employé mis à jour avec succès']);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
          $employer=Employer::find($id);
          $employer->delete();
    }
}
