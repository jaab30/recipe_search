const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe_controller")

router.get("/", recipeController.getAllRecipes);
router.get("/uploadrecipe", (req, res) => res.render("uploadrecipe"));
router.get("/viewrecipe", (req, res) => res.render("viewrecipe"));
router.get("/home", recipeController.getAllRecipesHome);


module.exports = router;