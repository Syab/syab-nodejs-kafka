const axios = require('axios');
const kafKaService = require('../services/kafkaService')
const {
    SLACKURL
} = require('../services/config')

const sendVoucherSlack = (msgBody) => {
    console.log("Entered Slack")
    const formatData = {
        text : msgBody,
        blocks:[
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: msgBody
                }
            },
            {
                type: "image",
                title: {
                    "type": "plain_text",
                    "text": "Please enjoy this Voucher"
                },
                block_id: "image4",
                image_url: "http://sg.syioknya.com/custom/picture/1756/syioknya1_6097af4c2d07c.jpg",
                alt_text: "LIHO VOUCHER FOR YOU!."
            }
        ]
    }
    console.log(formatData)
    axios.post(SLACKURL, formatData)
        .then((res)=> {
            console.log(res.status);
            return(res.status)
        })
        .catch((err)=>{
            console.error(err);
        })
}

module.exports = {
    sendVoucherSlack
}