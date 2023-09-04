const express = require('express');
const morgan = require('morgan');
const path = require('path');

const userRouter = require('./routes/userRoutes');
const stadiumRouter = require('./routes/stadiumRoutes');
const globalErrorHandler = require('./controllers/errorController');

const ticketController = require('./controllers/ticketController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving statis files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ROUTES: import from external files
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stadiums', stadiumRouter);
app.get('/pay', ticketController.createCheckoutSession);
app.get('/pay/success', ticketController.executeCheckout);
app.get('/pay/cancel', (req, res) => res.send('Cancelled'));
app.get('/', (req, res) => res.render('index'));

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} in this server!`));
});

// Global handling middleware
app.use(globalErrorHandler);

module.exports = app;
