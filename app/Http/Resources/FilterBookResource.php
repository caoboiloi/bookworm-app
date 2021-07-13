<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FilterBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if (!is_null($this->discount_end_date)) {
            if ( !(date('Y-m-d') >= $this->discount_start_date and date('Y-m-d') <= $this->discount_end_date) ) {
                $this->discount_price = 0;
            }
        }
        else {
            if ( !(date('Y-m-d') >= $this->discount_start_date) ) {
                $this->discount_price = 0;
            }
        }
        return [
            'book_id' => $this->id,
            'discount_price' => $this->discount_price,
            'book_price' => $this->book_price,
            'final_price' => round($this->book_price - $this->discount_price, 2),
            // 'category' => new CategoryResource($this->category),
            // 'author' => new AuthorResource($this->author),
            'date_start' => $this->discount_start_date,
            'date_end' => $this->discount_end_date,
            // 'reviews' => $this->reviews
        ];
    }
}
