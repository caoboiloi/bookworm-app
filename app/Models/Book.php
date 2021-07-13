<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class Book extends Model
{
    use Filterable;
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'books';

    public $timestamps = false;

    protected $filterable = [
        'sort',
        'category',
        'author',
        'star'
    ];

    /**
     * Get the author that owns the Book
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function author()
    {
        // return $this->belongsTo(Author::class, 'author_id', 'id')->select('id','author_name','author_bio');
        return $this->belongsTo(Author::class, 'author_id', 'id');
    }


    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    /**
     * Get all of the discounts for the Book
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function discounts()
    {
        return $this->hasMany(Discount::class, 'book_id', 'id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'book_id', 'id');
    }

    // Accessor for discount_price

    public function getDiscountPriceAttribute($value)
    {
        return $value !== null ? $value : 0;
    }

    public function scopeGroup($query)
    {
        return $query
        ->leftJoin('reviews', 'reviews.book_id', 'books.id')
        ->leftJoin('discounts', 'discounts.book_id', 'books.id')
        ->groupBy('books.id', 'discounts.id')
        ->select('books.id', 'discounts.discount_price', 'books.book_price', 'books.category_id', 'books.author_id', 'discount_start_date', 'discount_end_date');
    }

    // SORT

    public function sortSale($query)
    {
        return $query
        ->orderByRaw('CASE
                    WHEN (discount_end_date IS NULL AND DATE(NOW()) >= discount_start_date) THEN discount_price
                    WHEN (discount_end_date IS NOT NULL AND ( DATE(NOW()) >= discount_start_date AND DATE(NOW()) <= discount_end_date ) ) THEN discount_price
                    ELSE 0
                    END DESC')
        ->orderByRaw('CASE
                    WHEN (discount_end_date IS NULL AND DATE(NOW()) >= discount_start_date) THEN book_price - discount_price
                    WHEN (discount_end_date IS NOT NULL AND ( DATE(NOW()) >= discount_start_date AND DATE(NOW()) <= discount_end_date ) ) THEN book_price - discount_price
                    ELSE book_price
                    END ASC');
    }

    public function sortPopular($query)
    {
        return $query
        ->orderBy(\DB::raw('COUNT(CAST(reviews.rating_start as INT))'),'DESC')
        ->orderByRaw('CASE
                    WHEN (discount_end_date IS NULL AND DATE(NOW()) >= discount_start_date) THEN book_price - discount_price
                    WHEN (discount_end_date IS NOT NULL AND ( DATE(NOW()) >= discount_start_date AND DATE(NOW()) <= discount_end_date ) ) THEN book_price - discount_price
                    ELSE book_price
                    END ASC');
    }

    public function sortDesc($query)
    {
        return $query
        ->orderByRaw('CASE
                    WHEN (discount_end_date IS NULL AND DATE(NOW()) >= discount_start_date) THEN book_price - discount_price
                    WHEN (discount_end_date IS NOT NULL AND ( DATE(NOW()) >= discount_start_date AND DATE(NOW()) <= discount_end_date ) ) THEN book_price - discount_price
                    ELSE book_price
                    END DESC');
    }

    public function sortAsc($query)
    {
        return $query
        ->orderByRaw('CASE
                    WHEN (discount_end_date IS NULL AND DATE(NOW()) >= discount_start_date) THEN book_price - discount_price
                    WHEN (discount_end_date IS NOT NULL AND ( DATE(NOW()) >= discount_start_date AND DATE(NOW()) <= discount_end_date ) ) THEN book_price - discount_price
                    ELSE book_price
                    END ASC');
    }

    // FILTER
    public function filterStar($query, $value)
    {
        if (is_numeric($value)) {
            return $query
            ->havingRaw("(
                count(case when reviews.rating_start like '1' then 1 else null end) +
                count(case when reviews.rating_start like '2' then 1 else null end) +
                count(case when reviews.rating_start like '3' then 1 else null end) +
                count(case when reviews.rating_start like '4' then 1 else null end) +
                count(case when reviews.rating_start like '5' then 1 else null end)) > ?"
                , [0])
            ->havingRaw("
                (
                count(case when reviews.rating_start like '1' then 1 else null end)*1 +
                count(case when reviews.rating_start like '2' then 1 else null end)*2 +
                count(case when reviews.rating_start like '3' then 1 else null end)*3 +
                count(case when reviews.rating_start like '4' then 1 else null end)*4 +
                count(case when reviews.rating_start like '5' then 1 else null end)*5
                ) / (
                count(case when reviews.rating_start like '1' then 1 else null end) +
                count(case when reviews.rating_start like '2' then 1 else null end) +
                count(case when reviews.rating_start like '3' then 1 else null end) +
                count(case when reviews.rating_start like '4' then 1 else null end) +
                count(case when reviews.rating_start like '5' then 1 else null end)
                )
                >= ?
            ", [$value]);
        }
    }

    public function filterAuthor($query, $value)
    {
        return $query->where('books.category_id', $value);
    }

    public function filterCategory($query, $value)
    {
        return $query->where('books.author_id', $value);
    }
}
