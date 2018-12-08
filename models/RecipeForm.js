module.exports = function (sequelize, DataTypes) {
    var FormRecipe = sequelize.define("FormRecipe", {
        user_ID: { type: DataTypes.STRING },
        user_name: { type: DataTypes.STRING },
        user_email: { type: DataTypes.STRING },
        recipe_image: { type: DataTypes.STRING },
        recipe_name: { type: DataTypes.STRING },
        recipe_servings: { type: DataTypes.STRING },
        recipe_ingredients: { type: DataTypes.STRING },
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

    // Burger.associate = function (models) {
    //     // We're saying that a Post should belong to an Author
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Burger.belongsTo(models.Customer, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return FormRecipe;
};