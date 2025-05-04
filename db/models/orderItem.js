const mongoose = require('mongoose');
const objectId = mongoose.Schema.ObjectId;
const OrderItemSchema = new mongoose.Schema({
    product: {
        type: objectId,
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }

})

module.exports = OrderItemSchema