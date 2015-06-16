var mongoose = require ('mongoose');

var orderSchema = new mongoose.Schema({
	blend: [{
		typeofblend: {type: mongoose.Schema.Types.ObjectId, ref: 'Blend'}, 
		name: String,
		quantity: Number
	}],
	status: {type: String, enum: ['created', 'processing', 'cancelled', 'completed'], required: true, default: 'created'}
});

var Order = mongoose.model('Order', orderSchema);
