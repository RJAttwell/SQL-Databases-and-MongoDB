//jshint esversion:6
//Mongoose Notes:

// JavaScript Library that simplifies the writing of validation code and boilerplate 
//To install in terminal, use 'npm i mongoose'

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

//Create new collection
const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema)

//Create document from model above which sticks to the schema
const fruit = new Fruit ({
    name: "Apple",
    rating: 8,
    review: "A solid fruit."
});

const person = new Person ({
    name: "Richard",
    age: 26
})

//Save document inside the collection
// fruit.save();
person.save();

const kiwi = new Fruit ({
    name: "Kiwi",
    score: 6.5,
    review: "It's aight I guess"
});

const orange  = new Fruit ({
    name: "Orange",
    score: 10,
    review: "The GOAT"
});

const banana = new Fruit ({
    name: "Banana",
    score: 9.5,
    review: "Easy S tier"
});

//Callback function checks if there's any errors with logging the documents
// Fruit.insertMany([
//     kiwi, 
//     orange, 
//     banana
// ]).then(function(){
//     console.log("Successfully saved all fruits to fruitsDB")
// }).catch(function(error){
//     console.log(error)
// });

//Reading from database with Mongoose
//Tap into Fruit database and perform the find function

Fruit.startSession().then(function(){
    console.log(fruit)
}).catch(function(error){
    console.log(error)
});