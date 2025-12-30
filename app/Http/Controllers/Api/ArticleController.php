<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    // GET /api/articles
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Article::all()
        ], 200);
    }

    // GET /api/articles/{id}
    public function show($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ], 200);
    }

    // POST /api/articles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url|unique:articles,url',
            'content' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        $article = Article::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully',
            'data' => $article
        ], 201);
    }

    // PUT /api/articles/{id}
    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'url' => 'sometimes|required|url|unique:articles,url,' . $article->id,
            'content' => 'nullable|string',
            'updated_content' => 'nullable|string', // 👈 ADD THIS

            'published_at' => 'nullable|date',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $article->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Article updated successfully',
            'data' => $article
        ], 200);
    }

    // DELETE /api/articles/{id}
    public function destroy($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully'
        ], 200);
    }
}
