const router = require('express').Router();

const { wallsController } = require('../controllers/calc/wallsController');
const { addFoodType,
    getFoodCategories,
    getFoodItemsOfCategory,
    getFoodItemsProps,
    getQ2 } = require('../controllers/calc/foodController');

//  calc A+B test
//  @http://localhost:8000/api/calc/
router.post('/walls', wallsController);


//  get food data
//  @http://localhost:8000/api/calc/
router.post('/food', addFoodType);
router.get('/food/categories', getFoodCategories);
router.get('/food/items/:category', getFoodItemsOfCategory);
router.get('/food/item/:item', getFoodItemsProps);
router.post('/food/q2', getQ2);


module.exports = router; 