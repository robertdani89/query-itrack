const async = require("async");
const { sleep, calcCrow, angleFromCoordinate } = require("./utils")
const { getTargets, getLastPosition } = require("./requests")
const { addCoordinates } = require("./db")

const WAIT_TIME = 25_000;
const THRESHOLD_IN_KM = 0.005;

const lastCache = {}

async function getCoordinates() {
    const targets = await getTargets();
    const updateCords = [];
    for (t of targets) {
        const [last] = await getLastPosition(t.id);
        const cache = lastCache[t.id];
        if (!cache) {
            lastCache[t.id] = last;
            continue
        }

        const d = calcCrow(last.latitude, last.longitude, cache.latitude, cache.longitude)
        if (d < THRESHOLD_IN_KM) continue;

        const angle = angleFromCoordinate(last.latitude, last.longitude, cache.latitude, cache.longitude);
        updateCords.push({
            rendszam: t.name,
            dir: last.speed == 0 && last.engineOn,
            eng: last.engineOn,
            long: last.longitude,
            lat: last.latitude,
            speed: last.speed,
            angle: angle
        })

        lastCache[t.id] = last;
    }
    if (updateCords.length)
        await addCoordinates(updateCords);
}

async function main() {
    return async.forever(async function () {
        let count = 1;
        while (true) {
            try {
                await getCoordinates();
            } catch (e) {
                console.error(e)
            }
            count++;

            await sleep(WAIT_TIME)
        }
    });
}

main();