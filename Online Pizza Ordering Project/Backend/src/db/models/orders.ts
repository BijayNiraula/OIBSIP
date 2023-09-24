import mongoose from "mongoose";

const OrderItemSchema= new mongoose.Schema({
    
    userId:{
        type:String,
        required:true
    },
    orderId:{
        type :String,
        required:true
    },
    orders:{
        type :String,
        required:true
    }
    ,
    paidAmt:{
        type:Number,
        required:true
    },
   deliveryLocation:{
    type:String,
    required:true
   },
   customerPhoneNumber:{
    type:String,
    required:true
   },
   orderStatus:{
    type:String,
    required:true
   },
   time:{
    type:Number,
    default:Date.now()
   }
   
})


const Orders=mongoose.model("Orders",OrderItemSchema)
export default Orders;