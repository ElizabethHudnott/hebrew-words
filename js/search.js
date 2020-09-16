'use strict';

const ALEPH	= 0;
const VET	= 1;
const BET	= 2;
const GIMEL	= 3;
const DALET	= 4;
const HE	= 5;
const VAV	= 6;
const ZAYIN	= 7;
const CHET	= 8;
const TET	= 9;
const YOD	= 10;
const KHAF	= 11;
const KAF	= 12
const KHAF_SOFIT = 13;
const KAF_SOFIT  = 14;
const LAMED	= 15;
const MEM	= 16;
const MEM_SOFIT	= 17;
const NUN	= 18;
const NUN_SOFIT	= 19;
const SAMEKH	= 20;
const AYIN	= 21;
const FEI	= 22;
const PEI	= 23
const FEI_SOFIT	= 24;
const TSADI	= 25;
const TSADI_SOFIT = 26;
const QOF	= 27;
const REISH	= 28;
const SIN_OR_SHIN = 29;
const SIN_DOT = 30
const SIN = 31;
const SHIN_DOT = 32;
const SHIN = 33;
const TAV	= 34;
const TAV_WITH_DAGESH = 35;
const DAGESH = 36;
const PUNCTUATION = 99;
const VOWEL_MARK= 200;
const PATACH	= 210;
const STOLEN_PATACH = 110;
const AI		= 111;
const CHATAF_PATACH = 211;
const KAMATZ	= 220;
const KAMATZ_HE	= 121;
const KAMATZ_YOD_VAV = 122;
const SEGOL		= 230;
const SEGOL_YOD	= 130;
const CHATAF_SEGOL = 231;
const TSERE		= 240;
const TSERE_YOD	= 140;
const HIRIQ		= 250;
const HIRIQ_YOD	= 150;
const KAMATZ_KATAN = 260;
const CHATAF_KAMATZ= 261;
const CHOLAM	= 270;
const CHOLAM_VAV= 170;
const OI		= 171;
const KUBUTZ	= 280;
const SHURUK	= 180;
const UI		= 181;
const SHVA		= 290;
const INITIAL_SHVA = 190;
const FINAL_SHVA = 191;
const HE_MATER = 198;
const ALEPH_MATER = 199;

const symbolMap = new Map();
symbolMap.set('א', ALEPH);
symbolMap.set('ב', VET);
symbolMap.set('ג', GIMEL);
symbolMap.set('ד', DALET);
symbolMap.set('ה', HE);
symbolMap.set('ו', VAV);
symbolMap.set('ז', ZAYIN);
symbolMap.set('ח', CHET);
symbolMap.set('ט', TET);
symbolMap.set('י', YOD);
symbolMap.set('כ', KHAF);
symbolMap.set('ך', KHAF_SOFIT);
symbolMap.set('ל', LAMED);
symbolMap.set('מ', MEM);
symbolMap.set('ם', MEM_SOFIT);
symbolMap.set('נ', NUN);
symbolMap.set('ן', NUN_SOFIT);
symbolMap.set('ס', SAMEKH);
symbolMap.set('ע', AYIN);
symbolMap.set('פ', FEI);
symbolMap.set('ף', FEI_SOFIT);
symbolMap.set('צ', TSADI);
symbolMap.set('ץ', TSADI_SOFIT);
symbolMap.set('ק', QOF);
symbolMap.set('ר', REISH);
symbolMap.set('ש', SIN_OR_SHIN);
symbolMap.set("ׂ", SIN_DOT);
symbolMap.set("ׁ", SHIN_DOT);
symbolMap.set('ת', TAV);
symbolMap.set('ּ', DAGESH);
symbolMap.set('ַ', PATACH);
symbolMap.set('ָ', KAMATZ);
symbolMap.set('ֶ', SEGOL);
symbolMap.set('ֵ', TSERE);
symbolMap.set('ִ', HIRIQ);
symbolMap.set('ׇ', KAMATZ_KATAN);
symbolMap.set('ֹ',  CHOLAM);
symbolMap.set('ֺ',  CHOLAM);
symbolMap.set('ֻ', KUBUTZ);
symbolMap.set('ְ',  SHVA);
symbolMap.set('ֲ', CHATAF_PATACH);
symbolMap.set('ֱ', CHATAF_SEGOL);
symbolMap.set('ֳ', CHATAF_KAMATZ);
symbolMap.set(' ', PUNCTUATION);
symbolMap.set(',', PUNCTUATION);
symbolMap.set('.', PUNCTUATION);
symbolMap.set('?', PUNCTUATION);
symbolMap.set('”', PUNCTUATION);
//symbolMap.set('', );

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

function isVowel(symbol) {
	return symbol > VOWEL_MARK;
}

