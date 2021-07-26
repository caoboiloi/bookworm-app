<?php

namespace App\Http\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

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
        try {
            $bookDetail = Book::detail()->findOrFail($book);
            $bookDetail = new DetailBookResource($bookDetail);

            $reviews = Book::findOrFail($book)->reviews()->paginate(4);
            $reviews = new ReviewBookCollection($reviews);

            $group = Review::group($book)->get();

            return response()->json([
                'book' => $bookDetail,
                'count' => $group,
                'reviews' => $reviews
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Server error',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request, $book)
    {
        try {
            $validation = Validator::make($request->all(),[
                'review_title' => ['required','string','max:150'],
                'review_details' => ['required','string'],
                'rating_start' => ['required','numeric']
            ]);
            $errors = $validation->errors();
            if (count($errors) != 0) {
                return response()->json([
                    'error' => $errors
                ], Response::HTTP_MISDIRECTED_REQUEST);
            }
            $data = $request->all();
            $review = new Review();
            $review->book_id = $book;
            $review->review_title = $data['review_title'];
            $review->review_details = $data['review_details'];
            $review->rating_start = $data['rating_start'];
            $review->review_date = Carbon::now()->timezone('Asia/Ho_Chi_Minh');
            $review->save();
            return response()->json([
                'message' => 'Review created successfully'
            ], Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Server error',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($book, $review)
    {
        try {
            $bookDetail = Book::detail()->findOrFail($book);
            $bookDetail = new DetailBookResource($bookDetail);

            $review = Book::findOrFail($book)->reviews()->findOrFail($review);
            $review = new ReviewBookResource($review);

            return response()->json([
                'book' => $bookDetail,
                'review'=> $review,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Server error',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function filter(Request $request, $book)
    {
        try {
            $params = $request->all();
            if (!key_exists('show', $params)) {
                return response()->json([
                    'error' => 'Request is missing attribute'
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
                'error' => 'Server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
