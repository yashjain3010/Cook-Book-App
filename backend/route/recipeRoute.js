const express = require("express");
const authenticationToken = require("../middleware/middleware");
const {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  markAsFavourite,
  removeFromFavourite,
  getFavourites,
} = require("../controller/routeController");

const router = express.Router();

router.get('/',authenticationToken,getAllRecipes);
router.post('/',authenticationToken,createRecipe);
router.delete('/:id',authenticationToken,deleteRecipe);
router.post('/:id/favourite',authenticationToken,markAsFavourite)
router.post('/:id/unfavourite',authenticationToken,removeFromFavourite)
router.get('/favourite',authenticationToken,getFavourites);

module.exports = router;