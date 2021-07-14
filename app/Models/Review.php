<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class Review extends Model
{
    use Filterable;
    use HasFactory;

    public $timestamps = false;

    protected $filterable = [
        'sort',
        'star'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'rating_start' => 'integer',
    ];
    public function scopeGroup($query, $book)
    {
        return $query
        ->where('book_id', $book)
        ->selectRaw("count(case when rating_start like '1' then 1 else null end) as one_star")
        ->selectRaw("count(case when rating_start like '2' then 1 else null end) as two_star")
        ->selectRaw("count(case when rating_start like '3' then 1 else null end) as three_star")
        ->selectRaw("count(case when rating_start like '4' then 1 else null end) as four_star")
        ->selectRaw("count(case when rating_start like '5' then 1 else null end) as five_star")
        ->selectRaw("count(rating_start) as count_star")
        ->selectRaw("ROUND(AVG(CAST(rating_start as INT)),2) as avg_star");
    }
    public function sortDesc($query)
    {
        return $query
        ->orderBy('review_date', 'DESC');
    }
    public function sortAsc($query)
    {
        return $query
        ->orderBy('review_date', 'ASC');
    }
    public function filterStar($query, $value)
    {
        if (is_numeric($value)) {
            if ($value == 0) {
                return $query
                ->where(\DB::raw('CAST(rating_start as INT)'),'>=',$value);
            }
            return $query
            ->where(\DB::raw('CAST(rating_start as INT)'),'=',$value);
        }
        return $query;
    }
}
