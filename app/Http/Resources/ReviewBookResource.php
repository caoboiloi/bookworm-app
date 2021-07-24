<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->review_date = date('H:i - F j, Y',strtotime($this->review_date));
        return [
            "id" => $this->id,
            "review_title" => $this->review_title,
            "review_details" => $this->review_details,
            "review_date" => $this->review_date,
            "rating_start" => $this->rating_start
        ];
    }
}
