/*
 * This file doesn't contain any JS because this assignment is released before
 * the due date of the previous assignment, so I don't want to give you the
 * solution to that assignment yet ;)  You'll know this file was served
 * correctly if you see the alert below in your browser.  Alternatively, you
 * can add your own solution code from the previous assignment here in order
 * to see all of the client-side JS interactions you implemented.
 */

alert('Client-side JS was successfully loaded.');
 //This is for the creat button
var creat = document.querySelector('#modal-accept');
creat.addEventListener('click', newItem);



// This function will filter out everything the user entered when clicking on updateButton

var updateButton = document.querySelector('.action-button');
updateButton.addEventListener('click', 
    function(event){
        var filterText = document.getElementById("filter-text").value;
        var min = document.getElementById("filter-min-price").value;
        var max = document.getElementById("filter-max-price").value;
        var addToFilter = document.getElementById("filter-city").value;
        filterPost(filterText, min, max, addToFilter, getCheckedBox('filter-condition'));
    }

);

 var poSection = [];
 window.onload = function() {
     var pageItem = document.getElementsByClassName('post');
     for(i = 0; i < pageItem.length; i++) {
         poSection.push(pageItem[i]);
     }
     collectpoSection();
 }

 // this function will collect all poSection in the page

 function collectpoSection() {
     var afterAll = [];
     var pageItem = document.getElementsByClassName('post');
     for(i = 0; i < pageItem.length; i++) {
         afterAll.push(pageItem[i]);
         }
         return afterAll;
 }

 /*This function will return all post back to page*/
 function returnPost(){
     for(i = 0; i < poSection.length; i++){
         document.getElementById('posts').appendChild(poSection[i]);
     }
 }

 /*This function will remove the post*/
 function removeItem(myArray,index) {
     document.getElementById('posts').removeChild(myArray[index]);
     return true;
 }

/* This function will take care of the price when user enter min or max */
function postPrice(minimumP,maximumP, myArray) {
    var price = null;
    for(var i = 0; i < myArray.length; i++) {
        price = parseInt(myArray[i].getAttribute('data-price'));
        if(!isNaN(maximumP) && isNaN(minimumP)) {
            if(price > maximumP) {
                removeItem(myArray, i);
            }
        } else if (!isNaN(minimumP) && isNaN(maximumP)){
            if(price < minimumP){
                removeItem(myArray,i);
            }
        }else if(!isNaN(minimumP) && !isNaN(maximumP)) {
            if(price > maximumP || price < minimumP) {
                removeItem(myArray,i);
            }
        }
    }
}

/*This function will allow the user to specify the condition of the item*/
function postCondition(filter,myArray){
    itemStatus = null;
    for(var i = 0; i < myArray.length; i++){
        itemStatus = myArray[i].getAttribute("data-condition");
        if(filter.length > 0 && !filter.includes(itemStatus)){
            removeItem(myArray, i);
        }
    }
}

/* This function will allow the user to search for a specific text */
function setTextFilter(input,myArray) {
    text = null;
    if(input.trim() != "") {
        input = input.toLowerCase().trim().split(" ");
        for(var i=0; i < myArray.length; i++){
            text = myArray[i].textContent.toLowerCase().trim().split(" ");
            for(var j=0; j < text.length; j++){
                if(input.includes(text[j])){
                    break;
                }else if(j+1 == text.length && !input.includes(text[j]) ){
                    removeItem(myArray,i);
                }
            }
        }

    }
}

/* This function will allow the user to search by city */

function searchByCity(user_input, myArray){
    city= null;
    for(var i = 0; i < myArray.length; i++){
        city = myArray[i].getAttribute("data-city");
        if(user_input != "" && user_input != city){
            removeItem(myArray,i);
        }
    }
}

/* This function is for the conditions of the items */
function getCheckedBox(fieldset){
    var EnteredValue = [];
    var EnteredElements = document.getElementsByName(fieldset);
    for(var i = 0; i < 5; ++i){
        if(EnteredElements[i].checked == true){
            EnteredValue.push(EnteredElements[i].value);
        }
    }
    return EnteredValue;
}

/* This function contain all filters */
function filterPost(enteredText, minimum, maximum, enteredCity, checkedItems){
    returnPost();
    setTextFilter(enteredText, collectpoSection());
    postPrice(parseInt(minimum), parseInt(maximum), collectpoSection());
    searchByCity(enteredCity, collectpoSection());
    postCondition(checkedItems, collectpoSection());
}

//This function will allow the user to close the modal.
function exitWindow() {
    //set all enteredData to empty again
    document.getElementById("post-text-input").value = "";
    document.getElementById("post-photo-input").value = "";
    document.getElementById("post-price-input").value = "";
    document.getElementById("post-city-input").value = "";
    document.getElementById("post-condition-new").checked = true;
    document.getElementById("sell-something-modal").classList.add('hidden');
    document.getElementById("modal-backdrop").classList.add('hidden');
}

//this is for close button
var closeButton = document.querySelector('#modal-close');
closeButton.addEventListener('click', exitWindow);
var closeButton = document.querySelector('#modal-cancel');
closeButton.addEventListener('click', exitWindow);

//This function will check if the user did not enter all the info.
function userInput() {
    var enteredData = document.querySelectorAll('.modal-body input')
    for(i = 0; i < 4; i++){
        if(enteredData[i].value == ""){
            alert("Please Enter all the Information");
            return false;
        }
    }
    return true;
}

//This function will add the city entered by the user to the city list
function postCity(newCity){
    var addToFilter = document.getElementById("filter-city");
    var newList = addToFilter.length;
    for(i = 0; i < newList; i++){
        if (i+1 == newList){
            addToFilter.options.add(new Option(newCity, newCity));
        }
    }
}

// This function used for creating a new item
function newItem(){
    var post = document.createElement('div');
    post.classList.add('post');
    var input = document.getElementById("post-text-input").value;
    var price = document.getElementById("post-price-input").value;
    var city = document.getElementById("post-city-input").value;
    var img_src = document.getElementById("post-photo-input").value;
    post.setAttribute("data-price", price);
    post.setAttribute("data-city", city);
    post.setAttribute("data-condition", getCheckedBox('post-condition'));
    var addDivForItem = document.createElement('div');
    addDivForItem.classList.add('post-pageItems');
    post.appendChild(addDivForItem);
    var container = document.createElement('div');
    container.classList.add('post-image-container');
    addDivForItem.appendChild(container);
    item_photo = document.createElement('img');
    item_photo.setAttribute("src", img_src);
    item_photo.setAttribute("alt", input);
    container.appendChild(item_photo);
    var postInfo = document.createElement('div');
    postInfo.classList.add('post-info-container');
    addDivForItem.appendChild(postInfo);
    var description = document.createElement('a');
    description.setAttribute("href", "#");
    description.classList.add('post-title');
    description.textContent = input;
    postInfo.appendChild(description);
    var priceDescription = document.createElement('span');
    priceDescription.classList.add('post-price');
    priceDescription.textContent = price;
    postInfo.appendChild(priceDescription);
    var cityDescription = document.createElement('span');
    cityDescription.classList.add('post-city');
    cityDescription.textContent = "(" + city + ")";
    postInfo.appendChild(cityDescription);

    if(userInput()) {
        document.getElementById('posts').appendChild(post);
        postCity(city);
        poSection.push(post);
        exitWindow();
    }
}


//when the add butten is pressed
var add = document.querySelector('#sell-something-button');
add.addEventListener('click', function(){
    document.getElementById("sell-something-modal").classList.remove('hidden');
    document.getElementById("modal-backdrop").classList.remove('hidden');
});





