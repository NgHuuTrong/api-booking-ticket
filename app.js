const express = require('express');
const morgan = require('morgan');
const path = require('path');

const userRouter = require('./routes/userRoutes');
const stadiumRouter = require('./routes/stadiumRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Serving statis files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

// ROUTES: import from external files
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stadiums', stadiumRouter);

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} in this server!`));
});

// Global handling middleware
app.use(globalErrorHandler);

module.exports = app;
