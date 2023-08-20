<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
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
        $pageTitle = 'Create Article';
        $formPayload = [
            'type' => 'create',
            'action' => 'articles.store',
            'data' => [],
            'submitLabel' => 'Save' 
        ];
        return Inertia::render('Article/FormInput', compact('pageTitle', 'formPayload'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request)
    {
        $validatedData = $request->validated();

        $validatedData['title'] = $request->title;
        $validatedData['content'] = $request->content;
        $validatedData['user_id'] = $request->user()->id;

        $article = new Article();
        $article->fill($validatedData);
        
        $article->save();

        return to_route('articles.index')->with('flash', [
            'status' => 'success',
            'message' => 'Your article was saved'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $title = 'Edit Article';
        return Inertia::render('Article/FormInput', compact('title'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $pageTitle = 'Edit Article';
        $formPayload = [
            'type' => 'edit',
            'action' => 'articles.update',
            'data' => $article,
            'submitLabel' => 'Update' 
        ];
        return Inertia::render('Article/FormInput', compact('pageTitle', 'formPayload'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $article)
    {
        $validatedData = $request->validated();

        $validatedData['title'] = $request->title;
        $validatedData['content'] = $request->content;

        $article->update($validatedData);

        return to_route('articles.index')->with('flash', [
            'status' => 'success',
            'message' => 'Your article was updated'
        ]);
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