function parseWord(word) {
	const chars = word.normalize('NFD').split('');
	let  letters = [];
	let newLetters = [];
	// Translates characters to numeric codes.
	for (let i = 0; i < chars.length; i++) {
		const code = symbolMap.get(chars[i]);
		if (code !== undefined) {
			letters.push(code);
		}
	}
	// Place dagesh before vowel and shin or sin dot before its vowel.
	let i = 0;
	while (i < letters.length - 2) {
		const thisLetter = letters[i];
		const nextLetter = letters[i + 1];
		const nextIsVowel = isVowel(nextLetter);
		const nextNext = letters[i + 2];
		if (nextIsVowel) {
			if (nextNext === DAGESH) {
				const nextNextNext = letters[i + 3];
				if (nextNextNext === SIN_DOT || nextNextNext === SHIN_DOT) {
					// SIN_OR_SHIN, VOWEL, DAGESH, SIN_DOT/SHIN_DOT
					newLetters.push(nextNextNext + 1, DAGESH, nextLetter);
					i += 4;
				} else {
					// Letter, VOWEL, DAGESH
					newLetters.push(thisLetter, DAGESH, nextLetter);
					i += 3;
				}
			} else if (nextNext === SIN_DOT || nextNext === SHIN_DOT) {
				// SIN_OR_SHIN, VOWEL, SIN_DOT/SHIN_DOT
				newLetters.push(nextNext + 1, nextLetter);
				i += 3;
			} else {
				// Letter, VOWEL, something
				newLetters.push(thisLetter, nextLetter);
				i += 2;
			}
		} else if (nextNext === SIN_DOT && next === DAGESH) {
			// SIN_OR_SHIN, DAGESH, SIN_DOT
			newLetters.push(SIN, DAGESH, CHOLAM);
		} else {
			newLetters.push(thisLetter);
			i++;
		}
	}
	for (; i < letters.length; i++) {
		newLetters.push(letters[i]);
	}
	letters = newLetters;
	
	// Combine dagesh with vet to make bet, etc.
	newLetters = [];
	i = 0;
	while (i < letters.length - 1) {
		const thisLetter = letters[i];
		const nextLetter = letters[i + 1];
		const nextNext = letters[i + 2];
		const nextNextIsVowel = isVowel(nextNext);

		if (nextLetter === DAGESH &&
			(thisLetter === VET || thisLetter === KHAF || thisLetter === KHAF_SOFIT || thisLetter === FEI || thisLetter === TAV )
		) {
			// Bet, Kaf, Kaf Sofit, Pei, Tav with dagesh
			newLetters.push(thisLetter + 1);
			i += 2;
		} else if (thisLetter === VAV && nextLetter === CHOLAM) {
			// Cholam Vav
			newLetters.push(CHOLAM_VAV);
			i += 2;
		} else if (thisLetter === VAV && nextLetter === DAGESH && !nextNextIsVowel) {
			// Shuruk
			newLetters.push(SHURUK);
			i += 2;				
		} else if (nextLetter === SIN_DOT || nextLetter === SHIN_DOT) {
			// Sin and Shin
			newLetters.push(nextLetter + 1);
			i += 2;
		} else if (thisLetter === SHVA && newLetters.length === 1) {
			// Initial Sh'va
			newLetters.push(INITIAL_SHVA);
			i++;
		} else {
			// TODO handle cholam implied by shin
			newLetters.push(thisLetter);
			i++;
		}
	}
	if (i === letters.length - 1) {
		newLetters.push(letters[letters.length - 1]);
	}
	const numLetters = newLetters.length;
	const finalLetter = newLetters[numLetters - 1];
	const penultimate = newLetters[numLetters - 2];
	if (finalLetter === PATACH) {
		// Stolen Patach
		if (penultimate === CHET) {
			newLetters[numLetters - 1] = CHET;
			newLetters[numLetters - 2] = STOLEN_PATACH;
		} else if (penultimate === DAGESH && newLetter[numLetters - 3] === HE) {
			newLetters[numLetters - 1] = DAGESH;
			newLetters[numLetters - 2] = HE;
			newLetters[numLetters - 3] = STOLEN_PATACH;
		}
	} else if (finalLetter === HE && penultimate === KAMATZ) {
		// Final Kamatz He
		newLetters[numLetters - 2] = KAMATZ_HE;
		newLetters.splice(numLetters - 1, 1);
	} else if (finalLetter === SHVA) {
		// Final Sh'va
		newLetters[numLetters - 1] = FINAL_SHVA;
	}
	letters = newLetters;
	return letters;
}

class Word {
	constructor(hebrewText, translation) {
		this.hebrewText = hebrewText;
		this.parseResult = parseWord(hebrewText);
		this.translation = translation;
	}

	toString() {
		return this.hebrewText;
	}
}

let words = [];
const permitted = new Set();
permitted.add(PUNCTUATION);
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
