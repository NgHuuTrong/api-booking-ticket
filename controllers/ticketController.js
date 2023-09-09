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
  const {match_id, payer_name, payer_email, payer_phone, area, quantity} = req.body;

  if (!match_id || !payer_name || !payer_email || !payer_phone || !area || !quantity) {
    return next(new AppError('Lack of details!'))
  }
  const match = await db.matches.findByPk(match_id);
  if (match.happened) {
    return next(new AppError('This match has been happened!'));
  }
  if (!match.default_price) {
    return next(new AppError('The price is not released for this match!'))
  }
  if (match[`remain_seats_${area}`] < quantity) {
    return next(new AppError('This area has been full! Please choose another area!'))
  }

  const price = match.default_price * quantity;

  // 2) Create checkout session
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
      payer_info: {
        email: payer_email,
      },
    },
    redirect_urls: {
      // return_url: `${req.protocol}://${req.get('host')}/?tour=${
      //   req.params.tourId
      // }&user=${req.user.id}&price=${tour.price}&startDateId=${startDateId}`,
      // cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      return_url: `${req.protocol}://${req.get('host')}/pay/success/?user=${req.user.user_id}&price=${match.default_price}&quantity=${quantity}&match=${match_id}`,
      cancel_url: `${req.protocol}://${req.get('host')}/pay/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: match.round,
              sku: match.match_id,
              description: `This is a ticket of Champion League match, will happen in ${match.time}.`,
              price: match.default_price * 100,
              currency: 'USD',
              quantity: quantity,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: price * 100,
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
  const { PayerID, paymentId, price, match, user, quantity } = req.query;

  if (!PayerID || !paymentId || !price || !match || !user || !quantity)
    return next(new AppError('Invalid Payment', 404));

  const execute_payment_json = {
    payer_id: PayerID,
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
