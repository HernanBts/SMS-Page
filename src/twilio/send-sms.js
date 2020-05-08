const config = require('../config');
const client = require ('twilio')(config.accountSid, config.authToken)

/**
 * send sms
 * @param {string} body - the sms content
 * @param {string} phone - phone number
*/

async function sendMessage(body, phone) {
    try {
        const message = await client.messages.create({
            to: phone,
            from: '+12058090181',
            body
        })
        // console.log(message);
        return message;
    } catch (error) {
        console.log(error);
    }

}

module.exports = {sendMessage}