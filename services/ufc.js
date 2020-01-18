const request = require('request');
const cheerio = require('cheerio');

function getRankings(fighter) {
	return new Promise(function (resolve, reject) {
		const options = {
			url: `https://www.ufc.com/rankings`,
			method: 'GET'
		}
		request(options, function (error, response, body) {
			if (error) {
				reject(error);
			} else {
				const $ = cheerio.load(body);
				const divisions = [];
				$('.view-grouping').each(function(i, elem) {
					fighters = [];
					const name = $('.view-grouping-header', elem).text().trim();

					// Get champion
					const champ = $('.rankings--athlete--champion h5 a', elem);
					fighters[0] = {
						name: champ.text().trim(),
						link: champ.attr('href')
					}
					// Get rest of rankings
					$('td.views-field-title', elem).each(function(i, fighterElem) {
						fighters[i + 1] = {
							name: $('a', fighterElem).text().trim(),
							link: $('a', fighterElem).attr('href')
						}
					});
					divisions[i] = {
						name: name,
						fighters: fighters
					};
				});
				resolve(divisions)
			}
		});
	});
}

function getFighter(fighter) {
	return new Promise(function (resolve, reject) {
		console.log('URL: ' + `https://www.ufc.com${fighter}`);
		const options = {
			url: `https://www.ufc.com/athlete/${fighter}`,
			method: 'GET'
		}
		request(options, function (error, response, body) {
			if (error) {
				reject(error);
			} else {
				const $ = cheerio.load(body);
				const fighter = {};
				fighter.name = $('.field-name-name', '.c-hero__header').text().trim();
				fighter.image = $('.c-bio__image').find('img').attr('src');
				fighter.total = $('.c-hero__headline-suffix').first().text().split('•')[1].trim();
				fighter.stats = [];
				$('.c-overlap-athlete-detail__card').each(function(i, elem) {
					var figure = $('.e-chart-circle__percent', elem).text().trim();
					var text = $('.c-overlap--stats__title', elem).text().trim();
					if(figure && text) {
						fighter.stats[i] = {
							figure: figure,
							text: text
						}
					}
				});
				fighter.bio = [];
				$('.c-bio__field', '.c-bio__row--3col').each(function(i, elem) {
					var figure = $('.c-bio__text', elem).text().trim();
					var text = $('.c-bio__label', elem).text().trim();
					if(figure && text) {
						fighter.bio[i] = {
							figure: figure,
							text: text
						}
					}
				});
				fighter.record = [];
				$('.c-record__promoted','.l-listing__group').each(function(i, elem) {
					var figure = $('.c-record__promoted-figure', elem).text().trim();
					var text = $('.c-record__promoted-text', elem).text().trim();
					if(figure && text) {
						fighter.record[i] = {
							figure: figure,
							text: text
						}
					}
				});
				fighter.history = [];
				$('.l-listing__item','.view-athlete-results').each(function(i, elem) {
					var event = $('.c-card-event--athlete-results__logo h2', elem).text().trim();
					var name = $('.c-card-event--athlete-results__headline', elem).text().trim();
					var date = $('.c-card-event--athlete-results__date .datetime', elem).text().trim();

					// Who won?
					var winPosition = undefined;
					$('.c-card-event--athlete-results__matchup > div', elem).each(function(i, elem){
						var state = $('.c-card-event--athlete-results__plaque.win', elem).text().trim();;
						if (state == 'Win') winPosition = i; 
					});
					// We now know position of winner, 0 or 1
					// Now we need to know position of our fighter
					var lastName = fighter.name.split(' ')[1];
					var fighterPositions = name.split(' vs ');
					var figherIndex = fighterPositions.indexOf(lastName);
					// If the positions match, it's a win
					var result = (figherIndex === winPosition) ? 'Win' : 'Loss';

					if (event && date) {
						fighter.history[i] = {
							event: event,
							name: name,
							date: date,
							result: result
						}
					}
					// Fight stats
					var stats = [];
					var date = $('.c-card-event--athlete-results__results .c-card-event--athlete-results__result', elem).each(function(i, elem){
						var label = $('.c-card-event--athlete-results__result-label', elem).text().trim();
						var text = $('.c-card-event--athlete-results__result-text', elem).text().trim();
						if (label && text) {
							stats[i] = {
								label: label,
								text: text
							}
						}
					});
					fighter.history[i].stats = stats;
				});
				resolve(fighter)
			}
		});
	});
}

module.exports = {
	getRankings,
	getFighter
}