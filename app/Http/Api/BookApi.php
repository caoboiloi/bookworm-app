<?php

namespace App\Http\Api;

use Illuminate\Http\Request;
USE Illuminate\Http\Response;
use App\Http\Controllers\Controller;

use App\Http\Resources\FilterBookCollection;
use App\Http\Resources\DetailBookResource;

use App\Models\Book;

class BookApi extends Controller
{
    public function index()
    {
        $books = Book::detail()->get();

        // Resource collection
        $books = DetailBookResource::collection($books);

        return response()->json([
            'books' => $books
        ], Response::HTTP_ACCEPTED);
    }

    public function show($id)
    {
        $book = Book::detail()->findOrFail($id);

        $book = new DetailBookResource($book);

        return response()->json([
            'book' => $book
        ], Response::HTTP_ACCEPTED);
    }

    public function filter(Request $request)
    {
        $params = $request->all();
        if (!key_exists('show', $params)) {
            return response()->json([
                'error' => 'Please try again.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        $filterBook = Book::group()->filter($params)->paginate($params['show'])->appends(request()->query());

        $filterBook = new FilterBookCollection($filterBook);

        return response()->json($filterBook, Response::HTTP_ACCEPTED);
    }
}
