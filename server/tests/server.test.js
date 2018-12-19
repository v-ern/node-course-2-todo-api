const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('./../server');
const Todo = require('./../models/todo');

const todos = [
  { text: 'Todo No. 1', _id: new ObjectID() },
  { text: 'Todo No. 2', _id: new ObjectID() },
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
