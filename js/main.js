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
	const scrollLink   = document.querySelectorAll('.scroll-link');

	for(let i = 0; i < scrollLink.length; i++){
		scrollLink[i].addEventListener('click', e => {
			e.preventDefault();
			const id = scrollLink[i].getAttribute('href');
			document.querySelector('#body').scrollIntoView({
				behavior: 'smooth', 
				block: 'start',
			})
		})
	}
})()

//-----------------------------------------------scroll smooth
