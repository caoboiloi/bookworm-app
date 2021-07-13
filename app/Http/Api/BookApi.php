<?php

namespace App\Http\Api;

use Illuminate\Http\Request;
USE Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Http\Resources\FilterBookCollection;
use App\Models\Book;
use App\Models\Discount;
use Carbon\Carbon;

class BookApi extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::all();

        // Resource collection
        $bookResourceCollection = new BookCollection($books);

        return response()->json([
            'books' => $bookResourceCollection
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // dd($id);
        // BelongTo
        $book = Book::findOrFail($id);
        // dd($book);

        // Json resource
        $bookJsonResource = new BookResource($book);
        // var_dump($bookJsonResource);

        // Eloquent belongTo relationship
        // $author = $book->author;
        // if you change the select in this,the book collection ($book) don't exist the category
        // $category = $book->category()->select(['id'])->get();

        // dd($category->toArray());

        return response()->json($bookJsonResource, Response::HTTP_ACCEPTED);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
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
