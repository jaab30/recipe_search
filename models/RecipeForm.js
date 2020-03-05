module.exports = function (sequelize, DataTypes) {
    const FormRecipe = sequelize.define("FormRecipe", {
        user_ID: { type: DataTypes.STRING },
        user_name: { type: DataTypes.STRING },
        user_email: { type: DataTypes.STRING },
        recipe_image: { type: DataTypes.STRING },
        recipe_name: { type: DataTypes.STRING },
        recipe_servings: { type: DataTypes.STRING },
        recipe_ingredients: { type: DataTypes.TEXT },
        recipe_cookingInst: { type: DataTypes.STRING },
        onmylist: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        displayDetails: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return FormRecipe;
};