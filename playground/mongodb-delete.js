const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to Database!');
    }

    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    //deleteMany
    // db.collection('Todos')
    //   .deleteMany({ completed: true })
    //   .then(
    //     res => console.log('Successfully deleted.', res),
    //     err => console.log("We couldn't delete any entries.", err)
    //   );

    db.collection('Users')
      .deleteMany({ name: 'Valerie' })
      .then(
        res => console.log('Successfully deleted all entries with given name.'),
        err => {
          console.log('An error ocurred.', err);
        }
      );

    //deleteOne
    // db.collection('Todos')
    //   .deleteOne({ text: 'Pick up Juliens shoes' })
    //   .then(
    //     res => console.log('Successfully deleted.', res),
    //     err => console.log("We couldn't delete any entries.", err)
    //   );

    //findOneAndDelete
    // db.collection('Todos')
    //   .findOneAndDelete({ completed: true })
    //   .then(
    //     res =>
    //       console.log(
    //         `Successfully deleted entry with text ${
    //           res.value.text
    //         } and status of ${
    //           res.value.completed ? 'completed' : 'unfinished'
    //         }.`,
    //         res
    //       ),
    //     err => console.log("We couldn't delete any entries.", err)
    //   );

    db.collection('Users')
      .findOneAndDelete({ _id: ObjectID('5c18ecda9545241e877a3e06') })
      .then(
        res => console.log(`Successfully deleted ${res.value.name}.`),
        err => console.log('Something went wrong!', err)
      );

    //db.close();
  }
);
