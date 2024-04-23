// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js'
// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Storing the firebase URL
const appSettings = {
    databaseURL: "https://shopping-cart-e11f4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items") // create a reference and naming it as items

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(itemsInDB, inputValue)
    clearInputField()
})

onValue(itemsInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i=0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]
            appendShoppingList(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML = "No items here...yet"
    }
})

function clearInputField(){
    inputFieldEl.value = ""
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function appendShoppingList(item){
    //shoppingListEl.innerHTML += `<li>${inputValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)

    // To remove the element when it is double clicked
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
}

