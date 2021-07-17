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
        $categories = Category::orderBy('category_name')->get();
        $authors = Author::orderBy('author_name')->get();
        $stars = [1,2,3,4,5];
        return response()->json([
            'categories' => $categories,
            'authors' => $authors,
            'star' => $stars
        ], Response::HTTP_ACCEPTED);
    }
}
