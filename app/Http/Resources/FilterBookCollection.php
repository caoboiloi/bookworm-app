<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FilterBookCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            // Config pagination
            'link' => [
                'prev_url'  => $this->previousPageUrl(),
                'next_url'  => $this->nextPageUrl(),
                'first_url' => $this->url(1),
                'last_url' => $this->url($this->lastPage())
            ],
            'meta' => [
                'total' => $this->total(),
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
                'per_page' => $this->perPage()
            ],
            'data' => $this->collection,
        ];
    }
}
