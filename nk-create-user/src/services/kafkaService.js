import axios from "axios";
import { REST_PROXY_BASE_URI } from "./config";

const pushToTopic = async (topicName, requestBody) => {
    axios({
        url: `${REST_PROXY_BASE_URI}/topics/${topicName}`,
        method: "POST",
        headers: {
            "Content-Type": "application/vnd.kafka.avro.v2+json",
            Accept: "application/vnd.kafka.v2+json,application/vnd.kafka+json,application/json"
        },
        data: requestBody
    })
}

export default {
    pushToTopic
}