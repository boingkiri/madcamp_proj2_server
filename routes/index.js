// routes/index.js

const request = require('request');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

module.exports = function(app,Book)
{
    // GET ALL BOOKS
    app.get('/api/books', function(req,res){
        Book.find(function(err, books){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(books);
        })
    });

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', function(req, res){
        res.end();
    });

    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', function(req, res){
        res.end();
    });

    // CREATE BOOK
    app.post('/api/books', function(req, res){
        var book = new Book();        
        
        book.name = req.body.name;
        book.author = req.body.author;
        console.log(req.body);
        // book.published_date = new Date(req.body.published_date);
        book.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
            console.log("Data successfully uploaded");
        });
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', function(req, res){
        res.end();
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', function(req, res){
        res.end();
    });


}