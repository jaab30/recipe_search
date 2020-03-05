module.exports = function (sequelize, DataTypes) {
    const MyRecipe = sequelize.define("MyRecipe", {
        user_ID: { type: DataTypes.STRING },
        recipe_image: { type: DataTypes.STRING },
        recipe_name: { type: DataTypes.STRING },
        recipe_health_label: { type: DataTypes.STRING },
        recipe_servings: { type: DataTypes.STRING },
        recipe_calories: { type: DataTypes.STRING },
        recipe_other_label: { type: DataTypes.STRING },
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

    return MyRecipe;
};