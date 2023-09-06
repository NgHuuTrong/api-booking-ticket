const express = require('express');
const morgan = require('morgan');
const path = require('path');

const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const stadiumRouter = require('./routes/stadiumRoutes');
const matchRouter = require('./routes/matchRoutes');
const groupRouter = require('./routes/groupRoutes');
const viewRouter = require('./routes/viewRoutes');
const newsRouter = require('./routes/newsRoutes');
const clubRouter = require('./routes/clubRoutes');
const footballerRouter = require('./routes/footballerRoutes');

const globalErrorHandler = require('./controllers/errorController');

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
app.use('/', viewRouter);
app.use('/api/v1/tickets', ticketRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stadia', stadiumRouter);
app.use('/api/v1/matches', matchRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/clubs', clubRouter);
app.use('/api/v1/footballers', footballerRouter);

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} in this server!`));
});

// Global handling middleware
app.use(globalErrorHandler);

module.exports = app;
