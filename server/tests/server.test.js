const expect = require('expect');
const request = require('supertest');

const app = require('./../server');
const Todo = require('./../models/todo');

const todos = [
  { text: 'Todo No. 1' },
  { text: 'Todo No. 2' },
  { text: 'Todo No. 3' }
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
