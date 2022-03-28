const { sendVoucherSlack } = require("./sendVoucherSlack");
const { sendVoucherEmail } = require("./sendVoucherEmail")

module.exports = {
    sendVoucherSlack,
    sendVoucherEmail
}