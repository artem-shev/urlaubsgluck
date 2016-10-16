'use strict';

let data = {};

data.sliders = [
	[
		{
			name: 'step 1',
			title: 'Sed leo enim, condimentum',
			text: 'Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.',
			img: {
				small: 'img/slides/slide1_s.png',
				medium: 'img/slides/slide1_m.png',
				large: 'img/slides/slide1_l.png'
			},
			url: '#'
		},
		{
			name: 'step 2',
			title: 'Morbi velit risus',
			text: 'Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.',
			img: {
				small: 'img/slides/slide2_s.png',
				medium: 'img/slides/slide2_m.png',
				large: 'img/slides/slide2_l.png'
			},
			url: '#'
		},
		{
			name: 'step 3',
			title: 'Sed leo enim, condimentum',
			text: 'Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.',
			img: {
				small: 'img/slides/slide3_s.png',
				medium: 'img/slides/slide3_m.png',
				large: 'img/slides/slide3_l.png'
			},
			url: '#'
		}
	],
	[
		{
			name: 'step 2',
			title: 'Morbi velit risus',
			text: 'Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.',
			img: {
				small: 'img/slides/slide2_s.png',
				medium: 'img/slides/slide2_m.png',
				large: 'img/slides/slide2_l.png'
			},
			url: '#'
		},
		{
			name: 'step 3',
			title: 'Sed leo enim, condimentum',
			text: 'Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.',
			img: {
				small: 'img/slides/slide3_s.png',
				medium: 'img/slides/slide3_m.png',
				large: 'img/slides/slide3_l.png'
			},
			url: '#'
		},
		{
			name: 'step 1',
			title: 'Sed leo enim, condimentum',
			text: 'Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.',
			img: {
				small: 'img/slides/slide1_s.png',
				medium: 'img/slides/slide1_m.png',
				large: 'img/slides/slide1_l.png'
			},
			url: '#'
		}
	],
	[
		{
			name: 'step 3',
			title: 'Sed leo enim, condimentum',
			text: 'Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.',
			img: {
				small: 'img/slides/slide3_s.png',
				medium: 'img/slides/slide3_m.png',
				large: 'img/slides/slide3_l.png'
			},
			url: '#'
		},
		{
			name: 'step 1',
			title: 'Sed leo enim, condimentum',
			text: 'Quisque libero libero, dictum non turpis in, luctus semper lorem. Donec rhoncus a leo sit amet facilisis.',
			img: {
				small: 'img/slides/slide1_s.png',
				medium: 'img/slides/slide1_m.png',
				large: 'img/slides/slide1_l.png'
			},
			url: '#'
		},
		{
			name: 'step 2',
			title: 'Morbi velit risus',
			text: 'Nulla venenatis tempor dui in molestie. Nulla quis dictum purus, sit amet porttitor est.',
			img: {
				small: 'img/slides/slide2_s.png',
				medium: 'img/slides/slide2_m.png',
				large: 'img/slides/slide2_l.png'
			},
			url: '#'
		}
	]
];

data.partners = [
	{
		name: 'Bradley Hunter',
		info: 'Based in Chicago. I love playing tennis and loud music.',
		link: '#',
		photo: 'img/ava1.png',
		favicon: 'icon icon--tv'
	},
	{
		name: 'Heather Walker',
		info: 'I\'m a happy person that loves cats and climbing on mountains.',
		link: '#',
		photo: 'img/ava2.png',
		favicon: 'icon icon--cup'
	},
	{
		name: 'Lucas Marsha',
		info: 'I get my inspiration from nature and objects around me. I have a passion to colours, typography and skateboards.',
		link: '#',
		photo: 'img/ava3.png',
		favicon: 'icon icon--tube'
	},
	{
		name: 'Bradley Hunter',
		info: 'Based in Chicago. I love playing tennis and loud music.',
		link: '#',
		photo: 'img/ava4.png',
		favicon: 'icon icon--plane'
	}
];

data.menus = [
	{
		title: {
			name: 'Company',
			url: '#'
		},
		items: [
			{
				name: 'About',
				url: '#'
			},
			{
				name: 'Contacts',
				url: '#'
			},
			{
				name: 'Press',
				url: '#'
			},
			{
				name: 'Blog',
				url: '#'
			},
		]
	},
	{
		title: {
			name: 'Partners',
			url: '#'
		}
	}
];

data.DOM = {
	templates: {
		sliders: {
			tmpl: MyApp.templates.slider,
			output: '.slider-container'
		},
		partners: {
			tmpl: MyApp.templates.partners,
			output: '.partners-container'
		},
		menus: {
			tmpl: MyApp.templates.menu,
			output: '.menu-container'
		},
		activities: {
			tmpl: MyApp.templates.activity,
			output: '.activity-container'
		}
	},
	controlls: {
		searchInp: '.search__inp',
		searchSubmit: '.search__submit'
	},
	UI: {
		flickity: {
			wrapper: '.slider'
		},
		isotope: {
			wrapper: '.activity-container',
			item: '.activity__item',
			sizer: '.activity__sizer'
		}
	}
};

data.ajaxSet = {
	url: 'https://pixabay.com/api/?key=2839350-a74524d0719055d4aed581f18&q='
};
