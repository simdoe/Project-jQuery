
$(document).ready(function() {
    requestApi();
    $('#choose_menu').on('change', () =>{
        var chooseOption = $('#choose_menu').val();
        getRecipe(chooseOption);
        $('#nbGuests').show();
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
    })
});

// Create arow function for plus number 
var plusNumber = (plus) => {
    let convertToplusNumber = parseInt(plus) + 1;
    $('input').val(convertToplusNumber);
}

// Create arow function for minusNumber
var minusNumber = (minus) =>{
    let convertTominusNumber = parseInt(minus) -1;
    $('input').val(convertTominusNumber);
}
// Create arow function result 

// =============================================

var updateEachIngredients = (update, guest) => {
    
    
    let ingredients = "";
    update.forEach(item => {
        console.log(item.nbGuests);
        let resultCalculator = item.quantity * parseInt(guest)  / item.nbGuests;
        
        ingredients += `
            <tr>
                <td><img src="${item.iconUrl}" class="img-fluid" width = "100"></td>   
                <td>${item.resultCalculator}</td>   
                <td>${item.unit[0]}</td>   
                <td>${item.name}</td>   
            </tr>
    `;
    $('#ingredient').html(ingredients);

    })
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

// for loop recipe for get name and img
$('#nbGuests').hide();
function getRecipe(recipe) {
    apiData.forEach(element => {
        // eachRecipe(element.name, element.iconUrl);
        if(element.id == recipe){
            eachRecipe(element.name, element.iconUrl);
            eachingredients(element.ingredients);
            eachinstructions(element.instructions);
            $('#input').val(element.nbGuests);  
        }
    })
   
}
function updateRecipe(recipe,guest) {
    apiData.forEach(element => {
        // eachRecipe(element.name, element.iconUrl);
        if(element.id == recipe){
            eachRecipe(element.name, element.iconUrl);
            updateEachIngredients(element.ingredients,guest);
            eachinstructions(element.instructions);
            $('#input').val(element.nbGuests);  
        }
    })
   
}
// output eachRecipe to html
var eachRecipe = (name, img) => {
    let recipe = "";
    recipe+= `
        ${name} &nbsp; &nbsp;<img src="${img}" width="100" class="img-fluid">
    `;
    $('#recipe').html(recipe);
}

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
// this function create for loop instruction and to html
var eachinstructions = (step) => {
    // console.log(step);
    var instruction = "";
    var cutStep = step.split('<step>');
    // console.log(cutStep);
    for(let i = 1; i < cutStep.length; i++ ){
        instruction+= `
            <tr>
                <td> 
                    <strong  class="text-primary">Step ${i} </strong>: <br>  &nbsp;   &nbsp;  &nbsp; ${cutStep[i]}
                </td>
            </tr>
        `;
    }
    $('#instructions').html(instruction);
}
