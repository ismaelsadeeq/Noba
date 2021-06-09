const uuid = require("uuid");
const models = require('../../../../models'); 
const multer = require('multer');
const multerConfig = require('../../../config/multer');

const responseData = {
	status: true,
	message: "Completed",
	data: null
}
//Parnership Controllers

const partner = async (req,res)=>{
  
}
const getCurrentParnershipBalance = async (req,res)=>{

}
const getCurrentParnershipDetail = async (req,res)=>{

}
const getAllParnershipBalance = async (req,res)=>{

}
const getAllParnershipDetail = async (req,res)=>{

}
const expectedPayout = async (req,res)=>{

}
const commulativePayout = async (req,res)=>{

}



//Package Controllers
const createPackage = async (req,res)=>{
  multerConfig.multipleUpload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
        return res.json(err.message);
    } 
    if (err) {
      return res.json(err);
    } 
    if (req.body) {
      const user = req.user;
      const data = req.body;
      const isAdmin = await models.user.findOne(
        {
          where:{
            id:user.id,
            isAdmin:true
          }
        }
      )
      if(isAdmin){
        const commodityPackage = await models.commodityPackage.create(
          {
            id:uuid.v4(),
            name:data.name,
            info:data.info,
            price:data.price,
            duration:data.duration,
            profit:data.profit
          }
        );
        if(req.file || req.files){
          for(let i = 0;i <= (req.files.length-1); i++){
						await models.packagePicture.create(
							{										
								id:uuid.v4(),
								picture:req.files[i].path,
								packageId:commodityPackage.id
							}
						)
					}
          res.statusCode = 200;
          responseData.status = true;
          responseData.message = "package created";
          return res.json(responseData);
        }
        res.statusCode = 200;
        responseData.status = true;
        responseData.message = "package created without images";
        return res.json(responseData);
      }
      res.statusCode = 300;
      responseData.status = false;
      responseData.message = "unuthorize";
      return res.json(responseData)
    }
    res.statusCode = 200
    responseData.status = false;
    responseData.message = "empty post";
    return res.json(responseData)

  });
}

const editPackage = async (req,res)=>{
  multerConfig.multipleUpload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
        return res.json(err.message);
    } 
    if (err) {
      return res.json(err);
    } 
    if (req.body) {
      const user = req.user;
      const data = req.body;
      const id = req.params.id;
      const isAdmin = await models.user.findOne(
        {
          where:{
            id:user.id,
            isAdmin:true
          }
        }
      )
      if(isAdmin){
        const commodityPackage = await models.commodityPackage.update(
          {
            name:data.name,
            info:data.info,
            price:data.price,
            duration:data.duration,
            profit:data.profit
          },
          {
            where:{id:id}
          }
        );
        if(req.file || req.files){
          for(let i = 0;i <= (req.files.length-1); i++){
						await models.packagePicture.update(
							{										
								picture:req.files[i].path,        
							},
              {
                where:{
                  packageId:id
                }
              }
						)
					}
          res.statusCode = 200;
          responseData.status = true;
          responseData.message = "package updated";
          return res.json(responseData);
        }
        res.statusCode = 200;
        responseData.status = true;
        responseData.message = "package updated without images";
        return res.json(responseData);
      }
      res.statusCode = 300;
      responseData.status = false;
      responseData.message = "unuthorize";
      return res.json(responseData)
    }
    res.statusCode = 200
    responseData.status = false;
    responseData.message = "empty post";
    return res.json(responseData);
  });
}

const getPackages = async (req,res)=>{
  let pageLimit = parseInt(req.query.pageLimit);
  let currentPage = parseInt(req.query.currentPage);
  let	skip = currentPage * pageLimit
  const commodityPackages = await models.commodityPackage.findAll(
    {
      include:[{model:models.packagePicture}],
			order:[['createdAt','DESC']],
			offset:skip,
			limit:pageLimit
    }
  );
  if(commodityPackages){
    res.statusCode = 200
    responseData.status = true;
    responseData.message = "completed";
    responseData.data = commodityPackages
    return res.json(responseData);
  }
  res.statusCode = 200
  responseData.status = true;
  responseData.message = "something went wrong";
  return res.json(responseData);

}

const getAPackage = async (req,res)=>{
  const id = req.params.id;
  const commodityPackage = await models.commodityPackage.findOne(
    {
      include:[{model:models.packagePicture}],
      where:{id:id}
    }
  )
  if(commodityPackage){
    res.statusCode = 200
    responseData.status = true;
    responseData.message = "completed";
    responseData.data = commodityPackage
    return res.json(responseData);
  }
  res.statusCode = 200
  responseData.status = true;
  responseData.message = "something went wrong";
  return res.json(responseData);
}

const deletePackage = async (req,res)=>{
   const user = req.user;
   const id = req.params.id;
   const isAdmin = await models.user.findOne(
     {
       where:{
         id:user.id,
         isAdmin:true
       }
     }
   )
  if(isAdmin){
    const deletePackage = await models.commodityPackage.destroy(
      {
        where:{
          id:id
        }
      }
    );
    if(deletePackage){
      res.statusCode = 200
      responseData.status = true;
      responseData.message = "completed";
      responseData.data = null
      return res.json(responseData);
    }
    res.statusCode = 200
    responseData.status = true;
    responseData.message = "something went wrong";
    return res.json(responseData);
  }
  res.statusCode = 300
  responseData.status = false;
  responseData.message = "unauthorize";
  return res.json(responseData);
}

module.exports = {
  createPackage,
  editPackage,
  getPackages,
  getAPackage,
  deletePackage,
  //Parnership exports
  partner,
  getCurrentParnershipBalance,
  getCurrentParnershipDetail,
  getAllParnershipBalance,
  getAllParnershipDetail,
  expectedPayout,
  commulativePayout
}