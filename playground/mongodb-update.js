const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to Database!');
    }

    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    // findOneAndUpdate()

    // db.collection('Todos')
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectID('5c190d5effa70af38cf7a646')
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     },
    //     { returnOriginal: false }
    //   )
    //   .then(res => console.log(res));

    db.collection('Users')
      .findOneAndReplace(
        {
          _id: new ObjectID('5c18ece8372ae11e88fb4ad1')
        },
        {
          $set: {
            name: 'Valerie'
          },
          $inc: {
            age: 12
          }
        },
        { returnOriginal: false }
      )
      .then(res => console.log(res));
    //db.close();
  }
);
