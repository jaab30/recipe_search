
// When the user scrolls the page, execute myFunction

window.onscroll = function () { stickHeader() };

// Get the navbar
const navbar = document.getElementById("navbar");

// Get the offset position of the navbar
let sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
const stickHeader = () => {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

// Create user ID function
const userIdNumber = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};
//  check if user already has an id, if not create one and store it in local storage
let myRecipeUserId = localStorage.getItem("userId");
let userId = "";
let response;
let isFeaturedRecipe = true;

if (myRecipeUserId === null) {
    myRecipeUserId = userIdNumber();
    localStorage.setItem("userId", myRecipeUserId);
    userId = myRecipeUserId;
} else {
    userId = myRecipeUserId;
}

const checkRecipeList = () => {
    $.ajax({
        url: "/api/getdatabase/" + userId,
        type: "GET",
    }).then(res => {
        for (let i = 0; i < res.length; i++) {
            if ($(".myListName").attr("data-name") === res[i].recipe_name) {
                $(".myListBtn[data-name='" + res[i].recipe_name + "']").text("On My List").addClass("onMyList").removeClass("myListBtn")
            }
        }
    })
}

// get all recipes from API to display feature recipe

const displayFeatureRecipe = () => {

    queryURL = "https://api.edamam.com/search?q=&app_id=bf1e3672&app_key=28596a3e346300619e46cf85bbebc6e3&from=0&to=30&diet=low-carb&"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(res => {
        response = res;
        // display feature recipe front page
        displayRecipeDetails(7, res);
        checkRecipeList();
    })
}

displayFeatureRecipe()

const displayFeaturedRecipeImage = (image) => {

    let contentImg = `
            <div class="featureImgDiv">
            <img class="featureImg" src=${image}>
            </div>
            `
    $(".searchResultsList").append(contentImg)
}

const displayRecipeDetails = (x, response) => {

    const ingredientsList = response.hits[x].recipe.ingredients.map(item => `<li>${item.text}</li>`);
    displayFeaturedRecipeImage(response.hits[x].recipe.image);
    let content = `
            <div class="featureDetailsDiv">
                ${isFeaturedRecipe ? `` : "<img class='imgDetails' src=" + response.hits[x].recipe.image + " alt='Recipe Img'>"}
                <h3 class="recipeDetailsName myListName" data-name="${response.hits[x].recipe.label}">${response.hits[x].recipe.label}</h3>
                <p class="carbLabel">${response.hits[x].recipe.dietLabels.map(item => item).join(", ")}</p>
                <p class="servings">Servings: ${response.hits[x].recipe.yield}</p>
                <p class="caloriesServings">Calories per Serving: ${Math.round(response.hits[x].recipe.calories / response.hits[x].recipe.yield)}</p>
                <div class="labelList">
                    <p class="healthLabels">${response.hits[x].recipe.healthLabels.join(", ")}</p>
                </div>
                    <h3>Ingredients: </h3>
                    <ul class="featureingredientList">
                    ${ingredientsList.join("")}
                    </ul>
                </div>
                <a class="linkInst" href=${response.hits[x].recipe.url} target="_blank">Cooking Instructions from: ${response.hits[x].recipe.source}</a>
                <div class="buttonsDiv">
                    <button class="myListBtn" type="button" data-value="${x}" data-name="${response.hits[x].recipe.label}">Add to my Recipes</button>
                    <button class="printBtn" type="button" data-value="5">Print</button>
                </div>
            </div>
        `
    $(".searchRecipeDetailsDiv").append(content)
    isFeaturedRecipe = false;

}

// more info btn
$(document).on("click", ".recipeBtn", function () {
    $(".searchRecipeDetailsDiv").empty()
    $(".searchRecipeDetailsDivHidden").empty()
    const recipeID = $(this).attr("data-value")

    displayRecipeDetails(recipeID, response);
    checkRecipeList();

    $.ajax({
        url: "api/getdatabase/" + userId,
        type: "GET",

    }).then(function (res) {

        for (let i = 0; i < res.length; i++) {
            if (response.hits[recipeID].recipe.label == res[i].recipe_name) {

                $(".myListBtn[data-name='" + res[i].recipe_name + "']").text("On My List").addClass("onMyList").removeClass("myListBtn")
            }
        }
    })
})

// Save to User's Favorite list
$(document).on("click", ".myListBtn", function () {
    const myRecipeID = $(this).attr("data-value")

    const newRecipe = {
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
    }).then(data => console.log(data));
});

// Print Btn        
$(document).on("click", ".printBtn", () => window.print());

// display results to the page as a list of recipes
function displayResults(x) {

    for (let i = x; i < (x + 10); i++) {
        let content = `
                <div class="searchListDetails" data-value="${i}">
                    <img class="imgSearch" src=${response.hits[i].recipe.image} alt="Recipe Img">
                    <h3 class="recipeName" data-value="${i}">${response.hits[i].recipe.label}</h3>
                    <button id="recipeDetails" class="recipeBtn" type="button" data-value="${i}">More Info</button>
                </div>
                `
        $(".searchResultsList").append(content)
    }
}

$(".submitBtn").on("click", event => {
    event.preventDefault()
    window.location.href = '#top'
    let input = $("#search-inputText").val()
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
    }).then(res => {
        let content = `
            <div class='featImgTempDiv'>
                <img class='featImgTemp' src="/img/poster1B.jpg" alt='Recipe Img'>
            </div>
            `
        $(".searchRecipeDetailsDiv").append(content)

        response = res
        displayResults(0);
        $("#search-inputText").val("")
        scrollRightImg = $("<i class='fas fa-angle-double-right scroll-rightImg'></i>").attr("value", "10");
        $(".scroll-right").append(scrollRightImg)
    })
});
// scroll right btn
$(document).on("click", ".scroll-rightImg", function () {
    let scrollValue = $(this).attr("value")
    scrollValue = parseInt(scrollValue)
    let scrollValueLeft = scrollValue - 10;
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
$(document).on("click", ".scroll-leftImg", function () {
    let scrollValueLeft = $(this).attr("value")
    scrollValueLeft = parseInt(scrollValueLeft)
    let scrollValue = scrollValueLeft + 10;
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

