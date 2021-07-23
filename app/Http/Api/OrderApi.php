<?php

namespace App\Http\Api;

use Illuminate\Http\Request;
USE Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class OrderApi extends Controller
{
    public function store(Request $request)
    {
        if($request-> method('POST'))
        {
            try {
                \DB::transaction(function () {
                    $id = 1;
                    $id_item = 0;
                    $data_items = array();

                    $number = \DB::table('orders')->max('id');
                    if (!is_null($number)) {
                        $id = $number + 1;
                    }

                    $max_id = \DB::table('order_items')->max('id');
                    if (!is_null($max_id)) {
                        $id_item = $max_id + 1;
                    }
                    $credentials = request() -> validate([
                        'book' => ['required','array'],
                    ]);
                    $order_amount = 0;
                    foreach ($credentials['book'] as $value) {
                        $data_items[] = [
                            'id' => $id_item,
                            'order_id' => $id,
                            'book_id' => $value['id'],
                            'quantity' => $value['quantity'],
                            'price' => $value['price']
                        ];
                        $order_amount += ( $value['quantity'] * $value['price'] );
                        $id_item ++;
                    };
                    \DB::table('orders')->insert([
                        'id' => $id,
                        'order_date' => now(),
                        'order_amount' => $order_amount
                    ]);

                    \DB::table('order_items')->insert($data_items);
                }, 4);
                return response()->json([
                    'message' => 'Order created successfully'
                ], Response::HTTP_CREATED);
            } catch (\Throwable $th) {
                return response()->json([
                    'error' => 'Server error',
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }
}
