const Food = require('../../models/Food')

//  @ POST
//  @http://localhost:8000/api/calc/food
const addFoodType = async (req, res) => {
    try {
        const food = new Food({
            category: req.body.category,
            foodItem: req.body.foodItem,
            waterContent: req.body.waterContent,
            freezPoint: req.body.freezPoint,
            cpAboveFreez: req.body.cpAboveFreez,
            cpBelowFreez: req.body.cpBelowFreez,
            cpBelowFreez: req.body.cpBelowFreez,
            latentHeat: req.body.latentHeat,
            imgSmall: req.body.imgSmall,
            imgMedium: req.body.imgMedium,
            raspirationHeat: req.body.raspirationHeat,
            storageTime: req.body.storageTime,
            storageTemperature: req.body.storageTemperature,
            storageRH: req.body.storageRH,
            freshAir: req.body.freshAir,
            airExchange: req.body.airExchange,
            specificWeight: req.body.specificWeight,
            info: req.body.info,
        });

        const savedFood = await food.save();
        res.status(200).send(savedFood)

    } catch (error) {
        console.log(error);
    }
}

//  @ GET
//  @http://localhost:8000/api/calc/food/categories
const getFoodCategories = async (req, res) => {
    try {
        const food = await Food.find({})
        foodCategories = []
        food.forEach((item) => {
            if (!foodCategories.includes(item.category)) {
                foodCategories.push(item.category)
            }
        })
        return res.status(200).json(foodCategories)


    } catch (error) {

    }
}
//  @ GET
//  @http://localhost:8000/api/calc/food/items:category
const getFoodItemsOfCategory = async (req, res) => {
    try {
        selectedCategory = req.params.category
        const foodList = await Food.find({ category: selectedCategory })

        const foodSortedList = foodList.map((item) => {
            const { foodItem, imgSmall } = item
            return { foodItem, imgSmall }
        })

        return res.status(200).json(foodSortedList)

    } catch (error) {
        console.log(error);
    }
}

//  @ GET
//  @http://localhost:8000/api/calc/food/item:item
const getFoodItemsProps = async (req, res) => {
    try {
        selectedFoodItem = req.params.item
        await Food.findOne({ foodItem: selectedFoodItem })
            .then(
                (result) => {
                    const { foodItem, imgMedium, waterContent, freezPoint, storageTemperature, storageRH, storageTime, freshAir, airExchange, specificWeight } = result
                    sortedFoodItem = { foodItem, imgMedium, waterContent, freezPoint, storageTemperature, storageRH, storageTime, freshAir, airExchange, specificWeight }
                    return res.status(200).json(sortedFoodItem)
                }
            )
    } catch (error) {
        console.log(error);
    }
}
//  @ POST
//  @http://localhost:8000/api/calc/food/q2
const getQ2 = async (req, res) => {
    try {
        const {
            totalMass,
            perDayMass,
            inletProdTemperature,
            currentFoodItem,
            roomTemperature,
            coolingTime
        } = req.body
        await Food.findOne({ foodItem: currentFoodItem })
            .then((result) => {
                let { raspirationHeat, freezPoint, cpAboveFreez, cpBelowFreez, latentHeat } = result

                if (roomTemperature > freezPoint) {
                    const Q2 = (perDayMass * cpAboveFreez * (inletProdTemperature - roomTemperature)) / (3600 * coolingTime)

                    const linearInterpolation = (roomTemperature, raspirationHeat) => {
                        x = parseFloat(roomTemperature)
                        if (x > 20) { x = 20 }
                        if (x < 0) { x = 0 }
                        x1 = Math.ceil(x / 5) * 5
                        x0 = x1 - 5;
                        y1 = parseFloat(raspirationHeat[x1])
                        y0 = parseFloat(raspirationHeat[x0])
                        return y = ((x - x0) * (y1 - y0) / (x1 - x0)) + y0
                    }

                    const qBreathNewFood = linearInterpolation(inletProdTemperature, raspirationHeat)
                    const qBeathAllFood = linearInterpolation(roomTemperature, raspirationHeat)

                    const breathNewFood = qBreathNewFood / 1000 * (perDayMass / 1000)
                    const breathAllFood = qBeathAllFood / 1000 * (totalMass / 1000)

                    return res.status(200).json({
                        Q2: Math.round(Q2 * 10) / 10,
                        breathNewFood: Math.round(breathNewFood * 10) / 10,
                        breathAllFood: Math.round(breathAllFood * 10) / 10,

                    })
                } else {
                    const Q2freez =
                        ((perDayMass * cpAboveFreez * (inletProdTemperature - freezPoint) / 3600)
                            + (perDayMass * latentHeat / 3600)
                            + (perDayMass * cpBelowFreez * (inletProdTemperature - roomTemperature) / 3600)) / coolingTime
                    return res.status(200).json({
                        Q2: Math.round(Q2freez * 10) / 10,
                        breathNewFood: 0,
                        breathAllFood: 0,
                    })
                }
            })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addFoodType,
    getFoodCategories,
    getFoodItemsOfCategory,
    getFoodItemsProps,
    getQ2
}