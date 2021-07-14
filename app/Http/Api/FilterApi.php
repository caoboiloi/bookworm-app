<?php

namespace App\Http\Api;

use Illuminate\Http\Request;
USE Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Author;

class FilterApi extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $authors = Author::all();
        return response()->json([
            'categories' => $categories,
            'authors' => $authors
        ], Response::HTTP_ACCEPTED);
    }
}
