<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait Filterable
{
    public function scopeSort($query, $param)
    {
        foreach ($param as $field => $value) {
            $method = 'sort' . Str::studly($value);

            if ($value === '') {
                continue;
            }

            if (empty($this->filterable) || !is_array($this->filterable)) {
                continue;
            }

            if (in_array($field, $this->filterable)) {
                if (method_exists($this, $method)) {
                    $this->{$method}($query);
                }
                continue;
            }
        }

        return $query;
    }
    public function scopeFilter($query, $param)
    {
        foreach ($param as $field => $value) {
            $method = 'filter' . Str::studly($field);
            $methodSort = 'scope' . Str::studly($field);
            if ($value === '') {
                continue;
            }

            if (empty($this->filterable) || !is_array($this->filterable)) {
                continue;
            }
            if (in_array($field, $this->filterable)) {
                if (method_exists($this, $method)) {
                    $this->{$method}($query, $value);
                }
                if (method_exists($this, $methodSort)) {
                    $this->{$methodSort}($query, $param);
                }
                continue;
            }
        }

        return $query;
    }
}
