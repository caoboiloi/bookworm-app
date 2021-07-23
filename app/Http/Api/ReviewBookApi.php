<?php

namespace App\Http\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Review;

use App\Http\Resources\ReviewBookCollection;
use App\Http\Resources\DetailBookResource;
use App\Http\Resources\ReviewBookResource;

class ReviewBookApi extends Controller
{
    public function index($book)
    {
        $bookDetail = Book::detail()->findOrFail($book);
        $bookDetail = new DetailBookResource($bookDetail);

        $reviews = Book::findOrFail($book)->reviews()->paginate(4);
        $reviews = new ReviewBookCollection($reviews);

        $group = Review::group($book)->get();

        return response()->json([
            'book' => $bookDetail,
            'count' => $group,
            'reviews' => $reviews
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
        $bookDetail = Book::detail()->findOrFail($book);
        $bookDetail = new DetailBookResource($bookDetail);

        $review = Book::findOrFail($book)->reviews()->findOrFail($review);
        $review = new ReviewBookResource($review);

        return response()->json([
            'book' => $bookDetail,
            'review'=> $review,
        ], Response::HTTP_ACCEPTED);
    }

    public function filter(Request $request, $book)
    {
        try {
            $params = $request->all();
            if (!key_exists('show', $params)) {
                return response()->json([
                    'error' => 'Request is missing pagination attribute'
                ], Response::HTTP_MISDIRECTED_REQUEST);
            }
            $filterReview = Review::where('book_id', $book)
            ->filter($params)
            ->paginate($params['show'])
            ->appends(request()->query());

            $filterReview = new ReviewBookCollection($filterReview);
            if (key_exists('group', $params) && $params['group'] == 'count') {
                $group = Review::group($book)->get();
                return response()->json([
                    'count' => $group[0],
                    'reviews' => $filterReview
                ], Response::HTTP_OK);
            }
            return response()->json([
                'reviews' => $filterReview
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
