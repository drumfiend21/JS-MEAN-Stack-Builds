var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var _ = require('lodash');

module.exports = router;

function hasAdminPower(req, res, next){
	if(req.user.admin) next();	
	else res.status(403).end();
}

function isAuthenticatedUser (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(401);
	}
}

// get all Orders
router.get('/', isAuthenticatedUser, function (req, res, next){
	if (req.user.admin) {
		Order.find({}).exec()
		.then(
			function (orders){
				res.json(orders);
			}, 
			function (err){
				next(err);
			}
		);
	} else {
		console.log("only this user's orders");
		User.findById(req.user._id)
		.populate('orders')
		.exec()
		.then(
			function (user){
				console.log('user', user);
				res.json(user.orders);
			},
			function (err){
				next(err);
			}
		);
	}
});


//get order with orderid 
router.get('/:orderid', isAuthenticatedUser, function (req, res, next){

	if (req.user.admin) {
		Order.findById(req.params.orderid).exec()
		.then(
			function (order){
				res.json(order);
			},
			function (err){
				next(err);
			}
		);
	} else {
		User.findById(req.user._id)
		.populate('orders')
		.exec()
		.then(
			function (user){
				if (_.includes(user.orders, req.params.orderid)) {
					var theOrder = _.find(user.orders, {_id: req.params.orderid});
					res.json(theOrder);
				} else {
					res.sendStatus(403).end();
				}
			},
			function (err){
				next(err);
			}
		);
	}
});

// creates new order and returns new order
router.post('/', isAuthenticatedUser, function (req, res, next){
	var order = new Order(req.body);
	order.save(function(err){
		res.status(200).send(order);
	});
}); 

//edits this order
router.put('/:orderid', isAuthenticatedUser, function (req, res, next){
	if (req.user.admin){
		Order.findById(req.params.orderid)
		.exec()
		.then(function (order) {
			order.changeStatus(req.body.orderstatus);
			order.save();
			res.json(order);
			// console.log(order);
		}, function(err){
			next(err);
		});

	} else {
		User.findById(req.user._id)
		.populate('orders')
		.exec()
		.then(
			function (user){
				if (_.includes(user.orders, req.params.orderid)) {
					var theOrder = _.find(user.orders, {_id: req.params.orderid});
					theOrder.cancelOrder();
					theOrder.save();
					res.json(theOrder);
				} else {
					res.sendStatus(403).end();
				}
			},
			function (err){
				next(err);
			}
		);
	}
});

// delete this order
router.delete('/:orderid', isAuthenticatedUser, function (req, res, next){
	if (req.user.admin){
		Order.findByIdAndRemove(req.params.orderid).exec()
		.then(
			function (){
				res.status(204).send();
			},
			function (err){
				next(err);
			}
		);
	}
});
