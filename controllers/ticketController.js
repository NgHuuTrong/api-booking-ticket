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
  const { match_id, payer_name, payer_email, payer_phone, area, quantity } =
    req.params;
  const match = await db.matches.findByPk(match_id);
  if (match.happened) {
    return next(new AppError('This match has been happened!'));
  }
  if (!match.default_price) {
    return next(new AppError('The price is not released for this match!'));
  }
  if (quantity < 1) {
    return next(new AppError('Quantity must higher than 1!'));
  }
  if (match[`remain_seats_${area}`] < quantity) {
    return next(
      new AppError('This area has been full! Please choose another area!'),
    );
  }

  const price = match.default_price * quantity;

  // 2) Create checkout session
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
      payer_info: {
        email: 'test@personal.natours.io',
      },
    },
    redirect_urls: {
      return_url: `${req.protocol}://${req.get('host')}/pay/execute/?user=${
        req.user.user_id
      }&match=${match_id}`,

      // return_url: `${req.protocol}://${req.get('host')}/pay/success`,

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
              price: match.default_price,
              currency: 'USD',
              quantity: quantity,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: price,
        },
        description: `${payer_name}%-%${payer_email}%-%${payer_phone}%-%${quantity}%-%${area}%-%${match.default_price}`,
      },
    ],
  };

  paypal.payment.create(
    JSON.stringify(create_payment_json),
    function (error, payment) {
      if (error) {
        return new AppError(error.response.details);
      }
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    },
  );
});

exports.executeCheckout = catchAsync(async (req, res, next) => {
  const { PayerID, paymentId, match, user } = req.query;

  if (!PayerID || !paymentId || !match || !user)
    return next(new AppError('Invalid Payment', 404));

  const execute_payment_json = {
    payer_id: PayerID,
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        return next(new AppError(error.message));
      } else {
        const [payerName, payerEmail, payerPhone, quantity, area, price] =
          payment.transactions[0].description.split('%-%');
        for (let i = 0; i < Number(quantity); i++) {
          await db.tickets.create({
            user_id: Number(user),
            match_id: Number(match),
            area,
            payer_email: payerEmail,
            payer_name: payerName,
            payer_phone: payerPhone,
            payment_id: paymentId,
            price: Number(price),
          });
        }
        res.redirect(`${req.protocol}://${req.get('host')}/pay/success`);
      }
    },
  );
});

exports.getPaySuccess = (req, res) => {
  res.render('success');
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
