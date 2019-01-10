const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('./../server');
const Todo = require('./../models/todo');

const port = process.env.PORT || 3001;
const todos = [
  { text: 'Todo No. 1', _id: new ObjectID() },
  {
    text: 'Todo No. 2',
    _id: new ObjectID(),
    completed: true,
    completedAt: 333
  },
  { text: 'Todo No. 3', _id: new ObjectID() }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(() => {
      done();
    });
});

describe('POST /todos', () => {
  it('should create a new Todo', done => {
    var text = 'Test Todo';
    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });

  it('should throw an error due to invalid body', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(3);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});

describe('GET /todos', () => {
  it('should GET all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    const id = new ObjectID();
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is not an ObjectID', done => {
    request(app)
      .get('/todos/123')
      .expect(400)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should return deleted route', done => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => expect(res.body.todo.text).toBe(todos[0].text))
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(todos[0]._id.toHexString()) // check if item has really been deleted
          .then(todo => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should return 404 if todo not found', done => {
    const id = new ObjectID();
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is not an ObjectID', done => {
    request(app)
      .delete('/todos/12345')
      .expect(400)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .send({
        completed: true,
        text: 'Updated'
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe('Updated');
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', done => {
    request(app)
      .patch(`/todos/${todos[1]._id.toHexString()}`)
      .send({ completed: false, text: 'Updated' })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe('Updated');
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});
