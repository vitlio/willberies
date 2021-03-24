const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

const sliderButtonNext = document.querySelector('.slider-button-next');
const buttonCart       = document.querySelector('.button-cart');
const modalCart  	   = document.getElementById('modal-cart');
const modalClose 	   = document.querySelector('.modal-close');
const modal     	   = document.querySelector('.modal');
const overlay  		   = document.querySelector('.overlay');

setTimeout(function d(){sliderButtonNext.click(); setTimeout(d, 3000)}, 3000);

const openModal  = function() {
	modalCart.classList.add('show');
};
const closeModal = function() {
	modalCart.classList.remove('show');
 };

buttonCart.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
	if(!e.target.closest('.modal')) closeModal();
});
//-----------------------------------------------scroll smooth

(function(){
	const scrollLinks   = document.querySelectorAll('.scroll-link');

	for(let scrollLink of scrollLinks){
		scrollLink.addEventListener('click', e => {
			e.preventDefault();
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth', 
				block: 'start',
			})
		})
	}
})()

//-----------------------------------------------scroll smooth
//-----------------------------------------------render goods

const more 			 = document.querySelector('.more');
const navigationLink = document.querySelectorAll('.navigation-link');
const longGoodsList  = document.querySelector('.long-goods-list');
const logoLink = document.querySelector('.container');

const getData  = async function() {
	let result = await fetch('../db/db.json')
		.then(response => {
			if(!response.ok){
				console.error('Ошибочка: ' + response.status)
			}
			return response;})
		return await result.json();
}

const renderCard  = function(obj){
	const card     = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
	card.innerHTML = `
			<div class="goods-card">
				${obj.label ? `<span class="label">New</span>` : ''}
				
				<img src="db/${obj.img}" alt="${obj.name}" class="goods-image">
				<h3 class="goods-title">${obj.name}</h3>
				<p class="goods-description">${obj.description}</p>
				<button class="button goods-card-btn add-to-cart" data-id="${obj.id}">
					<span class="button-price">$${obj.price}</span>
				</button>
			</div>
	`;
	return card;
}

const addCards = function(data){
	document.body.classList.add('show-goods');
	longGoodsList.textContent = '';
	let cards = data.map(renderCard);
	longGoodsList.append(...cards);
}

more.addEventListener('click', event => {
	event.preventDefault();
	getData().then(addCards);
	const logoLink = document.querySelector('.container');
	setTimeout(() => logoLink.scrollIntoView({
				behavior: 'smooth', 
				block: 'start',
			}), 500)
});

//-----------------------------------------------render goods
//-----------------------------------------------filter goods

const filterCards = function(field, value){
	getData()
	.then(data => data.filter(d => d[field].toLowerCase() === value.toLowerCase()))
	.then(addCards);	
}


navigationLink.forEach(btn => {
	const field = btn.dataset.field;
	const value = btn.innerText;	
	btn.addEventListener('click', e => {
		e.preventDefault();
		if(field && value){	
			filterCards(field, value)
		} else {
			getData().then(addCards);
		}
	})
})
	
//-----------------------------------------------filter goods
//-----------------------------------------------banners event

const buttons = document.querySelectorAll('.button');

buttons.forEach(btn => {
	btn.addEventListener('click', e => {		

		e.preventDefault();
		if(e.target.closest('.card-1')){
			filterCards("category", "Accessories");
		}
		if(e.target.closest('.card-2')){
			filterCards("category", "Clothing");
		}
		logoLink.scrollIntoView({
			behavior: 'smooth', 
			block: 'start',
		})
	})

})


