const models = require('../../models');
require('dotenv').config();
const uuid = require('uuid');
async function createCharge(data,responsee) {
  const transactionId = data.trxId
  const userId = data.id;
  const https = require('https');
  const params = JSON.stringify({
    "email": data.email, 
    "amount": data.amount,
    "metadata": {
      "custom_fields": [
        {
          "value": data.value,
          "display_name": data.displayName,
          "variable_name":data.variableName,
        }
      ]
    },
    "bank": {
        "code": "057",
        "account_number":data.accountNumber 
    },
    "birthday": data.birthday
  })
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge',
    method: 'POST',
    headers: {
      Authorization: `Bearer sk_test_08877b9bd8242b276b2f0d65457cf1e204dc71e9`,
      'Content-Type': 'application/json'
    }
  }
  const req =  https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end',async () => {
      let response = JSON.parse(data)
      const updateResponse = await models.paystackVerification.create(
        {
          id:transactionId,
          userId:userId,
          status:response.status,
          reference:response.data.reference,
          message:response.message,
          requestedData:response.data.display_text
        }
      )
      console.log(response);
      return responsee.json(updateResponse);
    })
  }).on('error',async error => {
    // delay time
    let err = JSON.parse(error)
    const updateResponse = await models.paystackVerification.create(
      {
        id:transactionId,
        userId:data.id,
        status:err.status,
        message:err.message
      }
    )
    console.error(error)
    return responsee.json(updateResponse);
  })
  req.write(params)
  req.end()
  return transactionId
}
function submitPin(){
  const https = require('https');
  const params = JSON.stringify({
    "pin": "1234",
    "reference": "5bwib5v6anhe9xa"
  })
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge/submit_pin',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRECT}`,
      'Content-Type': 'application/json'
    }
  }
  const req = https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  req.write(params)
  req.end()
}

function submitOtp(){
  const https = require('https')
  const params = JSON.stringify({
    "otp": "123456",
    "reference": "5bwib5v6anhe9xa"
  })
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge/submit_otp',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRECT}`,
      'Content-Type': 'application/json'
    }
  }
  const req = https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  req.write(params)
  req.end()
}
async function submitPhone(data,responsee){
  const https = require('https')
  const params = JSON.stringify({
    "phone": data.phone,
    "reference": data.reference
  })
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge/submit_phone',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRECT}`,
      'Content-Type': 'application/json'
    }
  }
  const req = https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  req.write(params)
  req.end()
}
function submitBirthday(data,responsee){
  const https = require('https')
  const params = JSON.stringify({
    "birthday": "1961-09-21",
    "reference":data.reference
  })
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge/submit_birthday',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRECT}`,
      'Content-Type': 'application/json'
    }
  }
  const req = https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  req.write(params)
  req.end()
}

function submitAddress(data,responsee){
  const https = require('https')
  const params = JSON.stringify({
    "reference": data.reference,
    "address": "140 N 2ND ST",
    "city": "Stroudsburg",
    "state": "PA",
    "zip_code": "18360"
  })
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge/submit_address',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRECT}`,
      'Content-Type': 'application/json'
    }
  }
  const req = https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  req.write(params)
  req.end()
} 
async function checkPendingCharge(data,responsee){
  const https = require('https')
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/charge/${data.reference}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRECT}`,
    }
  }
  await https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end', () => {
      const response = JSON.parse(data)
      console.log(response)
      return response;
    })
  }).on('error', error => {
    console.error(error)
  })
}


module.exports = {
  createCharge,
  submitPin,
  submitPhone,
  submitOtp,
  submitBirthday,
  submitAddress,
  checkPendingCharge
}