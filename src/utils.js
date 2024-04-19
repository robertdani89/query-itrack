function angleFromCoordinate(lat1, long1, lat2, long2) {
    const dLon = (long2 - long1) * Math.PI / 180;

    const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) - Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);

    let brng = Math.atan2(y, x);

    brng = brng * 180 / Math.PI;
    brng = (brng + 360) % 360;
    brng = 180 - brng;

    return brng;
}

function toRad(Value) {
    return Value * Math.PI / 180;
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

function createBasicAuthHeader(username, password) {
    const credentials = username + ":" + password;
    const encodedCredentials = btoa(credentials);
    const authHeader = "Basic " + encodedCredentials;
    return authHeader;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = { angleFromCoordinate, calcCrow, createBasicAuthHeader, sleep }