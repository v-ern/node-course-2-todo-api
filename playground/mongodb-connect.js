//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to Database', error);
    }

    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne(
    //   {
    //     text: 'Pick up Juliens shoes',
    //     completed: false
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Item could not be added to Collection.', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );

    // Insert new doc into Users (name, age, location)

    // db.collection('Users').insertOne(
    //   {
    //     name: 'Valerie',
    //     age: 22,
    //     location: 'Cologne'
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to add to Collection 'Users'.", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    //   }
    // );
    client.close();
  }
);
