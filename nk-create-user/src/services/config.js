import 'dotenv/config';

const port = process.env.PORT || 8080;
const REST_PROXY_BASE_URI = process.env.REST_PROXY_BASE_URI || "http://rest-proxy:8082";

export {
    port,
    REST_PROXY_BASE_URI
}