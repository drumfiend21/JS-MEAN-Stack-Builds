var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Blend = mongoose.model('Blend');

module.exports = router;

function isAuthenticatedUser (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(401);
	}
}

// get all Blend
router.get('/', function (req, res, next){
	Blend.find({}).populate('micros').exec()
	.then(
		function (blends){
			res.json(blends);
		}, 
		function (err){
			next(err);
		}
	);

	Promise.all([
 ger.action('view', 1),
 ger.action('buy', 10),

 ger.event('p1','view',"Joe's Mega Blend"), 
 ger.event('p2','view',"Joe's Mega Blend"),
 ger.event('p2','buy',"Joe's Mega Blend")
])
.then(function() {
 //What p1 should buy
 return ger.recommendations_for_person('p1', 'buy') 
})
.then(function(recommendations) {
  console.log(recommendations);
})
});

//get blend with blendid 
router.get('/:blendid', function (req, res, next){
	Blend.findById(req.params.blendid).populate('micros').exec()
	.then(
		function (blend){
			res.json(blend);
		},
		function (err){
			next(err);
		}
	);
});

//get blend with blendname
router.get('/name/:blendname', function (req, res, next){
	Blend.findOne({name: req.params.blendname}).populate('micros').exec()
	.then(
		function (blend){
			res.json(blend);
		},
		function (err){
			next(err);
		}
	);
});

// creates new blend and returns new blend

router.post('/', isAuthenticatedUser, function (req, res, next){

	var blend = new Blend(req.body);
	blend.save(function (err){
		res.status(200).send(blend);
	});
});


router.put('/:blendid', isAuthenticatedUser, function (req, res, next){

	if (req.user.admin) {
		Blend.findByIdAndUpdate(req.params.blendid, req.body).exec()
		.then(
			function (blend){
				res.status(200).send(blend);
			},
			function (err){
				next(err);
			}
		);
	}
});

// delete this blend

router.delete('/:blendid', isAuthenticatedUser, function (req, res, next){
	Blend.findByIdAndRemove(req.params.blendid).exec()
	.then(
		function (){
			res.status(204).send();
		},
		function (err){
			next(err);
		}
	);
});