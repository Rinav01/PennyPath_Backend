
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authRoutes = require('../routes/auth');
const categoryRoutes = require('../routes/categories');
const expenseRoutes = require('../routes/expenses');
const User = require('../models/user');
const Category = require('../models/category');
const Expense = require('../models/expense');
const authMiddleware = require('../middleware/auth');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/categories', authMiddleware, categoryRoutes);
app.use('/api/expenses', authMiddleware, expenseRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
  await Category.deleteMany({});
  await Expense.deleteMany({});
});

describe('PennyPath API', () => {
  let token;
  let userId;
  let categoryId;

  beforeEach(async () => {
    const userRes = await request(app)
      .post('/api/auth/signup')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    userId = userRes.body.userId;

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    token = loginRes.body.token;

    const categoryRes = await request(app)
      .post('/api/categories/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Groceries', icon: 'shopping-cart', color: '#FF0000' });
    categoryId = categoryRes.body._id;
  });

  // Auth
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ name: 'Test User 2', email: 'test2@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(201);
  });

  it('should login a user and return user name', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test User');
  });

  // Categories
  it('should create a category', async () => {
    const res = await request(app)
      .post('/api/categories/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Transport', icon: 'bus', color: '#0000FF' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Transport');
  });

  it('should list categories', async () => {
    const res = await request(app)
      .get('/api/categories/list')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
  });

  // Expenses
  it('should create an expense', async () => {
    const res = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 50, date: '2024-07-29', categoryId });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('amount', 50);
  });

  it('should list expenses', async () => {
    await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 50, date: '2024-07-29', categoryId });

    const res = await request(app)
      .get('/api/expenses')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
  });

  it('should update an expense', async () => {
    const expenseRes = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 50, date: '2024-07-29', categoryId });

    const res = await request(app)
      .put(`/api/expenses/${expenseRes.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 60 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('amount', 60);
  });

  it('should delete an expense', async () => {
    const expenseRes = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 50, date: '2024-07-29', categoryId });

    const res = await request(app)
      .delete(`/api/expenses/${expenseRes.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Expense deleted successfully');
  });
});
