import data from './data.js'

const itemsContainer = document.querySelector('#items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById ('cart-qty')
const cartTotal = document.getElementById ('cart-total')
itemList.innerHTML = '<li> Hello World</li>'

//console.log(itemList)

for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	// put new div inside items container
	itemsContainer.appendChild(newDiv)

	// create a paragraph element for a description
	const desc = document.createElement('P')
	// give the paragraph text from the data
	desc.innerText = data[i].desc
	// append the paragraph to the div
	newDiv.appendChild(desc)

	// do the same thing for price
	const price = document.createElement('P')
	price.innerText = data[i].price
	newDiv.appendChild(price)

	// Make a button 
	const button = document.createElement('button')
	// add an  id name to the button
	button.id = data[i].name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)
}



const cart = [ ]



//Add Items ----------------------------------------
function addItem(name, price){
	for (let i =0; i < cart.length; i +=1 ){
		if (cart[i].name === name) {
			cart[i].qty += 1
			return
		}
	}
	const item = {name, price, qty:1}
	cart.push(item); 
}

//Show Items -------------------------------------------------------------
function showItems(){

	const qty = getQty()
	const total = getTotal ()
	cartQty.innerHTML = `You have ${qty} items in your cart`
	//console.log(`You have ${qty} items in your cart`)

	let itemStr = ''
	for (let i = 0; i < cart.length; i+=1){
		//console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
		
		
		const { name, price, qty } = cart[i]
		
		itemStr += `<li> 
		${name} $${price} x ${qty} = $ ${qty * price}</li>`  
	}

	
	itemList.innerHTML = itemStr

	cartTotal.innerHTML = `Total in cart: $${total}`
	//console.log(`Total in cart: $${total}`)

// Get Total -------------------------------------------------
	function getTotal(){
		let total = 0 
		for (let i =0;  i < cart.length; i +=1) {
			total += cart[i].price * cart[i].qty
		}
		return total.toFixed(2)
    }

}

//Get Qty ------------------------------------------------------

function getQty() {
	let qty = 0
	for (let i =0 ; i < cart.length; i += 1) {
		qty += cart[i].qty 
	}
	return qty 
}

//Remove Item -------------------
function removeItem(name, qty = 0){
	for (let i = 0; i < cart.length; i += 1 ){
		if (cart[i].name === name) {
			if (qty > 0 ){
				cart[i].qty -= 1
			}
			if (cart[i].qty < 1 || qty === 0) {
				cart.splice(i, 1)
			
			}
			return
		}
	}

}





//Test code ----------------------------------
addItem('Sad', 0.99);
addItem('Happy', 1.99);
addItem('Angry', 3.99);
addItem('Tired', 4.59); 
addItem('Angry', 3.99); 

//Calling Items ------------------------------

showItems(); 

removeItem('Angry', 1); 
removeItem('Tired'); 


showItems(); 














