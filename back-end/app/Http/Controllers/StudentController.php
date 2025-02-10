<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Student::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string',
        'course' => 'required|string',
        'email' => 'required|email',
        'phone' => 'required|string',
       
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'errors' => $validator->messages()
        ], 422);
    }

    try {
        Student::create($request->all());
        
        return response()->json([
            'status' => 200,
            'message' => 'Student Added Successfully'
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'status' => 500,
            'message' => 'Something went wrong'
        ], 500);
    }
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Student::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'course' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        $student = Student::findOrFail($id);
        $student->update($request->all());

        return response()->json([
            'status' => 200,
            'message' => 'Student Updated Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Student::findOrFail($id)->delete();
    }

    public function search($name){
        return Student::where('name', 'like', '%' . $name . '%')
                        ->orWhere('course', 'like', '%'.$name.'%')
                        ->orWhere('email', 'like', '%'.$name.'%')->get();
                        
    }
}
