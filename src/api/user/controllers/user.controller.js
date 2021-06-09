const uuid = require("uuid");
const models = require("../../../../models/index"); 
const helpers = require("../../../utilities/helpers");
const multer = require('multer')
const multerConfig = require('../../../config/multer');
const bankData = require('../../../utilities/banks')
require("dotenv").config();

const responseData = {
	status: true,
	message: "Completed",
	data: null
}
const generateReferral= async (req,res)=>{
  const user = req.user;
  const code = helpers.generateOTP()
  const referral = await models.user.update(
    {
      referralCode:code
    },
    {
      where:{id:user.id}
    }
  );
  if(referral){
    responseData.message = "code generated succesfully";
    return res.json(responseData);
  }
  responseData.status= false;
  responseData.message = "something went wrong";
  return res.json(responseData);
}

const suspendAccount = async (req,res) =>{
  const id = req.params.id
  const user = req.user;
  if(user.id == id || user.isAdmin ==true){
     await models.user.update(
      {
        isSuspended:true
      },
      {
        where:{id:id}
      }
    );
    responseData.message = "Account Deleted"
    return res.json(responseData)
  }
  res.statusCode = 401;
  responseData.status = false
  responseData.message = "unauthorize"
  return res.json(responseData)
}

const updateUser = async (req,res)=>{
  multerConfig.singleUpload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
        return res.json(err.message);
    } 
    if (err) {
      return res.json(err);
    } 
    if (req.body) {
      const data = req.body
      await models.user.update(
        {
          firstName:data.firstname,
          lastName:data.lastname,
          email:data.email,
          phoneNumber:data.phoneNumber,
          workingPlace:data.workingPlace,
          state:data.state,
          birthday:data.birthday
        },
        {
          where:{id:req.user.id}
        }
      )
      if(req.file){
        await models.user.update(
          {
            profilePicture:req.file.path
          }, 
          {
            where:{id:req.user.id}
          }
        );
      }
      res.statusCode = 200
      responseData.status = true;
      responseData.message = "user updated";
      return res.json(responseData)
    }
    res.statusCode = 200
    responseData.status = false;
    responseData.message = "empty post";
    return res.json(responseData)

  });
}
const updateBankDetails = async (req,res)=>{
  multerConfig.singleUpload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
        return res.json(err.message);
    } 
    if (err) {
      return res.json(err);
    } 
    if (req.body) {
      let bank = bankData.banks
      const data = req.body
      const isBankDetail = await models.bankDetail.findOne(
        {
          where:{userId:req.user.id}
        }
      )
      let code ;
      bank.forEach(element => {
        if(element.name ===data.bankName){
          code = element.code; 
        }
      });
      if(!isBankDetail){
        const bank = await models.bankDetail.create(
          {
            id:uuid.v4(),
            userId:req.user.id,
            idType:data.idType,
            idNo:data.idNo,
            bankName:data.bankName,
            accountNumber:data.accountNumber,
            bankCode:code
          }
        )
        req.file?await models.bankDetail.update(
          {
            idPicture:req.file.path
          },{
            where:{id:bank.id}
          }
        ):null
        res.statusCode = 200
        responseData.status = true;
        responseData.message = "Bank detail updated";
        return res.json(responseData)
      }
      await models.bankDetail.update(
        {
          idType:data.idType,
          idNo:data.idNo,
          bankName:data.bankName,
          accountNumber:data.accountNumber,
          bankCode:code
        },
        {
          where:{userId:req.user.id}
        }
      )
      req.file?
        await models.bankDetail.update(
          {
            idPicture:req.file.path
          }, 
          {
            where:{id:req.user.id}
          }
        ):
        null
  
      res.statusCode = 200
      responseData.status = true;
      responseData.message = "Bank detail updated";
      return res.json(responseData)
    }
    res.statusCode = 200
    responseData.status = false;
    responseData.message = "empty post";
    return res.json(responseData)

  });
}
const getUser = async (req,res)=>{
  const user = req.user;
  const data = await models.user.findOne(
    {
      where:{id:user.id}
    }
  );
  if(data){
    responseData.data = data;
    responseData.status = true;
    responseData.message = "succesful"
    return res.json(responseData)
  }
  responseData.data = null;
  responseData.status = false;
  responseData.message = "something went wrong"
  return res.json(responseData)
}
async function getAllUsers(req,res){
	const user = req.user;
	const isAdmin = await models.user.findOne(
		{
			where:{
        id:user.id,
        isAdmin:true
      }
		}
	)
	if(isAdmin){
		const currentPage = parseInt(req.query.currentPage);
    const pageLimit = parseInt(req.query.pageLimit);

		const skip = currentPage * pageLimit;
		const usersCount = await models.user.count();
		const users = await models.user.findAll(
			{
				order:[['createdAt','DESC']],
        attributes:["id","firstName","lastName","profilePicture","birthday","email","phoneNumber","workingPlace","state","terms","isVerified","isAdmin","permission","referralCode","isSuspended"],
        offset:skip,
        limit:pageLimit
			}
		)
		res.statusCode = 200
		res.json({"users":users,"count":usersCount})
	}else{
		res.statusCode = 401;
		res.json('unauthorize')
	}
}

const getAdmins = async (req,res)=>{
  const user = req.user;
	const isAdmin = await models.user.findOne(
		{
			where:{
        id:user.id,
        isAdmin:true
      }
		}
	)
	if(isAdmin){
		const currentPage = parseInt(req.query.currentPage);
    const pageLimit = parseInt(req.query.pageLimit);

		const skip = currentPage * pageLimit;
		const admins = await models.user.findAll(
			{
				order:[['createdAt','DESC']],
        attributes:["id","firstName","lastName","profilePicture","birthday","email","phoneNumber","workingPlace","state","terms","isVerified","isAdmin","permission","referralCode","isSuspended"],
        offset:skip,
        limit:pageLimit
			},
      {
        where:{isAdmin:true}
      }
		);
		res.statusCode = 200
		res.json({"admins":admins})
	}else{
		res.statusCode = 401;
		res.json('unauthorize')
	}
}
module.exports = {
  generateReferral,
  suspendAccount,
  updateUser,
  getUser,
  updateBankDetails,
  getAllUsers,
  getAdmins
}
