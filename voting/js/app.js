"use strict";

window.gig.voteCount = 10;

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

				if (window.gig.selectedBand.availability[date]) {
					newVenue.votes = window.gig.selectedBand.venueVotes[date][venue.name] || 0;
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

	$('#bandsList').html(Mustache.render($('#bandButtonTemplate').html(), {bands: window.gig.bands})).button();

	$('#bandsList button').click(function () {
		var $this = $(this);
		window.gig.selectedBandIndex = $('#bandsList button').index($this);
		window.gig.selectedBand = window.gig.bands[window.gig.selectedBandIndex];

		$('#bandsList button').removeClass('active').eq(window.gig.selectedBandIndex).addClass('active');

		renderTable();

		// TODO: clip
		$('#venuesTitle').text('2. Vote for ' + window.gig.selectedBand.name);
	}).first().click();
});
