import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/swiper-bundle.min.css';

Swiper.use([Navigation, Pagination, Scrollbar]);

(function pageSlider() {
	const teamProps = {
		// loop: true,
		// initialSlide: 1,
		spaceBetween: 10,
		slidesPerView: 1,
		// centeredSlides: true,
		centeredSlidesBounds: true,
		scrollbar: {
			el: '.team__scrollbar',
			dragClass: 'team__drag',
			draggable: true,
			dragSize: 85,
		},
		navigation: {
			nextEl: '.team__next',
			prevEl: '.team__prev',
		},
		breakpoints: {
			600: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 2,
				scrollbar: {
					dragSize: 150,
				},
			},
			1024: {
				slidesPerView: 3,
				centeredSlides: false
			},
			1366: {
				slidesPerView: 4,
				spaceBetween: 20,

				scrollbar: {
					dragSize: 230,
				},
			},
		},
	};

	let teamSlider = new Swiper('#team-slider0', teamProps);

	const choose = document.querySelector('.team__choose');
	if (!choose) return;

	choose.addEventListener('click', (e) => {
		for (let select of choose.children) {
			select.classList.remove('is--active');
		}
		let activeSelect = e.target.closest('.team__select');

		for (let slider of document.querySelectorAll('.team__slider')) {
			slider.classList.remove('is--active');
			if (activeSelect.dataset.id == slider.dataset.id) {
				slider.classList.add('is--active');
				teamSlider = new Swiper(`#team-slider${slider.dataset.id}`, teamProps);
			}
		}

		activeSelect.classList.toggle('is--active');
	});
})();
