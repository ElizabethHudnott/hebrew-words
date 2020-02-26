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
const HE_MATER = 4;
const ALEPH_MATER = 5;
const PATACH	= 210;
const STOLEN_PATACH = 110;
const AI		= 111;
const CHATAF_PATACH = 211;
const KAMATZ	= 220;
const KAMATZ_YOD_VAV = 121;
const KAMATZ_HE	= 124;
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
symbolMap.set('ֲ', CHATAF_PATACH);
symbolMap.set('ֱ', CHATAF_SEGOL);
symbolMap.set('ֳ', CHATAF_KAMATZ);
symbolMap.set(' ', PUNCTUATION);
symbolMap.set(',', PUNCTUATION);
symbolMap.set('.', PUNCTUATION);
symbolMap.set('?', PUNCTUATION);
//symbolMap.set('', );

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
		const nextIsVowel = nextLetter > VOWEL_MARK;
		const nextNext = letters[i + 2];
		if (nextIsVowel) {
			if (nextNext === DAGESH) {
				const nextNextNext = letters[i + 3];
				if (nextNextNext === SIN_DOT || nextNextNext === SHIN_DOT) {
					// SIN_OR_SHIN, VOWEL, DAGESH, SIN_DOT/SHIN_DOT
					newLetters.push(nextNextNext + 1, DAGESH, nextLetter);
					i += 4;
				} else {
					newLetters.push(thisLetter, DAGESH, nextLetter);
					i += 3;
				}
			} else if (nextNext === SIN_DOT || nextNext === SHIN_DOT) {
				newLetters.push(nextNext + 1, nextLetter);
				i += 3;
			} else {
				newLetters.push(thisLetter, nextLetter);
				i += 2;
			}
		} else if (nextNext === SIN_DOT && next === DAGESH) {
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
		if (nextLetter === DAGESH &&
			(thisLetter === VET || thisLetter === KHAF || thisLetter === KHAF_SOFIT || thisLetter === FEI || thisLetter === TAV )
		) {
			newLetters.push(thisLetter + 1);
			i += 2;
		} else if (nextLetter === SIN_DOT || nextLetter === SHIN_DOT) {
			newLetters.push(thisLetter + 1);
			i += 2;
		} else {
			// TODO handle cholam implied by shin
			newLetters.push(thisLetter);
			i++;
		}
	}
	if (i === letters.length - 1) {
		newLetters.push(letters[letters.length - 1]);
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
	function tristateToggle() {
		const currentValue = this.getAttribute('aria-pressed');
		const classList = this.classList;
		const symbols = this.dataset.symbols.split(' ');

		switch (currentValue) {
		case 'false':
			this.setAttribute('aria-pressed', 'mixed');
			classList.add('bg-permitted');
			addAll(permitted, symbols);
			filterWords(words);
			break;
		case 'mixed':
			this.setAttribute('aria-pressed', 'true');
			classList.remove('bg-permitted');
			classList.add('bg-required');
			addAll(required, symbols);
			filterWords(words);
			break;
		default: 
			this.setAttribute('aria-pressed', 'false');
			classList.remove('bg-required');
			deleteAll(permitted, symbols);
			deleteAll(required, symbols);
			filterWords(filteredWords);
		}
	}

	const tristateButtons = document.querySelectorAll('button[data-toggle=tristate-button]');
	for (let button of tristateButtons) {
		button.addEventListener('click', tristateToggle);
	}
}

function filterWords(pool) {
	filteredWords = [];
	for (let word of pool) {
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
	selectedWords = filteredWords;
	showResults();
}

const resultsTable = document.getElementById('results');

function showResults() {
	resultsTable.innerText = '';
	for (let word of selectedWords) {
		const row = document.createElement('tr');
		const hebrewCell = document.createElement('td');
		hebrewCell.classList.add('hebrew');
		hebrewCell.innerText = word.hebrewText;
		row.appendChild(hebrewCell);
		if (word.translation !== undefined) {
			const translationCell = document.createElement('td');
			translationCell.innerText = word.translation;
			row.appendChild(translationCell);
		}
		resultsTable.appendChild(row);
	}
}

function downloadWords(url) {
	const escapedURL = url.replace(/[/.]/g, '\\$&');
	const option = document.getElementById('words-url').querySelector(`[value=${escapedURL}]`);
	const title = option === null ? url : option.innerText.trim();
	const alertDiv = document.getElementById('word-source-alert');

	const request = new XMLHttpRequest();
	request.open('GET', url);
	request.timeout = 60000;

	request.addEventListener('load', function (event) {
		if (request.status < 400) {
			parseFile(request.response);
			alertDiv.classList.remove('alert-danger');
			alertDiv.innerText = `Success! Loaded ${title}.`;
			alertDiv.classList.add('alert-success', 'show');
		} else {
			
		}
	});
	
	request.addEventListener('error', function (event) {
		
	});

	request.addEventListener('timeout', function (event) {
		
	});

	request.send();
}

downloadWords('words/beginners-wordlist.txt');
