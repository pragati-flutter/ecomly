const {Order} = require("../../models/order");
exports.getOrders = async function(req,res){
    try{
        const orders = await Order.find().select('-statusHistory').populate('user','-cart').sort({dateOrdered: -1});

        if(!orders){

            return res.status(404).json({message:"Order not found"});
        }
  return res.json(orders);

    }catch(error){
        console.error(error);
        return res.status(500).json({type: error.type,message: error.message});

    }
}

exports.getOrderCount = async function(req,res){
    try{}catch(error){
        console.error(error);
        return res.status(500).json({type:error.type,message:error.message});
    }
}
exports.changeOrderStatus = async function(req,res){

}