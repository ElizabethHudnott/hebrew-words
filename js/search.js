'use strict'

/**	Mappings between characters that need to be escaped in HTML code (to prevent cross-site
	scripting attacks) and their corresponding escape sequences, i.e. HTML character entities.
	@readonly
*/
const ESCAPE_MAP = Object.freeze({
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
});

/**	Escapes a string so that any HTML code contained within it is converted into plain
	text.
	@param {(string|undefined)} input The text to make safe.
*/
function escapeHTML(input) {
	'use strict';
	if (input !== undefined) {
		return String(input).replace(/[&<>"']/g, function (match) {
			return ESCAPE_MAP[match];
		});
	} else {
		return input;
	}
}

class Word {
	constructor(hebrewText, translation) {
		this.hebrewText = hebrewText;
		this.parseResult = parseHebrew(hebrewText);
		this.translation = translation;
	}

	toString() {
		return this.hebrewText;
	}
}

let words = [];
const permitted = new Set();
permitted.add(SPACE);
permitted.add(COMMA);
permitted.add(FULL_STOP);
permitted.add(QUESTION_MARK);
const required = new Set();
let filteredWords = [];
let selectedWords = [];

function parseFile(content) {
	words = [];
	const lineFormat = /^([\u05b0-\u05f4,.!?"]+)?(?:\t+(.*))?\n/muy;
	let match;
	while ((match = lineFormat.exec(content)) !== null) {
		if (match[1] !== undefined) {
			const newWord = new Word(match[1], match[2]);
			words.push(newWord);
		}
	}
}

const fileReader = new FileReader();
fileReader.onload = function (event) {
	parseFile(this.result);
};

document.getElementById('words-filename').addEventListener('input', function (event) {
	const file = this.files[0];
	if (file) {
		fileReader.readAsText(file);
	}
});

function addAll(set, values) {
	for (let value of values) {
		set.add(parseInt(value));
	}
}

function deleteAll(set, values) {
	for (let value of values) {
		set.delete(parseInt(value));
	}	
}

{
	const allConsonantsButton = document.getElementById('btn-all-consonants');
	const tristateButtons = document.querySelectorAll('button[data-toggle=tristate-button]');
	const numConsonants = 32;
	let numConsonantsSelected = 0;

	function tristateToggle() {
		const currentValue = this.getAttribute('aria-pressed');
		const classList = this.classList;
		const symbols = this.dataset.symbols.split(' ');
		const firstSymbol = parseInt(symbols[0]);

		switch (currentValue) {
		case 'false':
			this.setAttribute('aria-pressed', 'mixed');
			classList.add('bg-permitted');
			addAll(permitted, symbols);
			filterWords();
			if (firstSymbol <= TAV_WITH_DAGESH) {
				numConsonantsSelected++;
				if (numConsonantsSelected === numConsonants) {
					allConsonantsButton.setAttribute('aria-pressed', 'true');
					allConsonantsButton.classList.add('bg-permitted');
				}
			} else if (firstSymbol === KAMATZ_KATAN) {
				document.getElementById('kamatz-katan-controls').classList.add('show');
			}
			break;
		case 'mixed':
			this.setAttribute('aria-pressed', 'true');
			classList.remove('bg-permitted');
			classList.add('bg-required');
			addAll(required, symbols);
			filterWords();
			break;
		default: 
			this.setAttribute('aria-pressed', 'false');
			classList.remove('bg-required');
			deleteAll(permitted, symbols);
			deleteAll(required, symbols);
			filterWords();
			if (firstSymbol <= TAV_WITH_DAGESH) {
				numConsonantsSelected--;
				allConsonantsButton.setAttribute('aria-pressed', 'false');
				allConsonantsButton.classList.remove('bg-permitted');
			} else if (firstSymbol === KAMATZ_KATAN) {
				document.getElementById('kamatz-katan-controls').classList.remove('show');
			}
		}
	}

	for (let button of tristateButtons) {
		button.addEventListener('click', tristateToggle);
	}

	allConsonantsButton.addEventListener('click', function (event) {
		if (numConsonantsSelected === numConsonants) {
			// Disable all
			for (let button of tristateButtons) {
				const symbols = button.dataset.symbols.split(' ');
				if (parseInt(symbols[0]) <= DAGESH) {
					button.setAttribute('aria-pressed', 'false');
					button.classList.remove('bg-permitted', 'bg-required');
					deleteAll(permitted, symbols);
					deleteAll(required, symbols);
				}
			}
			numConsonantsSelected = 0;
			this.setAttribute('aria-pressed', 'false');
			this.classList.remove('bg-permitted');
			filteredWords = [];
			selectedWords = [];
			showResults();
		} else {
			// Enable all
			for (let button of tristateButtons) {
				const symbols = button.dataset.symbols.split(' ');
				const pressed = button.getAttribute('aria-pressed');
				if (parseInt(symbols[0]) <= TAV_WITH_DAGESH && pressed === 'false') {
					button.setAttribute('aria-pressed', 'mixed');
					button.classList.add('bg-permitted');
					addAll(permitted, symbols);
				}
			}
			numConsonantsSelected = numConsonants;
			this.setAttribute('aria-pressed', 'true');
			this.classList.add('bg-permitted');
			filterWords();
		}
	});
}

function filterWords() {
	filteredWords = [];
	for (let word of words) {
		let hasRequired = required.size === 0;
		let okay = true;
		for (let symbol of word.parseResult) {
			if (!permitted.has(symbol)) {
				okay = false;
				break;
			} else if (!hasRequired && required.has(symbol)) {
				hasRequired = true;
			}
		}
		if (okay && hasRequired) {
			filteredWords.push(word);
		}
	}
	selectWords();
}

function selectWords() {
	const numMatching = filteredWords.length;
	let numToSelect = parseInt(document.getElementById('num-selected-words').value);
	if (!(numToSelect > 0) || numToSelect > numMatching) {
		numToSelect = numMatching;
	}
	for (let i = 0; i < numToSelect; i++) {
		const numAvailable = numMatching - i;
		const index = Math.floor(Math.random() * numAvailable) + i;
		const temp = filteredWords[i];
		filteredWords[i] = filteredWords[index];
		filteredWords[index] = temp;
	}
	selectedWords = filteredWords.slice(0, numToSelect);
	showResults();
}

document.getElementById('num-selected-words').addEventListener('input', selectWords);
document.getElementById('btn-select-words').addEventListener('click', selectWords);

const resultsTable = document.getElementById('results');

function showResults() {
	resultsTable.innerHTML = '';
	const hideKamatzKatan = !document.getElementById('show-kamatz-katan').checked;
	const kamatzKatanRE = /ׇ/g
	for (let word of selectedWords) {
		const row = document.createElement('tr');
		const hebrewCell = document.createElement('td');
		hebrewCell.lang = 'he';
		hebrewCell.classList.add('align-middle');
		let wordText = word.hebrewText;
		if (hideKamatzKatan) {
			wordText = wordText.replace(kamatzKatanRE, 'ָ');
		}
		hebrewCell.innerHTML = wordText;
		row.appendChild(hebrewCell);
		if (word.translation !== undefined) {
			const translationCell = document.createElement('td');
			translationCell.classList.add('align-middle');
			translationCell.innerHTML = escapeHTML(word.translation);
			row.appendChild(translationCell);
		}
		resultsTable.appendChild(row);
	}
	document.getElementById('num-words-shown').innerHTML = selectedWords.length;
	document.getElementById('num-words-matched').innerHTML = filteredWords.length;
}

document.getElementById('show-kamatz-katan').addEventListener('input', showResults);

function downloadWords(url) {
	const alertDiv = document.getElementById('word-source-alert');
	alertDiv.classList.remove('show');

	const escapedURL = escapeHTML(url);
	const escapedURL2 = url.replace(/[/.]/g, '\\$&');
	const option = document.getElementById('words-url').querySelector(`[value=${escapedURL2}]`);
	let title;
	if (option === null) {
		title = escapedURL + ' ';
	} else {
		title = option.innerHTML.trim();
	}

	const request = new XMLHttpRequest();
	request.open('GET', url);
	request.timeout = 60000;

	function alertFailure(message) {
		alertDiv.classList.remove('alert-success');
		const escapedMessage = escapeHTML(message);
		alertDiv.innerHTML = `Failure. Unable to download <a href="${escapedURL}" target="_blank" class="alert-link">${escapedURL}</a> \ud83d\ude22 ${escapedMessage}`;
		alertDiv.classList.add('alert-danger', 'show');		
	}

	request.addEventListener('load', function (event) {
		if (request.status < 400) {
			parseFile(request.response);
			const numWords = words.length;
			alertDiv.classList.remove('alert-danger');
			alertDiv.innerHTML = `Success! Loaded ${numWords} words from <a href="${escapedURL}" target="_blank" class="alert-link">${title}</a>.`;
			alertDiv.classList.add('alert-success', 'show');
		} else {
			alertFailure(request.status + ' - ' + request.statusText);
		}
	});
	
	request.addEventListener('error', function (event) {
		alertFailure('Network Error.');
	});

	request.addEventListener('timeout', function (event) {
		alertFailure('Timeout.');
	});

	request.send();
}

downloadWords('words/beginners-wordlist.txt');
