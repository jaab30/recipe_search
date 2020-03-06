    $.ajax({
        url: "/api/getdatabase/" + userId,
        type: "GET",
    })
    // show contents from database myrecipes
    .then( res => {
        for (let i = 0; i < res.length; i++) {
            let content = `
                <div class='dbImgDiv'>
                    <p class="dbName" dta-name="${res[i].recipe_name}">${res[i].recipe_name}</p>
                    <img class="dbImg" src=${res[i].recipe_image} alt="Recipe Img">
                </div>
                <div class='dbDetailsDiv'>
                    <p>${res[i].recipe_health_label}</p>
                    <p>Servings / Calories: ${Math.round(res[i].recipe_calories / res[i].recipe_servings)}</p>
                    <p>Servings: ${res[i].recipe_servings}</p>
                    <p>Health Advisory: ${res[i].recipe_other_label}</p>
                    <p>Ingredients: ${res[i].recipe_ingredients}</p>
                    <a href=${res[i].recipe_cookingInst} target="_blank"> Cooking Instructions</a>
                    <p><i class="fas fa-trash-alt dbTrash" data-id=${res[i].id}></i></p>
                </div>
            `
            $(".myRecipeListResults").append(content)
        }
    });

    $(document).on("click", ".dbTrash", function () {
        const id = $(this).data("id");
        $.ajax("/api/myrecipes/" + id, {
            type: "DELETE",
            data: id
        }).then( () =>location.reload() )    
    });

    const featuredRecipeBtn = (category, poster, title) => {
        window.location.href = '#pagetop'
            $(".searchResultsList").empty()
            $(".searchRecipeDetailsDiv").empty()
            $(".h2main").empty()
            $(".h2main").html(`<h2>Low Carb ${title} Recipes</h2>`)
            $(".scroll-left").empty()
            $(".scroll-right").empty()

            queryURL = `https://api.edamam.com/search?q=${category}&app_id=bf1e3672&app_key=28596a3e346300619e46cf85bbebc6e3&from=0&to=10&diet=low-carb&time=1-10`

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(res => {

                let content = `
                <div class='featImgTempDiv'>
                    <img class="featImgTemp" src="/img/${poster}.jpg" alt="Recipe Img">
                </div>
                `
                $(".searchRecipeDetailsDiv").append(content)

                response = res
                displayResults(0);
            })
    }

    $(".feature1link").on("click", () => featuredRecipeBtn("vegan", "poster2A", "Vegan"))
    $(".feature2link").on("click", () => featuredRecipeBtn("seafood", "poster3A", "Seafood"))
    $(".feature3link").on("click", () => featuredRecipeBtn("cookie", "poster1A", "Dessert"))