//jshint esversion:6
//Mongoose Notes:

// JavaScript Library that simplifies the writing of validation code and boilerplate
//To install in terminal, use 'npm i mongoose'

const mongoose = require("mongoose");

//Connect to mongoose
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {
  useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    //To ensure a certain piece of data is entered we must use required
    required: [true, "Must include fruit name"],
  },
  //Can add validation
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  //Embedding a fruit document inside the property called favouriteFruit inside our Person document
  favouriteFruit: fruitSchema,
});

//Create new collection
const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);

//Create document from model above which sticks to the schema
//FRUIT
const apple = new Fruit({
  name: "Apple",
  rating: 8,
  review: "A solid fruit.",
});

const fruit = new Fruit({
  name: "Peach",
  rating: 6,
  review: "Pretty mid",
});

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 10,
  review: "Only other 10",
});

const raspberries = new Fruit({
  name: "Raspberries",
  rating: 7.5,
  review: "Probably the best berry fruit",
});

//PEOPLE

const Jessica = new Person({
  name: "Jessica",
  age: 25,
  favouriteFruit: raspberries,
});

const person = new Person({
  name: "John",
  age: 47,
  //Will cause the fruit object to be embedded inside the person document establishing a relationship
  favouriteFruit: pineapple,
});

const Richard = new Person({
  name: "Richard",
  age: 26,
});

//Save document inside the collection
fruit.save();
person.save();
pineapple.save();
raspberries.save();
Jessica.save();

Person.updateOne({ name: "Richard" }, { favouriteFruit: apple })
  .then(function (err) {
    console.log(err);
  })
  .catch(function () {
    console.log("Successfully updated the document");
  });

//INSERT MANY EXAMPLE:

const kiwi = new Fruit({
  name: "Kiwi",
  score: 6.5,
  review: "It's aight I guess",
});

const orange = new Fruit({
  name: "Orange",
  score: 10,
  review: "The GOAT",
});

const banana = new Fruit({
  name: "Banana",
  score: 9.5,
  review: "Easy S tier",
});

//Callback function checks if there's any errors with logging the documents

Fruit.insertMany([kiwi, orange, banana])
  .then(function () {
    console.log("Successfully saved all fruits to fruitsDB");
  })
  .catch(function (error) {
    console.log(error);
  });

//Reading from database with Mongoose
//Tap into Fruit database and perform the find function

Fruit.startSession()
  .then(function () {
    console.log("Successfully saved all fruits to fruitsDB");
    //Close the mongoose connection
    mongoose.connection.close();
  })
  .catch(function (error) {
    console.log(error);
  });

//UPDATE DATA EXAMPLE:

//Specify parameters, first will be the filter
//Will find the _id of the object in the terminal
Fruit.updateOne({ _id: "6410fa1fd0dc09c27f2c5e51" }, { name: "Blueberry" })
  .then(function (err) {
    console.log(err);
  })
  .catch(function () {
    console.log("Successfully updated the document");
  });

//DELETE DATA EXAMPLE:

Fruit.deleteOne({ _id: "6410f1d10cd52bfde1cc069a" })
  .then(function (err) {
    console.log(err);
  })
  .catch(function () {
    console.log("Successfully deleted the document");
  });

//Delete several documents:

Person.deleteMany({ name: "Richard" })
  .then(function (err) {
    console.log(err);
  })
  .catch(function () {
    console.log("Successfully deleted all of the requested documents");
  });
