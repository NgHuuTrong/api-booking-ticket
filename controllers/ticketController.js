const paypal = require('paypal-rest-sdk');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const db = require('../utils/database');
const factory = require('./handleFactory');

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get Currently booked tour
  // const match = await Match.findById(req.params.match_id);

  // 2) Create checkout session
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
      payer_info: {
        // email: req.user.email,
        email: 'trongnh2003@gmail.com',
      },
    },
    redirect_urls: {
      // return_url: `${req.protocol}://${req.get('host')}/?tour=${
      //   req.params.tourId
      // }&user=${req.user.id}&price=${tour.price}&startDateId=${startDateId}`,
      // cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      return_url: `${req.protocol}://${req.get('host')}/pay/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/pay/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: `Champion League`,
              sku: '001',
              description: 'Summary',
              price: `100.00`,
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: `100.00`,
        },
        description: `Payment for booking Champion League ticket!`,
      },
    ],
  };

  paypal.payment.create(
    JSON.stringify(create_payment_json),
    function (error, payment) {
      if (error) {
        return new AppError(err.message);
      }
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    },
  );
});

exports.executeCheckout = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  console.log('payerId', payerId, 'paymentId', paymentId);
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '100.00',
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        return next(new AppError(err.message));
      } else {
        // res.render('success')
        res.render('success');
      }
    },
  );
};

exports.getALlTicket = factory.getAll(db.tickets);

exports.getTicket = factory.getOne(db.tickets, {
  model: db.matches,
  as: 'match',
  foreignKey: 'match_id',
});

exports.createTicket = factory.createOne(db.tickets);

exports.updateTicket = factory.updateOne(db.tickets);

exports.deleteTicket = factory.deleteOne(db.tickets);
