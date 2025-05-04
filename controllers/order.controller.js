const Product = require('../db/models/product');
const Order = require("../db/models/order")

const createOrder = async (req, res) => {

    const { itemList, address, paymentMethod } = req.body;
    let userId = req.userId;
    console.log("userId", req.userId);

    try {
        const itemIds = itemList.map(product => product.productId);
        const products = await Product.find({
            _id: {
                $in: itemIds
            }
        });

        const orderDetailsList = itemList.map((product) => {
            const productDetails = products.find(p => p._id.toString() == product.productId)
            if (!productDetails) {
                throw new Error("Product not found");
            }
            return {
                product: productDetails._id,
                price: productDetails.price,
                quantity: product.quantity,
            }
        });

        const totalAmount = orderDetailsList.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const order = new Order({
            user: userId,
            orderItem: orderDetailsList,
            address: address,
            paymentMethod: paymentMethod,
            totalAmount: totalAmount
        })

        const createOrder = await order.save();
        res.status(201).json({
            message: "Order created successfully",
            order: createOrder
        })
    }
    catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Error creating order",
            error: err.message
        })
    }
}

const getAllOrder = async(req, res) => {
    try{
        const allOrder = await Order.find({});
        return res.status(200).json({
            message: "All orders fetched successfully",
            orders: allOrder
        })
    }catch(err) {
        console.log("Error", err);
        res.status(500).json({
            message: "Error fetching orders",
            error: err.message
        })
    }
}

const getAllUserOrder = async(req, res) => {
    try{
        const userId = req.userId;
        const allOrders = await Order.find({
            user: userId
        })
        return res.status(200).json({
            message: "All orders fetched successfully",
            orders: allOrders
        })
    }
    catch(err){
        console.log("Error", err);
        res.status(500).json({
            message: "Error fetching user's orders",
            error: err.message
        })
    }
}
const updateOrder = async (req, res) => {
    const {status,paymentStatus} =req.body;
    const orderId = req.params.id
    try{
        const order = await Order.findById(orderId);
        if(!order && Object.keys(order).length === 0){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        const orderValues = {};
        if(status){
            orderValues.status = status;
        }
        if(paymentStatus){
            orderValues.paymentStatus = paymentStatus;
        }
        await Order.updateOne({
            _id: orderId
        }, orderValues);
        return res.status(200).json({
            message: "Order updated successfully",
        });
    }catch(error){
        console.log("Error", error);
        res.status(500).json({
            message: "Error updating order",
            error: error.message
        })
    }
}

const deleteOrder = async (req, res) => {
    const orderId= req.params.id;
    try{
        await Order.deleteOne({_id: orderId})
        return res.status(200).json({
            message: "Order deleted successfully"
        })
    }
    catch(err){
        console.log("Error", err);
        res.status(500).json({
            message: "Error deleting order",
            error: err.message
        })
    }
}

const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try{
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
      if (order.user.toString() != req.userId &&
        req.user.type != 1) {
        return res.status(403).json({ message: 'Not authorized to access this order' });
    }

    res.status(200).json({
        message: 'Order fetched successfully',
        order: order
    })
    }catch(err){
        console.log("Error", err);
        res.status(500).json({
            message: "Error fetching order",
            error: err.message
        })
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    getAllUserOrder,
    updateOrder,
    deleteOrder,
    getOrderById
}