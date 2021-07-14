<?php

namespace App\Http\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Review;

use App\Http\Resources\ReviewBookCollection;

class ReviewBookApi extends Controller
{
    public function index($book)
    {
        $bookDetail = Book::findOrFail($book);
        $rv = Book::findOrFail($book)->reviews()->paginate(10);
        return response()->json([
            'book' => $bookDetail,
            'reviews'=> $rv,
        ], Response::HTTP_ACCEPTED);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($book, $review)
    {
        $bookDetail = Book::findOrFail($book);
        $rv = Book::findOrFail($book)->reviews()->findOrFail($review);

        return response()->json([
            'book' => $bookDetail,
            'reviews'=> $rv,
        ], Response::HTTP_ACCEPTED);
    }

    public function filter(Request $request, $book)
    {
        $params = $request->all();
        if (!key_exists('show', $params)) {
            return response()->json([
                'error' => 'Please try again.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        $filterReview = Review::where('book_id', $book)
        ->filter($params)
        ->paginate($params['show'])
        ->appends(request()->query());

        $filterReview = new ReviewBookCollection($filterReview);
        if (key_exists('group', $params) && $params['group'] == 'count') {
            $group = Review::group($book)->get();
            return response()->json([
                'count' => $group,
                'reviews' => $filterReview
            ], Response::HTTP_ACCEPTED);
        }
        return response()->json([
            'reviews' => $filterReview
        ], Response::HTTP_ACCEPTED);
    }
}
