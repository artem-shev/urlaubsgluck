'use strict';
document.createElement('picture');

class Model {
	constructor ({sliders, partners, menus, DOM, ajaxSet}) {
		let self = this;

		self.sliders = sliders;
		self.partners = partners;
		self.menus = menus;
		self.DOM = DOM;
		self.ajaxSet = ajaxSet;
	}
}

class View {
	constructor (model) {
		let self = this;
		self.model = model;
		self.tmpl = model.DOM.templates;
		self.UI = model.DOM.UI;

		self.init();
	}

	init() {
		let self = this;
		self.renderTmpl(self.tmpl.partners, self.model.partners);
		self.renderTmpl(self.tmpl.sliders, self.model.sliders);
		self.renderTmpl(self.tmpl.menus, self.model.menus);

		self.sliderInit(self.model.DOM.UI.flickity.wrapper);
		self.isotopeInit(self.UI.isotope);
	}

	renderTmpl(tmpl, data, toStr) {
		let output = $(tmpl.output);
		let template = tmpl.tmpl;
		let context = {data};
		if(!toStr) {
			return output.append(template(context));
		} else {
			return template(context);
		}
	}

	sliderInit(el) {
		$(el).flickity({
			wrapAround: true,
			autoPlay: 1500,
			imagesLoaded: true
		});
	}

	isotopeInit (elems) {
		let wrapper = $(elems.wrapper);

		wrapper.isotope({
			itemSelector: elems.item,
			percentPosition: true,
			masonry: {
				columnWidth: elems.sizer
			}
		});
	}

	isotopeEdit (elems, data) {
		let self = this;
		let wrapper = $(elems.wrapper);
		let oldItems = $(elems.item);

		oldItems.remove();

		let items = $(self.renderTmpl(self.tmpl.activities, data, true)).filter('.activity__item');

		wrapper.isotope('insert', items);
		items.imagefill();
	}
}

class Controller {
	constructor (model, view) {
		let self = this;
		self.model = model;
		self.view = view;
		self.settings = model.ajaxSet;
		self.el = {
			searchInp: $(model.DOM.controlls.searchInp),
			searchSubmit: $(model.DOM.controlls.searchSubmit)
		};
		self.searchActivities(self.settings.url);
		self.el.searchSubmit.on('click', (e) => {
			e.preventDefault();
			self.searchActivities(self.settings.url);
		});
	}

	searchActivities (urlSet) {
		let self = this;
		let base = urlSet;
		let request = encodeURIComponent(self.el.searchInp.val() || 'holiday activity');
		let url = `${base}${request}`;
		let isotope = self.model.DOM.UI.isotope;

		$.ajax({
			method: 'GET',
			url: url,
			dataType: 'jsonp',
			success: pbSuccess
		});

		function pbSuccess (data) {
			self.model.searchRes = data.hits.slice(0, 9);
			self.view.isotopeEdit(isotope, self.model.searchRes);
		}
	}
}

$(function() {
	let model = new Model(data);
	let view = new View (model);
	let ctrl = new Controller(model, view);
});
