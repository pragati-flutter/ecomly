const { Order } = require("../../models/order");
const { OrderItem } = require("../../models/order_item");
const { Product } = require("../../models/product");
exports.getOrders = async function (req, res) {
  try {
    const orders = await Order.find()
      .select('-statusHistory')
      .populate('user', 'name email')
      .sort({ dateOrdered: -1 })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          select: 'name',
          populate:{
            path: 'category',
            select: 'name',
          }
        },
      });

    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.type, message: error.message });
  }
};

exports.getOrderCount = async function (req, res) {
  try {
    const count = await Order.countDocuments();
    if(!count){
        return res.status(500).json({type:error.type,message:error.message});
    }
    return json({
        count
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.type, message: error.message });
  }
};
exports.changeOrderStatus = async function (req, res) {
    try{
     const orderId = req.params.id;
     const newStatus = req.body.status;
     const order = await Order.findById(orderId);

     if(!order){
        return res.status(400).json({message:'order not found'});
     }
     if(!order.statusHistory.includes(order.status)){
        order.statusHistory.push(order.status);
     }
     order.status = newStatus;
     order = await order.save();
     return res.json(order);
    }catch(error){
      return res.status(500).json({type: error.type,message:error.message});
    }
};

exports.deleteOrder = async function(req,res) {
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order){
            return res.status(404).json({type:'order not found'});
        
        }
        for(const orderItemId of order.orderItems){
          await OrderItem.findByIdAndDelete(orderItemId);
        }
        return res.status(204).end();
    }catch(error){
     return res.status(500).json({type:error.type,message:error.message});
    }
    
}
