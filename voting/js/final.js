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

		_.each(window.gig.venues, function (venue) {
			var newVenue = {};

			var usedBands = {};

			if (venue.availability[date] && Math.random() < 0.85) {
				newVenue.available = true;

				var bandIndex = Math.floor(Math.random() * window.gig.bands.length);
				while (_.contains(usedBands, bandIndex)) {
					bandIndex = Math.floor(Math.random() * window.gig.bands.length);
				}
				newVenue.bandName = window.gig.bands[bandIndex].name;
				usedBands[newVenue.bandName] = true;
				console.log("band = ", newVenue.bandName);

				if (Math.random() < 0.2) {
					newVenue.won = true;
				}
			}

			newDate.venues.push(newVenue);
		});

		tableData.dates.push(newDate);
	});

	console.log(tableData);

	var table = $('#venuesTable');
	var renderedHtml = Mustache.render($('#venuesTableTemplate').html(), tableData);
	table.html(renderedHtml);

	var tableHeader = $('#venuesTableHeaderContainer');
	var renderedHtml = Mustache.render($('#venuesTableHeaderTemplate').html(), tableData);
	tableHeader.html(renderedHtml);

	$('.vote').click(function () {
		var $this = $(this);

		if (window.gig.voteCount > 0) {
			var cell = $this.closest('td');

			var votes = cell.find('.votes');
			votes.text(parseInt(votes.text(), 10) + 1);

			window.gig.voteCount--;
			$('#voteCount').text(window.gig.voteCount + " votes left");

			if (window.gig.voteCount <= 0) {
				var buyButton = $('<button class="btn btn-primary">Buy More Votes</button>');

				buyButton.click(function () {
					window.gig.voteCount += 10;
					$('#voteCount').text(window.gig.voteCount + " votes left");
				});

				$('#voteCount').append(' ').append(buyButton);
			}
		}
	});
};

$(document).ready(function () {
	console.log("start app");

	renderTable();
});
