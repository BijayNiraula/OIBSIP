export interface BaseInterface{
    pizzaName:string,
    price:number,
    type:string,
    size:string,
}


export interface MenuItemInterFace extends BaseInterface{
    _id:string,
    description:string,
    stock:number
    
}
















