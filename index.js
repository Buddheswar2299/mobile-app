const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')
const addCart = document.getElementById('add-cart')


import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = 
    {
        databaseURL : 'https://playground-b97e6-default-rtdb.firebaseio.com/'
    }

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingList = ref(database,"items")
console.log(database)

onValue(shoppingList,function(snapshot){
    if(snapshot.exists()){
    const booksArray = Object.entries(snapshot.val())
    console.log(booksArray)

    clearPreviousItems()
    for(let i=0; i<booksArray.length; i++){
        console.log(booksArray[i])

        let currentItem = booksArray[i]
        // let currentItemID = currentItem[0]
        // let currentItemValue = currentItem[1]
    appendItemsToFireBase(currentItem)

    }
    }else{

        ulEl.textContent = "No items... Yet!"
    }
})




addCart.addEventListener('click',function(){

    console.log(inputEl.value)
    push(shoppingList,inputEl.value)
    inputEl.value = ' '

    // appendItemsToFireBase(inputEl.value)
})

function clearPreviousItems(){
    ulEl.innerHTML = " "
}
function appendItemsToFireBase(itemValue){
    // ulEl.innerHTML += `<li>${itemValue}</li>`
    // console.log(itemValue)
    let currentItemID = itemValue[0]
    let currentItemValue = itemValue[1]
    let newEl = document.createElement('li')
    newEl.textContent = currentItemValue
    
    newEl.addEventListener('click',()=>{
        let locationfromDatabase = ref(database,`items/${currentItemID}`)

        remove(locationfromDatabase)

    
    })
    ulEl.append(newEl)

}

