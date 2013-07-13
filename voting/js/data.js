"use strict";

(function () {
	window.gig = window.gig || {};
	
	var venueNames = [
		'La Riviera',
		'Circo Price',
		'La Casa Encendida',
		'Sala Caracol',
		'La Boca del Lobo'
	];

	var bandNames = [
		'Hydrogen Of Sworn',
		'Step-brother Of Kinky',
		'Battery Adventure',
		'Thick Grunge',
		'Tangled Rebuttonef',
		'During Playground',
		'With Blanket',
		'Coarse Specimen And The Tortoise',
		'Pass Of Locomotive',
		'Lifting Of The Away',
		'Techno Innocent',
		'Thirst Of The Salty Clown',
		'Across West',
		'Manic Usher',
		'Juice Off Blockade',
		'Vinyl Cube',
		'Chafing Drunk',
		'Battery-powered Short',
		'Titan Of Generator',
		'Shooting Prostate And The Hypno - Slash',
	];

	window.gig.dates = _.map(_.range(1, 32), function (date) {
		return new Date(2013, 7, date, 4);
	});

	window.gig.venues = [];

	var populateAvailability = function (item, business) {
		_.each(window.gig.dates, function (date) {
			var dayBonus = 0;
			if (date.getDay() === 5 || date.getDay() === 6) {
				dayBonus = 0.3;
			}

			if (Math.random() < business + dayBonus) {
				item.availability[date] = true;
			}
		});
	};

	_.each(venueNames, function (venueName) {
		var venue = {
			name: venueName,
			availability: {},
			bands: {}
		};

		populateAvailability(venue, Math.random() * 0.8);

		_.each(venue.availability, function (value, date) {
			if (value) {
				venue.bands[date] = {
					total: 0
				};
				if (Math.random() < 0.5) {
					venue.bands[date] = {
						total: Math.round(Math.random() * 5)
					}
				}
			}
		});

		window.gig.venues.push(venue);
	});

	// populate bands with random data
	window.gig.bands = [];

	_.each(bandNames, function (bandName) {
		var band = {
			name: bandName,
			availability: {}
		};
		populateAvailability(band, Math.random() * 0.8);

		var amountPopulated = 10;

		_.each(band.availability, function (available, date) {
			var possibleVenues = [];

			_.each(window.gig.venues, function (venue) {
			});
		});

		window.gig.bands.push(band);
	});

}());
