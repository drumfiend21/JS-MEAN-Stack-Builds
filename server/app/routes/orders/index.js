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
				console.log('this is user.orders', user.orders)
				
					var matched = user.orders.filter(function(order) {
						console.log('this is order in filter', order)
						console.log('this is req.params.orderid', req.params.orderid)
						return order._id == req.params.orderid
					})
					console.log('this is matched', matched)
				if (matched.length > 0) {
					res.json(matched);
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
	//console.log("in the route req.body is ", req.body._id.replace(/[\n\t\r]/g,""));
	if (req.user.admin){
		Order.findById(req.params.orderid)
		.exec()
		.then(function (order) {
			order.changeStatus(req.body._id.replace(/[\n\t\r]/g,""));
			order.save();
			// console.log(order);
		}, function(err){
			next(err);
		}).then(function(order){
			res.json(order);
		});

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
