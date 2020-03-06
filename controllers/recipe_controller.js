const db = require("../models");

module.exports = {
    getAllRecipes: function(req, res){
        db.FormRecipe.findAll({})
        .then(dbFormRecipe => {
            const formObject = {
                myform: dbFormRecipe
            };
            res.render("index", formObject)
        });
    },
    getAllRecipesHome: function(req, res){
        db.FormRecipe.findAll({})
        .then(dbFormRecipe => {
            const formObject = {
                myform: dbFormRecipe
            };
            res.render("home", formObject)
        });
    },
    getUserRecipes: function(req, res){
        db.MyRecipe.findAll({ where: { user_ID: req.params.id } })
        .then( dbMyRecipe => res.json(dbMyRecipe));
    },
    saveUserRecipes: function(req, res){
        db.MyRecipe.create({
            user_ID: req.body.dbuserId,
            recipe_image: req.body.image,
            recipe_name: req.body.name,
            recipe_health_label: req.body.healthLabel,
            recipe_servings: req.body.servings,
            recipe_calories: req.body.calories,
            recipe_other_label: req.body.otherLabel,
            recipe_ingredients: req.body.ingredients,
            recipe_cookingInst: req.body.instructions
    
        }).then(dbMyRecipe => res.json(dbMyRecipe));
    },
    updateUserRecipes: function(req, res){
        db.MyRecipe.update(
            { displayDetails: req.body.displayDetails },
            { where: { id: req.params.id } })
            .then(dbMyRecipe => res.json(dbMyRecipe));
    },
    saveRecipe: function(req, res){
        db.FormRecipe.create({
            user_ID: req.body.userIdForm,
            user_name: req.body.userForm,
            user_email: req.body.emailForm,
            recipe_image: req.body.imageForm,
            recipe_name: req.body.nameForm,
            recipe_servings: req.body.servingsForm,
            recipe_ingredients: req.body.ingredientsForm,
            recipe_cookingInst: req.body.instructionsForm
        })
        .then(dbRecipeForm => res.json(dbRecipeForm));
    },
    deleteRecipe: function(req, res){
        db.MyRecipe.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbMyRecipe => res.json(dbMyRecipe))
    },

}
