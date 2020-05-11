const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {sendMessage} = require('../twilio/send-sms');
const SMS = require('../models/sms');

const {getSocket} = require('../sockets');

const indexController = async (req, res) => {
    const messages = await SMS.find().sort('-createdAt').lean();
    res.render('index', {messages});
}

const postMessage = async (req, res) => {
    const {message, phone} = req.body;
    if (!message || !phone) return res.json('Missing message or phone');

    const response = await sendMessage(req.body.message, req.body.phone);
    console.log(response.sid);

    await SMS.create({Body: req.body.message, To: req.body.phone});

    res.redirect('/');
    // res.send('received');
}

const receiveMessage = async(req, res) => {
    console.log(req.body);

    const saveSMS = await SMS.create({ 
        Body: req.body.Body,
        From: req.body.From
    })

    getSocket().emit('new message', saveSMS);
    const twiml = new MessagingResponse();
    // twiml.message("This is my response");

    res.send(twiml.toString());
}

module.exports = {
    indexController,
    postMessage,
    receiveMessage
}