import { Request, Response, NextFunction } from 'express';
import {connection} from '../dbconnect';

interface Post {
    Id: Number;
    FirstName: string;
    LastName: String;
    City:string;
    Country: String;
    Phone:string;
    OrderDate:string;
    OrderNumber:number;
    CustomerId:Number;
    TotalAmount:number;

}


// get all orders
const getorders = async (req: Request, res: Response, next: NextFunction) => {
   let result = await (await connection).query(`select * from [ecommerce].[dbo].[Order]`);
   
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

// get a single order by id
const getOrder = async (req: Request, res: Response, next: NextFunction) => {
   
    let id: string = req.params.id;
    console.log(req.params.id);
  let result = await (await connection).query(`select * from [ecommerce].[dbo].[Order] where Id=${id}`);

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

// update an order
const updateOder = async (req: Request, res: Response, next: NextFunction) => {
    
    let id:string=req.params.id;
    let result_id =await (await connection).query(`select top (1) * from [ecommerce].[dbo].[Order] where Id=${id}`);

    let OrderDate =req.body.OrderDate ? convert(req.body.OrderDate) :convert( result_id[0].OrderDate);
    let OrderNumber = req.body.OrderNumber ? req.body.OrderNumber : result_id[0].OrderNumber;
    let CustomerId=req.body.CustomerId ? req.body.CustomerId : result_id[0].CustomerId;
    let TotalAmount= req.body.TotalAmount ? req.body.TotalAmount :result_id[0].TotalAmount;

    let result = await (await connection).query(`UPDATE [ecommerce].[dbo].[Order]
    SET OrderDate='${OrderDate}',OrderNumber='${OrderNumber}',CustomerId=${CustomerId},TotalAmount=${TotalAmount}
    WHERE id = ${id};
    `);
    
    let updated_order = await (await connection).query(`select * from [ecommerce].[dbo].[Order] where OrderDate='${OrderDate}'and OrderNumber='${OrderNumber}'and CustomerId=${CustomerId} and TotalAmount=${TotalAmount}`)
   
        return res.status(200).json({

            orderId :updated_order[0].Id,
            message: "successfully updated"
           
        });

    
   
   
};
function convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  

// delete an order
const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    
    let id: string = req.params.id;

    
    let result = await (await connection).query(`DELETE FROM [ecommerce].[dbo].[Order] WHERE Id = ${id}`);
    return res.status(200).json({
        message: 'order deleted successfully'
    });
};

// add an order
const addOrder = async (req: Request, res: Response, next: NextFunction) => {

    
    let OrderDate =req.body.OrderDate?convert(req.body.OrderDate):convert(new Date());
    let OrderNumber = req.body.OrderId ;
    let CustomerId=req.body.CustomerId ;
    let TotalAmount= req.body.TotalAmount;
   

    let result = await (await connection).query(`INSERT INTO [ecommerce].[dbo].[Order] ([OrderDate],[OrderNumber],[CustomerId],[TotalAmount])VALUES('${OrderDate}','${OrderNumber}',${CustomerId},${TotalAmount})`);
   
  let addedOrder = await(await connection).query(`select * from [ecommerce].[dbo].[Order] where OrderDate='${OrderDate}' and OrderNumber='${OrderNumber}' and CustomerId=${CustomerId} and TotalAmount = ${TotalAmount}`)
    return res.status(200).json({
        OrderId : addedOrder[0].Id,
        message: "successfully inserted Order data"
    });
};

export default { getOrder,getorders,updateOder,deleteOrder,addOrder };