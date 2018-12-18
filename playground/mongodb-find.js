const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to Database', error);
    }

    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    // db.collection('Todos')
    //   .find()
    //   .count()
    //   .then(
    //     count => {
    //       console.log("To Do's count:");
    //       console.log(count);
    //     },
    //     err => {
    //       console.log('Unable to fetch ToDos.', err);
    //     }
    //   );
    // client.close();

    db.collection('Users')
      .find({ name: 'Valerie' })
      .count()
      .then(
        count => {
          console.log(`Valerie is inside your array ${count} times!`);
        },
        err => {
          console.log('Unable to fetch data.', err);
        }
      );
  }
);
