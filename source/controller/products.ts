import {Request,Response,NextFunction} from 'express'
import {connection} from '../dbconnect'

interface product{
    Id:number;
    ProductName:string;
    SupplierId:number;
    UnitPrice:number;
    Package:string;
    IsDiscontinued:string;
}

// get all prodcuts
const getProducts = async(req:Request,res:Response,next:NextFunction)=>{
    let result:any[] = await (await connection ).query(`select * from [ecommerce].[dbo].[Product]`);
 
    if(result.length){
        return res.status(200).json({
            message:"success",
            result:result
        })
    }
    else{
        return res.status(404).json({
            message:"no products to display"
        })
    }

}

// get single product by id
const getProduct= async(req:Request,res:Response,next:NextFunction)=>{

    let id = req.params.id;

        let result:any[] = await(await connection).query(`select * from [ecommerce].[dbo].[Product] where Id=${id}`);

        if(result.length){
            return res.status(200).json({
                message:"success",
                result:result
            })
        }
        else{
            return res.status(404).json({
                message:"No Product found with id"
            })
        }


}

//update product by id

const updateProduct = async(req:Request,res:Response,next:NextFunction)=>{

    let id = req.params.id;

    let result:any[] = await(await connection).query(`select top (1) * from [ecommerce].[dbo].[Product] where id=${id}`);


    if(result.length){

        let ProductName =req.body.ProductName?req.body.ProductName:result[0].ProductName;
        let SupplierId = req.body.SupplierId?req.body.SupplierId:result[0].SupplierId;

        let UnitPrice = req.body.UnitPrice?req.body.UnitPrice:result[0].UnitPrice;

        let Package = req.body.Package?req.body.Package:result[0].Package;

        let IsDiscontinued= req.body.IsDiscontinued?req.body.IsDiscontinued:result[0].IsDiscontinued;

        let query_response = await(await connection).query(`update [ecommerce].[dbo].[Product] set ProductName='${ProductName}',SupplierId=${SupplierId},UnitPrice=${UnitPrice},Package='${Package}',IsDiscontinued='${IsDiscontinued}'`);
        let updated_data = await(await connection).query(`select * from [ecommerce].[dbo].[Product] where id=${id}`);
        return res.status(200).json({
            message:"success fully updated data",
            updated_data:updated_data
        })

    }
     else{
         return res.status(404).json({
             message:"no Product found with given id"
         })
     }
}

//delete a product

const deleteProduct = async(req:Request,res:Response,next:NextFunction)=>{
    let id = req.params.id;

    let result = await(await connection).query(`delete from [ecommerce].[dbo].[Product] where Id=${id}`);

    return res.send(200).json({
        message:"succcessfully deleted Product"
    });
}

//add a new product

const addProduct = async(req:Request,res:Response,next:NextFunction)=>{
    let ProductName = req.body.ProductName
    let SupplierId = req.body.SupplierId;
    let UnitPrice = req.body.UnitPrice;
    let Package=req.body.Package;
    let IsDiscontinued = req.body.IsDiscontinued;

    let result = await(await connection).query(`insert into [ecommerce].[dbo].[Product] ([ProductName],[SupplierId],[UnitPrice],[Package],[IsDiscontinued])Values('${ProductName}',${SupplierId},${UnitPrice},'${Package}',${IsDiscontinued})`);

    return res.status(200).json({
        message:"Product data  added successfully"
    })
    }

    export default{getProducts,getProduct,updateProduct,deleteProduct,addProduct};