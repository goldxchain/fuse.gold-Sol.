let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

const {sellOrders, buyOrders} = require('./order');

router.route('/').get((req, res, next) => {
  buyOrders.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});

router.route('/get-sell-orders').get((req, res, next) => {
  sellOrders.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});

router.route('/create-order').post((req, res, next) => {
  buyOrders.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

router.route('/create-sell-order').post((req, res, next) => {
  sellOrders.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

router.route('/check-order').get((req, res, next) => {
  buyOrders.find({user: req.query.address}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


router.route('/update-order/:id&:txhash').post((req, res, next) => {
  buyOrders.findByIdAndUpdate(req.params.id, {
    status: "Approved", tx: req.params.txhash
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Todo updated')
    }
  })
});

router.route('/update-sell-order/:id&:txhash').post((req, res, next) => {
  sellOrders.findByIdAndUpdate(req.params.id, {
    status: "Burned", tx: req.params.txhash
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Todo updated')
    }
  })
});

router.route('/delete-order/:id').delete((req, res, next) => {
  buyOrders.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

module.exports = router;