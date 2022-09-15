const calcAirProps = (t, Fi) => {
    //  atmosphere pressure - Pa
    const Pb = 101325;
    //  saturated steam pressure - Pa
    const Psv = 610.5 * Math.exp((17.269 * t) / (237.3 + t));
    //  moist content - g/kg
    const d = 623 / ((Pb / (Fi * Psv)) - 1);
    //  enthalpy - kJ/kg
    const h = 1.005 * t + (2.5 + 0.0018 * t) * d;
    //  partial pressure - Pa
    const Pp = (d * Pb) / (d + 623);
    //  dew point temperature - *C
    const td = (Math.log((d * Pb) / (610.5 * (623 + d))) * 237.3) / (17.269 - Math.log((d * Pb) / (610.5 * (623 + d))));
    //  wet bulb temperature - *C
    const tw = (-5.8123227 + 0.52874192 * h + 0.011089622 * Math.pow(h, 2)) / (1 + 0.026107546 * h + 0.00016844816 * Math.pow(h, 2) - 6.7596636 * Math.pow(10, -8) * Math.pow(h, 3));
    //   air dencity - kg/m3
    const p = (Pb * 0.001) / (0.2871 * (t + 273.15) * (1 + 1.6078 * d * 0.001));
    // air viscozity - Pa*sec (10^-6)
    const mu = (17.23 + 0.048 * t);

    return { Pb, Psv, d, h, Pp, td, tw, p, mu }
}

//  @ POST
//  @http://localhost:8000/api/calc/ventilation
const getVentHeat = async (req, res) => {
    try {
        const {
            ventilationIsOn,
            ventilatedAirTemperature,
            ventilatedAirRH,
            airExchange,
            roomLength,
            roomWidth,
            roomHeight,
            roomTemperature,
            roomRH
        } = req.body

        const roomAir = calcAirProps(roomTemperature, roomRH / 100)
        const ventAir = calcAirProps(ventilatedAirTemperature, ventilatedAirRH / 100)
        const roomVolume = roomLength * roomWidth * roomHeight
        const Q3vent = ((ventAir.h - roomAir.h) * airExchange * roomVolume * ventAir.p) / (3600 * 24)

        return res.status(200).send({ Q3vent: Math.round(Q3vent * 10) / 10 })
    } catch (error) {
        console.log(error);
    }
}


//  @ POST
//  @http://localhost:8000/api/calc/infiltration
const getDoorsHeat = async (req, res) => {
    try {
        const {
            airDoorTemperature,
            airDoorRH,
            dorsOpenHours,
            dorsWidth,
            dorsHeight,
            dorsProtection,
            roomTemperature,
            roomRH
        } = req.body

        const roomAir = calcAirProps(roomTemperature, roomRH / 100)
        const doorAir = calcAirProps(airDoorTemperature, airDoorRH / 100)

        const Dt = dorsOpenHours / 24

        let E = 0
        if (dorsProtection === 'noProtection') {
            E = 0;
        } else if (dorsProtection === 'stripCurtain') {
            E = 0.2;

        } else if (dorsProtection === 'airCurtain') {
            E = 0.7;
        }

        let Df = 1.1
        const tempDiff = Math.abs(airDoorTemperature - roomTemperature)
        if (tempDiff <= 7) {
            Df = 0.8
        } else if (tempDiff >= 16) {
            Df = 1.1
        } else if (tempDiff > 7 && tempDiff < 16) {
            x = tempDiff
            x1 = 16
            x0 = 7;
            y1 = 1.1
            y0 = 0.8
            Df = ((x - x0) * (y1 - y0) / (x1 - x0)) + y0
        }

        const doorA = dorsWidth * dorsHeight
        const Fm = Math.pow(2 / (1 + Math.pow(roomAir.p / doorAir.p, 1 / 3)), 1.5)
        const q = 0.221 * doorA * (doorAir.h - roomAir.h) * roomAir.p * Math.pow((1 - doorAir.p / roomAir.p), 0.5) * Math.pow((9.81 * dorsHeight), 0.5) * Fm
        const Q44dors = q * Dt * Df * (1 - E)

        return res.status(200).send({
            Q44dors: Math.round(Q44dors * 10) / 10,
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getVentHeat,
    getDoorsHeat
}