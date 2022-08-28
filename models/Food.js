const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    foodItem: {
        type: String,
    },
    category: {
        type: String,
    },
    waterContent: {
        type: String,
    },
    freezPoint: {
        type: Number,
    },
    cpAboveFreez: {
        type: Number,
    },
    cpBelowFreez: {
        type: Number,
    },
    latentHeat: {
        type: Number,
    },
    imgSmall: {
        type: String,
    },
    imgMedium: {
        type: String,
    },
    raspirationHeat: {
        type: Object,
    },
    storageTime: {
        type: String,
    },
    storageTemperature: {
        type: String,
    },
    storageRH: {
        type: String,
    },
    freshAir: {
        type: String,
    },
    airExchange: {
        type: String,
    },
    specificWeight: {
        type: String,
    },
    info: {
        type: String,
    },

}
)

module.exports = mongoose.model('Food', foodSchema)