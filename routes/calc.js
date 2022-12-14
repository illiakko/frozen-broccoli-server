const router = require('express').Router();

const { addFoodType,
    getFoodCategories,
    getFoodItemsOfCategory,
    getFoodItemsProps,
    getQ2 } = require('../controllers/calc/foodController');

const { getVentHeat, getDoorsHeat } = require('../controllers/calc/infiltrationController')
const { getWallHeat } = require('../controllers/calc/wallsController')

const { getLight,
    getPeople,
    getFans,
    getOther,
    getDefrost } = require('../controllers/calc/additionalController')


//  food data
//  @http://localhost:8000/api/calc/
router.post('/food', addFoodType);
router.get('/food/categories', getFoodCategories);
router.get('/food/items/:category', getFoodItemsOfCategory);
router.get('/food/item/:item', getFoodItemsProps);
router.post('/food/q2', getQ2);

//  get doors infiltration and ventilation
//  @http://localhost:8000/api/calc/
router.post('/ventilation', getVentHeat);
router.post('/infiltration', getDoorsHeat);

//  heat through single wall
//  @http://localhost:8000/api/calc/
router.post('/walls', getWallHeat);


//  heat from addittional sourses
//  @http://localhost:8000/api/calc/
router.post('/additional/light', getLight);
router.post('/additional/fans', getFans);
router.post('/additional/people', getPeople);
router.post('/additional/other', getOther);
router.post('/additional/defrost', getDefrost);

module.exports = router; 