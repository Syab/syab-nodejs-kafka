require('dotenv').config()

module.exports = {
    PORT : process.env.PORT || 8000,
    USER : process.env.USER,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REFRESHTOKEN : "<refreshtoken>",
    REDIRECT_URI: "https://developers.google.com/oauthplayground",
    REST_PROXY_BASE_URI : "http://localhost:8082",
    USERPROFILE_TOPIC_NAME : "USERPROFILE",
    USERPROFILE_SCHEMA_ID : 8,
    EVENTHISTORY_TOPIC_NAME : "EVENTHISTORY",
    EVENTHISTORY_SCHEMA_ID : 7,
    SLACKURL: process.env.SLACKURL
};