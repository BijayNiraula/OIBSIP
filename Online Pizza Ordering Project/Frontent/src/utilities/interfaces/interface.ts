import { statuses } from "../enums/statusEnum"
import { userRoles } from "../enums/userRoleEnum"


export interface BaseInterface{
    pizzaName:string,
    price:number,
    type:string,
    size:string,
}

export interface EditMenuItemFunctionParameterInterface extends BaseInterface{
    stock:number,
    description:string,
    _id:string
}

export interface AddMenuItemFunctionParameterInterface extends BaseInterface {
    stock:number,
    description:string
}


export interface MenuItemInterFace extends BaseInterface{
    _id:string,
    description:string,
    stock:number
    
}

export interface MenuItemsStateInterface{
    status:statuses.LOADING|statuses.ERROR|statuses.IDLE
    menuItems:MenuItemInterFace[]|[]
}


export interface CartItemInterface extends BaseInterface{
    _id:string,
    pizzaQuantity:number
}

export interface CartStateInterface{
    cartItems:CartItemInterface[]|[]
}

export interface OrderItemInterface {
    orders:string,
    orderId:string,
    paidAmt:number,
    orderStatus:string,
    _id:string,
    customerPhoneNumber:string,
    deliveryLocation:string,
    time:number,
    userId:string
}

export interface OrderItemsStateInterface {
    status:statuses.LOADING|statuses.ERROR|statuses.IDLE
    orderItems:OrderItemInterface[]|[]
}

export interface AuthDataInterface{
    userId:string,
    name:string,
    img:string,
    email:string,
    userRole:userRoles.ADMIN|userRoles.USER|userRoles.NONE
}

export interface AuthStateInterface{
   data:AuthDataInterface ,
   authenticated:boolean,
   status:string
}

export interface ControlEditMenuModalStateInterface{
    modalState:boolean,
    data:MenuItemInterFace
}





export interface GlobalStateInterface{
    carts:CartStateInterface,
    auth:AuthStateInterface,
    menu:MenuItemsStateInterface,
    controlEditMenuModal:ControlEditMenuModalStateInterface,
    orders:OrderItemsStateInterface

}





