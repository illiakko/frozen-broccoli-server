//  @ POST
//  @http://localhost:8000/api/calc/additional/light
const getLight = async (req, res) => {
    try {
        const { lightPower, lightTime } = req.body
        const lightQ = (lightPower) * (lightTime / 24)
        res.status(200).send({ lightQ: Math.round(lightQ * 100) / 100 })

    } catch (error) {
        console.log(error);
    }
}
//  @ POST
//  @http://localhost:8000/api/calc/additional/fans
const getFans = async (req, res) => {
    try {
        const { fanNumber, fanPower, fanTime } = req.body
        const fanQ = (fanPower * fanNumber) * (fanTime / 24)
        return res.status(200).send({ fanQ: Math.round(fanQ * 100) / 100 })

    } catch (error) {
        console.log(error);
    }
}
//  @ POST
//  @http://localhost:8000/api/calc/additional/people
const getPeople = async (req, res) => {
    try {
        const { peopleNumber, peopleTime } = req.body
        const peopleQ = (0.25 * peopleNumber) * (peopleTime / 24)
        return res.status(200).send({ peopleQ: Math.round(peopleQ * 100) / 100 })

    } catch (error) {
        console.log(error);
    }
}
//  @ POST
//  @http://localhost:8000/api/calc/additional/other
const getOther = async (req, res) => {
    try {
        const { otherPower, otherTime } = req.body;
        const otherQ = otherPower * (otherTime / 24)
        return res.status(200).send({ otherQ: Math.round(otherQ * 100) / 100 })

    } catch (error) {
        console.log(error);
    }
}
//  @ POST
//  @http://localhost:8000/api/calc/additional/defrost
const getDefrost = async (req, res) => {
    try {
        const { defrostType, defrostPower, defrostNumber, defrostTime } = req.body;

        if (defrostType === "none") {
            return res.status(200).send({ defrostQ: 0 })
        }
        const defrostQ = defrostPower * (defrostTime * defrostNumber * 60 / (24 * 3600))
        return res.status(200).send({ defrostQ: Math.round(defrostQ * 100) / 100 })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getLight,
    getFans,
    getPeople,
    getOther,
    getDefrost
}