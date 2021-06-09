
require('dotenv').config();
const mailjet = require('node-mailjet').connect(process.env.MAILJET_PUBLIC, process.env.MAILJET_PRIVATE);

async function sendMail(to, variables, subject = "Notification from nobaAfrica") {
    let message = variables.body;
    let names = variables.names
    let code = variables.code
    let html = variables.htmlPart
    const mailjet = require ('node-mailjet').connect(process.env.MAILJET_PUBLIC, process.env.MAILJET_PRIVATE)
const request = mailjet.post("send", {'version': 'v3.1'}).request({
		"Messages":[
			{
		    "From": {
			   "Email": "ask4ismailsadiq@gmail.com",
				"Name": "NobaAfricasupport"
			},
			"To": [
				{
				 "Email": to,
				"Name": names
			}
			],
			"Subject": subject,
			"TextPart": message,
			"HTMLPart": html
			}
		]
	})
      request
        .then(result => {
          console.log(result.body)
        })
        .catch(err => {
          console.log(err)
        })
    // const request = mailjet
    //     .post("send", { 'version': 'v3.1' })
    //     .request({
    //         "Messages": [{
    //             "From": {
    //                 // "Email": process.env.MAIL_SENDER,
    //                 // "Name": process.env.MAIL_SENDER_NAME
    //                 "Email": 'ask4ismailsadiq@gmail.com',
    //                 "Name": 'NobaAfricasupport',
    //             },
    //             "To": [{
    //                 "Email": to,
    //                 "Name": names
    //             }],
    //             // Template: 2454666,
    //             // TemplateLanguage: true,
    //             // Subject: 'Welcome on board',
    //             "Subject": subject,
    //             "TextPart": code ||" ",
    //             "HTMLPart": message
    //         }
    //         ]
    //     })
    // request
    //     .then((result) => {
    //         console.log(result.body, "variables:", variables)
    //     })
    //     .catch((err) => {
    //         console.log(err, "token send failure")
    //     })

}
module.exports = {
    sendMail
}