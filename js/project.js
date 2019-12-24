

// Stating js file 
$(document).ready(function() {

    requestApi();
    $('#choose_menu').on('change', () =>{
        var chooseOption = $('#choose_menu').val(); // get value from selection
        getRecipe(chooseOption);
        $('#nbGuests').show();
        $(' #ingredient').show();
        $('#instructions').show();
        $('#recipe').show();
        $('#hideBorder').show();
    })

    // add number person of plus number
    $('#plusNumber').on('click', () => {
        var plus = $('input').val();
        plusNumber(plus); 
        let newGuest = $('input').val();
        var chooseOption = $('#choose_menu').val();
        updateRecipe(chooseOption, newGuest);
        
    })

    // add number person of minus number
    $('#minusNumber').on('click', () => {
        var minus = $('input').val();
        minusNumber(minus);
        let newGuest = $('input').val();
        var chooseOption = $('#choose_menu').val();
        updateRecipe(chooseOption, newGuest);
    })
});

// Create arow function for plus number 
var plusNumber = (plus) => {
    let convertToplusNumber = parseInt(plus) + 1;
    if(convertToplusNumber <= 15){
        $('input').val(convertToplusNumber);
    }
}

// Create arow function for minusNumber
var minusNumber = (minus) =>{
    let convertTominusNumber = parseInt(minus) -1;
    if(convertTominusNumber >= 0){
        $('input').val(convertTominusNumber);
    }
}


// create function for get url
function requestApi() {
    $.ajax({
        dataType: "json",
        url:getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("can't get url"),
    });
}


// create function for get url
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

// create function for choose option recipe from url
var apiData = [];
function chooseRecipe(recipe){
    apiData = recipe;
    var option = "";
    recipe.forEach(item => {
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $('#choose_menu').append(option);
}

// This place store all hide from html
$('#nbGuests').hide();
$(' #ingredient').hide();
$('#instructions').hide();
$('#recipe').hide();
$('#hideBorder').hide();

//=========================================
// Create this varible store oldNbGuest
var oldNbGuest;
// Create function for getRecipe by id 
function getRecipe(recipe) {
    apiData.forEach(element => {
        if(element.id == recipe){
            eachRecipe(element.name, element.iconUrl);
            eachingredients(element.ingredients);
            eachinstructions(element.instructions);
            $('#input').val(element.nbGuests);  
            oldNbGuest = $('#input').val();
        }
    })
}

// ========================================
// update on the Recipe 
function updateRecipe(recipe,guest) {
    apiData.forEach(element => {
        // eachRecipe(element.name, element.iconUrl);
        if(element.id == recipe){
            eachRecipe(element.name, element.iconUrl);
            updateEachIngredients(element.ingredients,guest);
            eachinstructions(element.instructions);
            $('#input').val(guest);  
        }
    })
}

// output eachRecipe to html
var eachRecipe = (name, img) => {
    let recipe = "";
    recipe+= `
        <div class="card shadow" style="border: 5px solid pink">
            <div class="card-header"><img src="${img}" class="rounded-circle" width="10%"> &nbsp; &nbsp;${name}</div>
            <div class="card-body"><img src="${img}" class="img-thumbnail" width="40%"> &nbsp; &nbsp;</div>
        </div>   
    `;
    $('#recipe').html(recipe);
}

// this function create for loop instruction and to html
var eachinstructions = (step) => {
    var instruction = "";
    var cutStep = step.split('<step>');
    // console.log(cutStep);
    for(let i = 1; i < cutStep.length; i++ ){
        instruction+= `
        <div class ="mt-5" style="color: rgb(250, 151, 220)">
        <strong  class="text-primary">Step ${i} :</strong> <br>  &nbsp;   &nbsp;  &nbsp; ${cutStep[i]}
    </div>
        `;
    }
    $('#instructions').html(instruction);
}

// ================================================
// this function for loop eachingredients to html
var eachingredients = (igd) => {
    let ingredients = "";
    igd.forEach(item => {
        ingredients += `
            <tr>
                <td><img src="${item.iconUrl}" class="img-fluid" width = "100"></td>   
                <td>${item.quantity}</td>   
                <td>${item.unit[0]}</td>   
                <td>${item.name}</td>   
            </tr>
    `;
    $('#ingredient').html(ingredients);

    })
}


// update on the EachIngredients 
var updateEachIngredients = (update, guest) => {
    let ingredients = "";
    update.forEach(item => {
        // console.log(item.nbGuests);
        let resultCalculator = item.quantity * parseInt(guest)  / oldNbGuest;
        ingredients += `
            <tr>
                <td><img src="${item.iconUrl}" class="img-fluid" width = "100"></td>   
                <td>${resultCalculator}</td>   
                <td>${item.unit[0]}</td>   
                <td>${item.name}</td>   
            </tr>
    `;
    $('#ingredient').html(ingredients);

    })
}

