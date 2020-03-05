const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe_controller")


router.get("/getdatabase/:id", recipeController.getUserRecipes);
router.post("/myrecipes", recipeController.saveUserRecipes);
router.put("/myrecipes/:id", recipeController.updateUserRecipes);
router.post("/uploadrecipe", recipeController.saveRecipe);
router.delete("/myrecipes/:id", recipeController.deleteRecipe);


module.exports = router;