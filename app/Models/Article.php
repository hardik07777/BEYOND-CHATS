<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'url',
        'content',
        'updated_content',
        'published_at',
    ];
}
