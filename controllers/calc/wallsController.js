//  @ POST
//  @http://localhost:8000/api/calc/walls
const getWallHeat = async (req, res) => {

    try {
        const cpCon = req.body.wallParams.wall.construction.heatTransfer
        const cpIns = req.body.wallParams.wall.insulation.heatTransfer
        const conThick = req.body.wallParams.wall.constructionThickness
        const insThick = req.body.wallParams.wall.insulationThickness
        const outT = req.body.wallParams.wall.outerTemperature
        const solarT = req.body.wallParams.wall.solarTemperature
        const windInSpeed = req.body.wallParams.windInSpeed
        const windOutSpeed = req.body.wallParams.wall.windSpeed
        const customCon = req.body.wallParams.wall.customConstruction
        const customIns = req.body.wallParams.wall.customInsulation
        const isCustomCon = req.body.wallParams.wall.isCustomConstruction
        const isCustomIns = req.body.wallParams.wall.isCustomInsulation
        const wHeight = req.body.wallParams.wHeight
        const wLength = req.body.wallParams.wLength
        const roomT = req.body.wallParams.roomTemperature

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

        return res.status(200).send({ heatWall: Math.round(Q1 * 100) / 100 })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getWallHeat,
}