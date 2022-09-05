//  @ POST
//  @http://localhost:8000/api/calc/walls
const getWallHeat = async (req, res) => {

    try {
        const cpCon = req.body.construction.heatTransfer
        const cpIns = req.body.insulation.heatTransfer
        const conThick = req.body.constructionThickness
        const insThick = req.body.insulationThickness
        const outT = req.body.outerTemperature
        const solarT = req.body.solarTemperature
        const windInSpeed = req.body.windSpeed
        const windOutSpeed = req.body.windOutSpeed
        const customCon = req.body.customConstruction
        const customIns = req.body.customInsulation
        const isCustomCon = req.body.isCustomConstruction
        const isCustomIns = req.body.isCustomInsulation
        const wHeight = req.body.wHeight
        const wLength = req.body.wLength
        const roomT = req.body.roomTemperature

        // console.log(cpCon, cpIns, conThick, insThick, outT, solarT, windInSpeed, windOutSpeed, customCon, customIns, isCustomCon, isCustomIns, wHeight, wLength, roomT);

        let alfaIn = 9
        if (windInSpeed === "fast") { alfaIn = 23 }
        let alfaOut = 9
        if (windOutSpeed === "fast") { alfaOut = 23 }


        const F = wHeight * wLength;
        let construction = 0
        let insulation = 0

        if (!isCustomCon) {
            construction = conThick / customCon
        } else {
            construction = conThick / cpCon
        }

        if (!isCustomIns) {
            insulation = insThick / customIns
        } else {
            insulation = insThick / cpIns
        }

        const K = 1 / ((1 / alfaIn) + (construction) + (insulation) + (1 / alfaOut))
        const deltaT = solarT + outT - roomT
        const Q1 = K * F * deltaT;

        return res.status(200).send({ heatWall: Math.round(Q1 * 10) / 10 })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getWallHeat,
}