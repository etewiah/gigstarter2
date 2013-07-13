"use strict";

var renderTable = function () {
	// contains both band and venue data
	var tableData = {
		venueNames: [],
		dates: []
	};

	_.each(window.gig.venues, function (venue) {
		tableData.venueNames.push({
			name: venue.name
		});
	});

	_.each(window.gig.dates, function (date) {
		var newDate = {
			date: {
				year: date.getFullYear(),
				month: date.getMonth(),
				date: date.getDate()
			},
			venues: []
		};

		if (window.gig.selectedBand.availability[date]) {
			newDate.bandAvailable = true;
		}
		_.each(window.gig.venues, function (venue) {
			var newVenue = {};

			if (venue.availability[date]) {
				newVenue.available = true;
				newVenue.bands = venue.bands[date];
			}

			newDate.venues.push(newVenue);
		});

		tableData.dates.push(newDate);
	});

	console.log(tableData);

	var table = $('#venuesTable');
	var renderedHtml = Mustache.render($('#venuesTableTemplate').html(), tableData);

	table.html(renderedHtml);
};

$(document).ready(function () {
	console.log("start app");

	$('#bandsList').html(Mustache.render($('#bandButtonTemplate').html(), {bands: window.gig.bands})).button();

	$('#bandsList button').click(function () {
		var $this = $(this);
		window.gig.selectedBandIndex = $('#bandsList button').index($this);
		window.gig.selectedBand = window.gig.bands[window.gig.selectedBandIndex];

		renderTable();

		// TODO: clip
		$('#venuesTitle').text('Schedule for ' + window.gig.selectedBand.name);
	}).first().click();
});
