const clientId = document.querySelector('#clientId')
const userForm = document.querySelector('#userForm')
const foodsForm = document.querySelector('#foodsForm')
const foodsCount = document.querySelector('#foodsCount')
const userHeader = document.querySelector('#userHeader')
const ordersList = document.querySelector('.orders-list')
const foodsSelect = document.querySelector('#foodsSelect')
const usernameInput = document.querySelector('#usernameInput')
const customersList = document.querySelector('.customers-list')
const telephoneInput = document.querySelector('#telephoneInput')


function renderOrders (orders) {
	ordersList.innerHTML = null
	for(let order of orders) {
		const [ li, img, div, count, name ] = createElements('li', 'img', 'div', 'span', 'span')
		const food = foods.find(el => el.foodId == order.foodId)
		
		count.textContent = order.count
		name.textContent = food.foodName

		li.classList.add('order-item')
		name.classList.add('order-name')
		count.classList.add('order-count')

		img.src = food.foodImg
		
		div.append(name, count)
		li.append(img, div)
		ordersList.append(li)
	}
}


async function renderUsers (users) {
	customersList.innerHTML = null

	for(let user of users) {
		const [ li, span, a ] = createElements('li', 'span', 'a')

		span.textContent = user.username
		a.textContent = '+' + user.contact

		span.classList.add('customer-name')
		li.classList.add('customer-item')
		a.classList.add('customer-phone')

		a.setAttribute('href', 'tel:+' + user.contact)

		li.append(span, a)
		customersList.append(li)

		li.onclick = () => {
			const filteredOrders = orders.filter(el => el.userId == user.userId)
			renderOrders(filteredOrders)

			clientId.textContent = user.userId
			userHeader.textContent = user.username
			window.localStorage.setItem('userId', user.userId)
			window.localStorage.setItem('username', user.username)
		}
	}
}


function renderFoods (foods) {
	for(let food of foods) {
		const [ option ] = createElements('option')
		option.textContent = food.foodName
		option.value = food.foodId

		foodsSelect.append(option)
	}
}

function getFirstOrders () {
	const userId = window.localStorage.getItem('userId')
	const username = window.localStorage.getItem('username')
	const filteredOrders = orders.filter(el => el.userId == userId)

	clientId.textContent = userId
	userHeader.textContent = username

	return filteredOrders
}

userForm.onsubmit = event => {
	event.preventDefault()
	const username = usernameInput.value.trim()
	const contact = telephoneInput.value.trim()

	if(!(username.length < 30 && username.length)) {
		return alert('Wrong username')
	}

	if(!(/^998[389][012345789][0-9]{7}$/).test(contact)) {
		return alert('Invalid contact!')
	}

	users.push({
		userId: users.length ? +users.at(-1).userId + 1 : 1,
		username,
		contact
	})
	window.localStorage.setItem('users', JSON.stringify(users))

	usernameInput.value = null
	telephoneInput.value = null

	renderUsers(users)
}

foodsForm.onsubmit = event => {
	event.preventDefault()

	if(!foodsSelect.value) return
	if(!clientId.textContent) return
	if(!foodsCount.value || foodsCount.value > 10) return

	let order = orders.find(el => el.foodId == foodsSelect.value && el.userId == clientId.textContent) 
	
	if(order) {
		order.count = +order.count + +foodsCount.value
	} else {
		orders.push({
			userId: clientId.textContent,
			foodId: foodsSelect.value,
			count: foodsCount.value
		})
	}

	window.localStorage.setItem('orders', JSON.stringify(orders))

	foodsSelect.value = 1
	foodsCount.value = null

	renderOrders(getFirstOrders())
}

renderFoods(foods)
renderUsers(users)
renderOrders(getFirstOrders())