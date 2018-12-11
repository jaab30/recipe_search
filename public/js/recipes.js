

$(document).ready(function () {
    console.log("ready!");
    // When the user scrolls the page, execute myFunction

    window.onscroll = function () { myFunction() };

    // Get the navbar
    var navbar = document.getElementById("navbar");

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }



    // Create user ID function
    function userIdNumber() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    //  check if user already has an id, if not create one and store it in local storage
    var myRecipeUserId = localStorage.getItem("userId");

    if (myRecipeUserId == null) {
        myRecipeUserId = userIdNumber();
        localStorage.setItem("userId", myRecipeUserId);
        var userId = myRecipeUserId;

    } else {

        var userId = myRecipeUserId;
        $.ajax({
            url: "/getdatabase/" + userId,
            type: "GET",
        }).then(
            // show contents from databe myrecipes
            function (res) {
                for (let i = 0; i < res.length; i++) {
                    dbImgDiv = $("<div class='dbImgDiv'>")
                    dbImg = $("<img class='dbImg' alt='Recipe Img'>").attr("src", res[i].recipe_image);

                    dbDetailsDiv = $("<div class='dbDetailsDiv'>")
                    dbrecipeName = $("<p class='dbName'>").text(res[i].recipe_name).attr("data-name", res[i].recipe_name)
                    dbHealthLabel = $("<p>").text(res[i].recipe_health_label)
                    dbServingsCalories = $("<p>").text("Servings / Calories: " + Math.round(res[i].recipe_calories / res[i].recipe_servings))
                    dbServings = $("<p>").text("Servings: " + res[i].recipe_servings)
                    dbOtherLabel = $("<p>").text("Other: " + res[i].recipe_other_label)
                    dbIngredients = $("<p>").text("Ingredients: " + res[i].recipe_ingredients)
                    dbInstructions = $("<a>").attr("href", res[i].recipe_cookingInst).attr("target", "_blank").text('Cooking Instructions')
                    dbTrashDiv = $("<p>")
                    dbTrash = $("<i class='fas fa-trash-alt dbTrash'>").attr("data-id", res[i].id)
                    dbTrashDiv.append(dbTrash)

                    dbImgDiv.append(dbrecipeName, dbImg)

                    dbDetailsDiv.append(dbHealthLabel, dbServingsCalories, dbServings, dbOtherLabel, dbIngredients, dbInstructions, dbTrashDiv)


                    $(".myRecipeListResults").append(dbImgDiv, dbDetailsDiv)
                }
            }
        );
    }
    // call API
    queryURL = "https://api.edamam.com/search?q=&app_id=bf1e3672&app_key=28596a3e346300619e46cf85bbebc6e3&from=0&to=30&diet=low-carb&"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {

        response = res
        // display feature recipe front page
        featureRecipe(9)

        $.ajax({
            url: "/getdatabase/" + userId,
            type: "GET",
        }).then(function (res) {

            for (let i = 0; i < res.length; i++) {
                if ($(".myListName").attr("data-name") == res[i].recipe_name) {
                    $(".myListBtn[data-name='" + res[i].recipe_name + "']").text("On My List").addClass("onMyList").removeClass("myListBtn")

                }
            }

        })
    })

    // function to display feature recipe
    function featureRecipe(x) {

        featureImgDiv = $("<div class='featureImgDiv'>")
        featureImg = $("<img class='featureImg' alt='Recipe Img'>").attr("src", "/img/featured_pic_use.jpg");
        featureDetailsDiv = $("<div class='featureDetailsDiv'>")
        featureRecipeName = $("<h3 class='recipeDetailsName myListName'>").text(response.hits[x].recipe.label).attr("data-name", response.hits[x].recipe.label);

        var featurerecipeCarbLabelArray = [];
        featurerecipeCarbLabel = $("<p class='carbLabel'>")

        for (let i = 0; i < response.hits[x].recipe.dietLabels.length; i++) {
            var featurecarbLabelItem = response.hits[x].recipe.dietLabels[i]
            featurerecipeCarbLabelArray.push(featurecarbLabelItem)
            var featurecarbLabelItemList = featurerecipeCarbLabelArray.join(', ');

        }
        featurerecipeCarbLabel.append(featurecarbLabelItemList)

        var featurecaloriesServings = response.hits[x].recipe.calories / response.hits[x].recipe.yield;
        var featurecaloriesServingsRound = Math.round(featurecaloriesServings)

        featurerecipeCaloriesServings = $("<p class='caloriesServings'>").text("Calories per Serving: " + featurecaloriesServingsRound)

        featurerecipeServings = $("<p class='servings'>").text("Servings: " + response.hits[x].recipe.yield)

        featurehealthLabelArrayJoin = response.hits[x].recipe.healthLabels;
        featurehealthLabelArray = featurehealthLabelArrayJoin.join(", ");
        featurehealthLabelListHolder = $("<div class='labelList'>")

        var featurelabelItemList = $("<p class='healthLabels'>").text(featurehealthLabelArray)
        featurehealthLabelListHolder.append(featurelabelItemList)

        featureingredientsArray = []
        featureingredientTitle = $("<h3>").text("Ingredients:")
        featureingredientsListHolder = $("<ul class='featureingredientList'>")

        for (let j = 0; j < response.hits[x].recipe.ingredients.length; j++) {
            var featureingredientItem = response.hits[x].recipe.ingredients[j].text
            featureingredientsArray.push(featureingredientItem)
            var featureingredientItemList = $("<li>").text(featureingredientsArray[j])
            featureingredientsListHolder.append(featureingredientItemList)
        }

        featureinstructions = $("<a class='linkInst'>").attr("href", response.hits[x].recipe.url).attr("target", "_blank").text('Cooking Instructions from: "' + response.hits[x].recipe.source + '"')
        var featurebtnsDiv = $("<div class='buttonsDiv'>")

        myListBtn = $("<button class='myListBtn' type='button'>").text("Add to my Recipes").attr("data-value", x).attr("data-name", response.hits[x].recipe.label);

        printBtn = $("<button class='printBtn' type='button'>").text("Print").attr("data-value", 5);

        // reviewBtn = $("<button class='reviewBtn' type='button'>").text("Write a Review").attr("data-value", 5);

        featurebtnsDiv.append(myListBtn, printBtn)

        featureImgDiv.append(featureImg)
        featureDetailsDiv.append(featureRecipeName, featurerecipeCarbLabel, featurerecipeServings, featurerecipeCaloriesServings, featurehealthLabelListHolder, featureingredientTitle, featureingredientsListHolder, featureinstructions, featurebtnsDiv);

        $(".searchResultsList").append(featureImgDiv)
        $(".searchRecipeDetailsDiv").append(featureDetailsDiv)

    }

    // function to display API results after search
    function displayResults(x) {

        for (var i = x; i < (x + 10); i++) {

            recipeDiv = $("<div class='searchListDetails'>").attr("data-value", i)
            recipeImg = $("<img class='imgSearch' alt='Recipe Img'>").attr("src", response.hits[i].recipe.image);
            recipeName = $("<h3 class='recipeName'>").attr("data-value", i).text(response.hits[i].recipe.label);
            recipeDetailsBtn = $("<button id='recipeDetails' class='recipeBtn' type='button'>").text("More Info").attr("data-value", i);
            title = $("<h2>").text("Low Carb Recipes Search Results")
            recipeDiv.append(recipeImg, recipeName, recipeDetailsBtn)
            $(".searchResultsList").append(recipeDiv)
        }
    }
    // scroll right btn
    $(document.body).on("click", ".scroll-rightImg", function () {
        var scrollValue = $(this).attr("value")
        scrollValue = parseInt(scrollValue)
        var scrollValueLeft = scrollValue - 10;
        scrollValueLeft = parseInt(scrollValueLeft)
        scrollLeftImg = $("<i class='fas fa-angle-double-left scroll-leftImg'></i>").attr("value", scrollValueLeft);
        $(".scroll-left").append(scrollLeftImg)
        if (scrollValue > 39) {
            $(".searchResultsList").empty()
            $(".scroll-left").empty()
            displayResults(scrollValue);
            scrollValueLeft = parseInt(scrollValue) - 10
            scrollLeftImg.attr("value", scrollValueLeft);
            $(".scroll-right").empty()
            $(".scroll-left").append(scrollLeftImg)
        } else {
            $(".searchResultsList").empty()
            $(".scroll-left").empty()
            displayResults(scrollValue);
            scrollValue = parseInt(scrollValue) + 10
            scrollRightImg.attr("value", scrollValue);
            scrollLeftImg.attr("value", scrollValueLeft);
            $(".scroll-left").append(scrollLeftImg)
        }
    })
    // scroll left btn
    $(document.body).on("click", ".scroll-leftImg", function () {
        var scrollValueLeft = $(this).attr("value")
        scrollValueLeft = parseInt(scrollValueLeft)
        var scrollValue = scrollValueLeft + 10;
        scrollValue = parseInt(scrollValue)
        if (scrollValueLeft === 0) {
            $(".searchResultsList").empty()
            displayResults(scrollValueLeft);
            scrollValue = parseInt(scrollValueLeft) + 10
            scrollRightImg.attr("value", scrollValue);
            $(".scroll-left").empty()
        } else {
            $(".searchResultsList").empty()
            $(".scroll-right").empty()
            displayResults(scrollValueLeft);
            scrollValueLeft = parseInt(scrollValueLeft) - 10
            scrollLeftImg.attr("value", scrollValueLeft);
            scrollRightImg.attr("value", scrollValue);
            $(".scroll-right").append(scrollRightImg)
        }
    })

    $(function () {
        // search btn
        $(".submitBtn").on("click", function (event) {
            event.preventDefault()
            window.location.href = '#pagetop'
            var input = $("#search-inputText").val()
            $(".h1main").empty()
            $(".h2main").html("<h2>Low Carb Recipes Search Results</h2>")
            $(".searchResultsList").empty()
            $(".searchRecipeDetailsDiv").empty()
            $(".scroll-right").empty()
            $(".scroll-left").empty()
            queryURL = "https://api.edamam.com/search?q=" + input + "&app_id=bf1e3672&app_key=28596a3e346300619e46cf85bbebc6e3&from=0&to=50&diet=low-carb&"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (res) {
                featImgTempDiv = $("<div class='featImgTempDiv'>")
                featImgTemp = $("<img class='featImgTemp' alt='Recipe Img'>").attr("src", "/img/poster1B.jpg")
                featImgTempDiv.append(featImgTemp)
                $(".searchRecipeDetailsDiv").append(featImgTempDiv)

                response = res
                displayResults(0);
                $("#search-inputText").val("")
                scrollRightImg = $("<i class='fas fa-angle-double-right scroll-rightImg'></i>").attr("value", "10");
                $(".scroll-right").append(scrollRightImg)
            })
        })

        // more info btn
        $(document.body).on("click", ".recipeBtn", function () {
            $(".searchRecipeDetailsDiv").empty()
            $(".searchRecipeDetailsDivHidden").empty()
            var recipeID = $(this).attr("data-value")
            recipeDetailsDiv = $("<div class='recipeDetailsDiv'>")
            recipeImg = $("<img class='imgDetails' alt='Recipe Img'>").attr("src", response.hits[recipeID].recipe.image);
            recipeName = $("<h3 class='recipeDetailsName'>").text(response.hits[recipeID].recipe.label).attr("data-name", response.hits[recipeID].recipe.label);
            var recipeCarbLabelArray = [];
            recipeCarbLabel = $("<p class='carbLabel'>")
            for (let i = 0; i < response.hits[recipeID].recipe.dietLabels.length; i++) {
                var carbLabelItem = response.hits[recipeID].recipe.dietLabels[i]
                recipeCarbLabelArray.push(carbLabelItem)
                var carbLabelItemList = recipeCarbLabelArray.join(', ');
            }
            recipeCarbLabel.append(carbLabelItemList)

            var caloriesServings = response.hits[recipeID].recipe.calories / response.hits[recipeID].recipe.yield;
            var caloriesServingsRound = Math.round(caloriesServings)

            recipeCaloriesServings = $("<p class='caloriesServings'>").text("Calories per Serving: " + caloriesServingsRound)

            recipeServings = $("<p class='servings'>").text("Servings: " + response.hits[recipeID].recipe.yield)

            healthLabelArrayJoin = response.hits[recipeID].recipe.healthLabels;
            healthLabelArray = healthLabelArrayJoin.join(", ");
            healthLabelListHolder = $("<div class='labelList'>")

            var labelItemList = $("<p class='healthLabels'>").text(healthLabelArray)
            healthLabelListHolder.append(labelItemList)

            ingredientsArray = []
            ingredientTitle = $("<h3>").text("Ingredients:")
            ingredientsListHolder = $("<ul class='ingredientList'>")

            for (let i = 0; i < response.hits[recipeID].recipe.ingredients.length; i++) {
                var ingredientItem = response.hits[recipeID].recipe.ingredientLines[i]
                ingredientsArray.push(ingredientItem)
                var ingredientItemList = $("<li>").text(ingredientsArray[i])
                ingredientsListHolder.append(ingredientItemList)

                $(".ingredientList").append(ingredientsListHolder)
            }

            instructions = $("<a class='linkInst'>").attr("href", response.hits[recipeID].recipe.url).attr("target", "_blank").text('Cooking Instructions (' + response.hits[recipeID].recipe.source + ')')
            var btnsDiv = $("<div class='buttonsDiv'>")

            myListBtn = $("<button class='myListBtn' type='button'>").text("Add to my Recipes").attr("data-value", recipeID).attr("data-name", response.hits[recipeID].recipe.label);

            printBtn = $("<button class='printBtn' type='button'>").text("Print").attr("data-value", recipeID);

            // reviewBtn = $("<button class='reviewBtn' type='button'>").text("Write a Review").attr("data-value", recipeID);

            btnsDiv.append(myListBtn, printBtn)

            recipeDetailsDiv.append(recipeImg, recipeName, recipeCarbLabel, recipeServings, recipeCaloriesServings, healthLabelListHolder, ingredientTitle, ingredientsListHolder, instructions, btnsDiv);

            $(".searchRecipeDetailsDiv").append(recipeDetailsDiv)
            $(".searchRecipeDetailsDivHidden").append(recipeDetailsDiv)

            $.ajax({
                url: "/getdatabase/" + userId,
                type: "GET",

            }).then(function (res) {

                for (let i = 0; i < res.length; i++) {
                    if (response.hits[recipeID].recipe.label == res[i].recipe_name) {

                        $(".myListBtn[data-name='" + res[i].recipe_name + "']").text("On My List").addClass("onMyList").removeClass("myListBtn")
                    }
                }
            })
        })


        // feature image links
        $(".feature1link").on("click", function (event) {
            window.location.href = '#pagetop'
            $(".searchResultsList").empty()
            $(".searchRecipeDetailsDiv").empty()
            $(".h2main").empty()
            $(".h2main").html("<h2>Low Carb Vegan Recipes</h2>")
            $(".scroll-left").empty()
            $(".scroll-right").empty()

            queryURL = "https://api.edamam.com/search?q=&app_id=bf1e3672&app_key=28596a3e346300619e46cf85bbebc6e3&from=0&to=10&diet=low-carb&time=1-10"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (res) {

                featImgTempDiv = $("<div class='featImgTempDiv'>")
                featImgTemp = $("<img class='featImgTemp' alt='Recipe Img'>").attr("src", "/img/poster2A.jpg")
                featImgTempDiv.append(featImgTemp)
                $(".searchRecipeDetailsDiv").append(featImgTempDiv)

                response = res
                displayResults(0);
            })
        })

        $(".feature2link").on("click", function (event) {
            window.location.href = '#pagetop'
            $(".searchResultsList").empty()
            $(".searchRecipeDetailsDiv").empty()
            $(".h2main").empty()
            $(".h2main").html("<h2>Low Carb Seafood Recipes</h2>")
            $(".scroll-left").empty()
            $(".scroll-right").empty()

            queryURL = "https://api.edamam.com/search?q=seafood&app_id=bf1e3672&app_key=28596a3e346300619e46cf85bbebc6e3&from=0&to=10&diet=low-carb"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (res) {

                featImgTempDiv = $("<div class='featImgTempDiv'>")
                featImgTemp = $("<img class='featImgTemp' alt='Recipe Img'>").attr("src", "/img/poster3A.jpg")
                featImgTempDiv.append(featImgTemp)
                $(".searchRecipeDetailsDiv").append(featImgTempDiv)

                response = res
                displayResults(0);
            })
        })

        $(".feature3link").on("click", function (event) {
            window.location.href = '#pagetop'
            $(".searchResultsList").empty()
            $(".searchRecipeDetailsDiv").empty()
            $(".h2main").empty()
            $(".h2main").html("<h2>Low Carb Dessert Recipes</h2>")
            $(".scroll-left").empty()
            $(".scroll-right").empty()

            queryURL = "https://api.edamam.com/search?q=cookie&app_id=bf1e3672&app_key=28596a3e346300619e46cf85bbebc6e3&from=0&to=9&diet=low-carb"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (res) {

                featImgTempDiv = $("<div class='featImgTempDiv'>")
                featImgTemp = $("<img class='featImgTemp' alt='Recipe Img'>").attr("src", "/img/poster1A.jpg")
                featImgTempDiv.append(featImgTemp)
                $(".searchRecipeDetailsDiv").append(featImgTempDiv)

                response = res
                displayResults(0);
            })
        })



        // Print Btn        
        $(document.body).on("click", ".printBtn", function () {
            window.print()
        })

        // add to my list Btn
        $(document.body).on("click", ".myListBtn", function (event) {
            var myRecipeID = $(this).attr("data-value")

            var newRecipe = {
                dbuserId: userId,
                image: response.hits[myRecipeID].recipe.image,
                name: response.hits[myRecipeID].recipe.label,
                healthLabel: (response.hits[myRecipeID].recipe.dietLabels).join(", "),
                servings: response.hits[myRecipeID].recipe.yield,
                calories: response.hits[myRecipeID].recipe.calories,
                otherLabel: (response.hits[myRecipeID].recipe.healthLabels).join(", "),
                ingredients: (response.hits[myRecipeID].recipe.ingredientLines).join(", "),
                instructions: response.hits[myRecipeID].recipe.url
            };
            $(this).text("On My List").addClass("onMyList").removeClass("myListBtn")

            // Send the POST request.
            $.ajax("/api/myrecipes", {
                type: "POST",
                data: newRecipe
            }).then(
                function () {
                }
            );
        });


        // add New Recipe Form Btn
        $(".submitForm").on("click", function (event) {
            event.preventDefault()

            if ($(".imageForm").val() === "") {
                var imageFormReplacement = "https://www.eatright.org/-/media/eatrightimages/food/nutrition/vegetarianandspecialdiets/foodsourcesof5importantnutrientsforvegetarians.jpg"

            } else {
                var imageFormReplacement = $(".imageForm").val()
            }

            var formValid = true;
            // checking if form filled
            if ($(".userForm").val().trim() === "" || $(".emailForm").val().trim() === "" || $(".nameForm").val().trim() === "" || $(".servingsForm").val().trim() === "" || $(".ingredientsForm").val().trim() === "" || $(".instructionsForm").val().trim() === "") {
                formValid = false;
            }

            if (formValid === true) {

                var newFormRecipe = {
                    userIdForm: userId,
                    userForm: $(".userForm").val(),
                    emailForm: $(".emailForm").val(),
                    imageForm: imageFormReplacement,
                    nameForm: $(".nameForm").val(),
                    servingsForm: $(".servingsForm").val(),
                    ingredientsForm: $(".ingredientsForm").val(),
                    instructionsForm: $(".instructionsForm").val()
                }

                $.ajax("/api/uploadrecipe", {
                    type: "POST",
                    data: newFormRecipe
                }).then(
                    function () {

                        console.log("uploaded new Recipe");
                        alert("Thanks for submitting your recipe... You should be able to view it at our 'Home' page")
                        location.reload();
                    }
                );
            } else {
                alert("Please fill out all fields before submitting!")
            }

        })
        $(document.body).on("click", ".dbTrash", function () {
            var id = $(this).data("id");
            $.ajax("/api/myrecipes/" + id, {
                type: "DELETE",
                data: id
            }).then(
                function () {
                    console.log("Deleted Recipe");
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        });
    });
});