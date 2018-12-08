var express = require("express");

var db = require("../models");

var router = express.Router();

router.get("/", function (req, res) {

    db.FormRecipe.findAll({}).then(function (dbFormRecipe) {

        var formObject = {
            myform: dbFormRecipe
        };

        res.render("index", formObject)
    });

});


router.get("/uploadrecipe", function (req, res) {
    res.render("uploadrecipe");
});
router.get("/viewrecipe", function (req, res) {
    res.render("viewrecipe");
});

router.get("/home", function (req, res) {

    db.FormRecipe.findAll({}).then(function (dbFormRecipe) {

        var formObject = {
            myform: dbFormRecipe
        };

        res.render("home", formObject);
    });
});

router.get("/getdatabase/:id", function (req, res) {

    db.MyRecipe.findAll({ where: { user_ID: req.params.id } }).then(function (dbMyRecipe) {

        res.json(dbMyRecipe);
    });

})



router.post("/api/myrecipes", function (req, res) {
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

    }).then(function (dbMyRecipe) {
        res.json(dbMyRecipe);
    });

});

router.put("/api/myrecipes/:id", function (req, res) {
    console.log(req.body.devouredValue)
    db.MyRecipe.update(
        { displayDetails: req.body.displayDetails },
        { where: { id: req.params.id } }).then(function (dbMyRecipe) {
            res.json(dbMyRecipe);
        })
});

router.post("/api/uploadrecipe", function (req, res) {
    db.FormRecipe.create({
        user_ID: req.body.userIdForm,
        user_name: req.body.userForm,
        user_email: req.body.emailForm,
        recipe_image: req.body.imageForm,
        recipe_name: req.body.nameForm,
        recipe_servings: req.body.servingsForm,
        recipe_ingredients: req.body.ingredientsForm,
        recipe_cookingInst: req.body.instructionsForm

    }).then(function (dbRecipeForm) {
        res.json(dbRecipeForm);
    });

});

router.delete("/api/myrecipes/:id", function (req, res) {
    db.MyRecipe.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbMyRecipe) {
        res.json(dbMyRecipe);
    });

});


// Export routes
module.exports = router;