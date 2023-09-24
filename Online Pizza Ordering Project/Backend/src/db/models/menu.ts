import mongoose from "mongoose";

const MenuItemSchema= new mongoose.Schema({
    pizzaName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})


const Menu=mongoose.model("Menu",MenuItemSchema)
export default Menu;