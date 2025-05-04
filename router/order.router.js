const express = require('express');
const {check } = require('express-validator')
const {createOrder, getAllOrder, getAllUserOrder, updateOrder, deleteOrder, getOrderById} = require('../controllers/order.controller')
const orderRouter = express.Router();

orderRouter.post("/create", [
    check("itemList").notEmpty(),
    check("address").notEmpty(),
    check("paymentMethod").notEmpty()], createOrder)

orderRouter.get("/",getAllOrder);

orderRouter.get("/user/orders", getAllUserOrder);

orderRouter.get('/:id',getOrderById);

orderRouter.patch("/:id",updateOrder);

orderRouter.delete("/:id",deleteOrder);


module.exports = orderRouter;