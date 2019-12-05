var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready( () => {
    $('#choose_menu').on('change', () => {
        var recipes = $('#choose_menu').val();
        chooseRecipe(recipes);
    } );
});

// get api [arrow function]
var getAPI = (api) => {
    $.ajax({
        dataType: 'json',
        url: api,
        success: (data) => getRecipes(data),
        error: () => console.error("Cannot request data")
    });
}

// get all recipe [name function]
function getRecipes(datas) {
    datas.recipes.forEach( recs => {
       // your recipe can get here example: recs.name
        getIngrediant(recs); // get all ingrediant
    });
}

// get all ingrediant [name function]
function getIngrediant(recipe) {
    recipe.ingredients.forEach(ing => {
        showIngrediantTable(ing);
    })
}

// display ingrediant in table [arrow function]
var showIngrediantTable = (element) => {
    var ingrediant = "";
    ingrediant += `
        <tr>
            
            <td><img src="${element.iconUrl}" width="100" class="img-fluid"></td>
            <td>${element.quantity}</td>
            <td>${element.unit[0]}</td>
            <td>${element.name}</td>
        </tr>
    `;
    $('#result').append(ingrediant);
}

// choose recipe from select [arrow function]
var chooseRecipe = (myRecipe) => {
    var onlyNumber = parseInt(myRecipe);
    switch(onlyNumber) {
        case 0:
            getAPI(url);
            hideAlert();
            break;
        case 1:
            // your code idea...
            showOne();
            break;
        case 2:
            // your code idea...
            showTwo();
            break;
        default: console.warn("You choose nothing");
    }
} 
