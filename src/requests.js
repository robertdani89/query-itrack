
const axios = require('axios');
const { URL_BASE, ITRUCK_USERNAME, ITRUCK_PASSWORD } = require("../config")
const { createBasicAuthHeader } = require("./utils")

const authHeader = createBasicAuthHeader(ITRUCK_USERNAME, ITRUCK_PASSWORD);


async function getTargets() {
    const res = await axios.get(`${URL_BASE}/targets`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': authHeader
        }
    })

    return res.data;
}

async function getLastPosition(targetId) {
    const res = await axios.get(`${URL_BASE}/positions/last?targetIds=${targetId}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': authHeader
        }
    })

    return res.data;
}

module.exports = { getTargets, getLastPosition }



