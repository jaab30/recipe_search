

$(".submitForm").on("click", event => {
    event.preventDefault()
    let imageFormReplacement;
    if ($(".imageForm").val() === "") {
        imageFormReplacement = "https://www.eatright.org/-/media/eatrightimages/food/nutrition/vegetarianandspecialdiets/foodsourcesof5importantnutrientsforvegetarians.jpg"

    } else {
        imageFormReplacement = $(".imageForm").val()
    }

    let formValid = true;
    // checking if form filled
    if ($(".userForm").val().trim() === "" || $(".emailForm").val().trim() === "" || $(".nameForm").val().trim() === "" || $(".servingsForm").val().trim() === "" || $(".ingredientsForm").val().trim() === "" || $(".instructionsForm").val().trim() === "") {
        formValid = false;
    }

    if (formValid) {
                
        const newFormRecipe = {
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
        }).then(() => {
                $(".alertStatus").empty()
                $(".alertStatus").append(`<p class="submitMessage">Thanks for submitting your recipe... You should be able to view it at our <a href="/home">Home</a> page</p>`)
                $(".userForm").val("");
                $(".emailForm").val("");
                $(".nameForm").val("");
                $(".servingsForm").val("")
                $(".ingredientsForm").val("");
                $(".instructionsForm").val("")
            }
        );
    } else {
        $(".alertStatus").empty()
        $(".alertStatus").append(`<p class="submitMessage">Please fill out all fields before submitting!</p>`)
    }

})