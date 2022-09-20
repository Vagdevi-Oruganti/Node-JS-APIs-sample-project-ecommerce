import { Request, Response, NextFunction } from 'express';
import {connection} from '../dbconnect';

interface Post {
    Id:number;
    OderId:number;
    ProductId:number;
    UnitPrice:number;
    Quantity:number;

}

// get all order items
const getOrderItems = async (req: Request, res: Response, next: NextFunction) => {
   let result = await (await connection).query(`select * from [ecommerce].[dbo].[OrderItem]`);
   
   if(result[0]){
    return res.status(200).json({
        message: "success",
        result:result   
    });

   } 
   else{
       res.status(404).json({
           message:"user not found"
       })
   }
   
};

// get a single order item by id
const getOrderItem = async (req: Request, res: Response, next: NextFunction) => {
   
    let id: string = req.params.id;
    console.log(req.params.id);
  let result = await (await connection).query(`select * from [ecommerce].[dbo].[OrderItem] where Id=${id}`);

   if(result[0]){
    return res.status(200).json({
        message: "success",
        result:result   
    });

   } 
   else{
       res.status(404).json({
           message:"user not found"
       })
   }
   
};

// update an orderitem
const updateOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    
    let id:string=req.params.id;
    let result_id =await (await connection).query(`select top (1) * from [ecommerce].[dbo].[OrderItem] where Id=${id}`);

    let OrderId =req.body.OrderId ? req.body.OrderId : result_id[0].OrderId;
    let ProductId = req.body.ProductId ? req.body.ProductId : result_id[0].ProductId;
    let UnitPrice=req.body.UnitPrice ? req.body.UnitPrice : result_id[0].UnitPrice;
    let Quantity= req.body.Quantity ? req.body.Quantity :result_id[0].Quantity;

    let result = await (await connection).query(`UPDATE [ecommerce].[dbo].[OrderItem]
    SET OrderId=${OrderId},ProductId=${ProductId},UnitPrice=${UnitPrice},Quantity=${Quantity}
    WHERE id = ${id};
    `);
    
   
        return res.status(200).json({
            message: "order itemsuccessfully updated"
           
        }); 
};

// delete an orderitem
const deleteOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    
    let id: string = req.params.id;

    
    let result = await (await connection).query(`DELETE FROM [ecommerce].[dbo].[OrderItem] WHERE Id = ${id}`);
    return res.status(200).json({
        message: 'order item deleted successfully'
    });
};

// add an orderitem
const addOrderItem = async (req: Request, res: Response, next: NextFunction) => {

    
    let OrderId =req.body.OrderId ;
    let ProductId = req.body.ProductId;
    let UnitPrice=req.body.UnitPrice;
    let Quantity= req.body.Quantity;

   

    let result = await (await connection).query(`INSERT INTO [ecommerce].[dbo].[OrderItem] ([OrderId],[ProductId],[UnitPrice],[Quantity])VALUES(${OrderId},${ProductId},${UnitPrice},${Quantity})`);
   
  
    return res.status(200).json({
        message: "successfully inserted Order item data"
    });
};

export default {getOrderItems,getOrderItem,updateOrderItem,deleteOrderItem,addOrderItem };