var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        let movieID = new mongoose.Types.ObjectId(req.params.id);
        Movie.findOneAndUpdate({ _id: movieID }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function(req, res){
        let movieID = new mongoose.Types.ObjectId(req.params.id);
        Movie.findOneAndDelete({_id: movieID }, req.body.id, function(err){
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    removeActor: function(req, res){
        let movieID = new mongoose.Types.ObjectId(req.params.movieId);
        let actorID = new mongoose.Types.ObjectId(req.params.actorId);

        Movie.findOne({_id: movieID}, function(err, movie){
            if (err) return res.params.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: actorID}, function (err, actor) {
                if (err) return res.status(400).json();
                if (!movie) return res.status(404).json();
                movie.actors.remove(actor._id);
                movie.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },
    addActor: function(req, res){
        let movieID = new mongoose.Types.ObjectId(req.params.movieId);
        let actorID = new mongoose.Types.ObjectId(req.params.actorId);
        console.log('---movie id:'+movieID)
        console.log('---actor id:'+actorID)
                
        Movie.findOne({ _id: movieID }, function (err, movie) {
            console.log('---movie:')
                console.log(movie)
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: actorID }, function (err, actor) {
                console.log('---actor:')
                console.log(actor)
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })

            // movie.actors.push(actor._id);
            //     movie.save(function (err) {
            //         if (err) return res.status(500).json(err);
            //         res.json(movie);
            //     });

        });
    },
    getAllYear: function (req, res) {
       
        let year1 = req.params.year1;
        let year2 = req.params.year2;

        Movie.where('year').gte(year2).where('year').lte(year1).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
          
            res.json(movie);
       
        });
       
    },
    //Added
    deleteMovieYears: function (req, res) {
        console.log('Accessed')
        let details = (req.params.year); 
        Movie.deleteMany({'year' : {$lt: details}}, (err, movie) => {
            if (err) return res.status(400).json(err);

            res.json(movie);
        })
    
    }
    

};