let hamburger = document.querySelector('.header__hamburger');
let popup = document.querySelector('.popup');

hamburger.addEventListener('click', (e) => {
	e.currentTarget.classList.toggle('is-active');
	popup.classList.toggle('is--active');
	document.body.classList.toggle('is-fixed')
})