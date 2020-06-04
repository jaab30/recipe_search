const db = require("../models");

module.exports = {
    getAllRecipes(req, res) {
        db.FormRecipe.findAll({})
            .then(dbFormRecipe => {
                const formObject = {
                    myform: dbFormRecipe
                };
                res.render("index", formObject)
            });
    },
    getAllRecipesHome(req, res) {
        db.FormRecipe.findAll({})
            .then(dbFormRecipe => {
                const formObject = {
                    myform: dbFormRecipe
                };
                res.render("home", formObject)
            });
    },
    getUserRecipes(req, res) {
        db.MyRecipe.findAll({ where: { user_ID: req.params.id } })
            .then(dbMyRecipe => res.json(dbMyRecipe));
    },
    saveUserRecipes(req, res) {

        const { dbuserId, image, name, healthLabel, servings, calories, otherLabel, ingredients, instructions } = req.body;

        db.MyRecipe.create({
            user_ID: dbuserId,
            recipe_image: image,
            recipe_name: name,
            recipe_health_label: healthLabel,
            recipe_servings: servings,
            recipe_calories: calories,
            recipe_other_label: otherLabel,
            recipe_ingredients: ingredients,
            recipe_cookingInst: instructions

        }).then(dbMyRecipe => res.json(dbMyRecipe));
    },
    updateUserRecipes(req, res) {
        db.MyRecipe.update(
            { displayDetails: req.body.displayDetails },
            { where: { id: req.params.id } })
            .then(dbMyRecipe => res.json(dbMyRecipe));
    },
    saveRecipe(req, res) {

        const { userIdForm, userForm, emailForm, imageForm, nameForm, servingsForm, ingredientsForm, instructionsForm } = req.body;

        db.FormRecipe.create({
            user_ID: userIdForm,
            user_name: userForm,
            user_email: emailForm,
            recipe_image: imageForm,
            recipe_name: nameForm,
            recipe_servings: servingsForm,
            recipe_ingredients: ingredientsForm,
            recipe_cookingInst: instructionsForm
        })
            .then(dbRecipeForm => res.json(dbRecipeForm));
    },
    deleteRecipe(req, res) {
        db.MyRecipe.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbMyRecipe => res.json(dbMyRecipe))
    },

}
