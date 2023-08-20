<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource
     */
    public function index(Request $request)
    {
        return Inertia::render('Article/Index');
    }

    /*
    * Display pagination resource JSON
    */
    public function list()
    {
        $articles = QueryBuilder::for(Article::class)
            ->allowedFilters(['title', 'content', 'user.name'])
            ->with('user')
            ->allowedSorts('title', 'content')
            ->paginate(request()->query('limit'))
            ->appends(request()->query());

        return response()->json($articles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $title = 'Create Article';
        return Inertia::render('Article/Form', compact('title'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($articleId, Request $request)
    {
        try {
            $article = Article::findOrFail($articleId);

            $article->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Your article was deleted'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}
