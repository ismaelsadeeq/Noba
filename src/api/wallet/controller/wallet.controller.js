const uuid = require("uuid");
const axios = require('axios')
const paystackApi = require('../../../utilities/paystack.api');
const models = require('../../../../models')
const responseData = {
	status: true,
	message: "Completed",
	data: null
}

const getWalletNetBalance = async (req,res) =>{
  const user = req.user;
  const account = await models.wallet.findOne({
    where:
    {
      userId:user.id
    },
    attributes:["accountBalance"]  
  })
  if(account){
    responseData.status = true;
    responseData.message = "completed";
    responseData.data = account
    return res.json(responseData);
  }
  responseData.status = false;
  responseData.message = "something went wrong";
  responseData.data = null
  return res.json(responseData);
}

const getWalletWidthdrawableBalance = async (req,res)=>{
  const user = req.user;
  const account = await models.wallet.findOne({
    where:
    {
      userId:user.id
    },
    attributes:["widthrawableBalance"]  
  })
  if(account){
    responseData.status = true;
    responseData.message = "completed";
    responseData.data = account
    return res.json(responseData);
  }
  responseData.status = false;
  responseData.message = "something went wrong";
  responseData.data = null
}
const getTotalWidthdrawal = async (req,res)=> {
  const user = req.user;
  const account = await models.wallet.findOne({
    where:
    {
      userId:user.id
    },
    attributes:["totalWidthrawals"]  
  })
  if(account){
    responseData.status = true;
    responseData.message = "completed";
    responseData.data = account
    return res.json(responseData);
  }
  responseData.status = false;
  responseData.message = "something went wrong";
  responseData.data = null
}
const fundAccount = async (req,res)=>{
  const transactionId = uuid.v4();
  const user = req.user;
  const data = req.body;
  const bankDetails = await models.bankDetail.findOne(
    {
      where:{
        userId:user.id
      }
    }
  );
  const payload = {
    "trxId":transactionId,
    "email":user.email,
    "id":user.id,
    "amount":data.amount,
    "value":"Noba Africa",
    "displayName":user.firstName,
    "variableName":"virtual wallet funding",
    "bankCode":bankDetails.bankCode,
    "accountNumber":bankDetails.accountNumber,
    "birthday":user.birthday,
    "bankCode":bankDetails.bankCode
  }
  const response = await paystackApi.createCharge(payload,res)
}
const verifyPaymentWithPin = async (req,res)=>{
  const user = req.user;
  const data = req.body;
  const payload = {
    "pin":data.pin,
    "reference":data.reference
  }
  const response = await paystackApi.submitPin(payload,res)
}
const verifyPaymentWithOtp = async (req,res)=>{
  const user = req.user;
  
}
const verifyPaymentWithBirthday = async (req,res)=>{
  const user = req.user;
  
}
const verifyPaymentWithPhoneNumber = async (req,res)=>{
  const user = req.user;
  
}
const verifyPaymentWithAddress = async (req,res)=>{
  const user = req.user;
  
}

const checkChargeStatus = async (req,res)=>{

}


// const webhook = (req,res)=>{

// }
const widthrawFund = async ()=>{

}

module.exports = {
  getWalletNetBalance,
  getWalletWidthdrawableBalance,
  getTotalWidthdrawal,
  fundAccount,
  widthrawFund,
  verifyPayment,
  // webhook,
  validatePayment
}