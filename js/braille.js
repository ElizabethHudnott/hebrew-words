'use strict'

const brfInput = new Map();
brfInput.set('A', ALEPH);
brfInput.set('B', BET);
brfInput.set('V', VET);
brfInput.set('G', GIMEL);
brfInput.set('D', DALET);
brfInput.set('H', HE);
brfInput.set('W', VAV);
brfInput.set('Z', ZAYIN);
brfInput.set('X', CHET);
brfInput.set('T', TET);
brfInput.set('J', YOD);
brfInput.set('K', KAF);
brfInput.set('*', KHAF);
brfInput.set('L', LAMED);
brfInput.set('M', MEM);
brfInput.set('N', NUN);
brfInput.set('S', SAMEKH);
brfInput.set('$', AYIN);
brfInput.set('P', PEI);
brfInput.set('F', FEI);
brfInput.set('!', TSADI);
brfInput.set('Q', QOF);
brfInput.set('R', REISH);
brfInput.set('%', SHIN);
brfInput.set(':', SIN);
brfInput.set('\\', TAV_WITH_DAGESH);
brfInput.set('?', TAV);
brfInput.set('<', KAMATZ);
brfInput.set('C', PATACH);
brfInput.set('E', SEGOL);
brfInput.set('I', HIRIQ);
brfInput.set('/', TSERE);
brfInput.set('O', CHOLAM);
brfInput.set('[', CHOLAM_VAV);
brfInput.set('U', KUBUTZ);
brfInput.set('+', SHURUK);
brfInput.set('9', HIRIQ_YOD);
brfInput.set('#', TSERE_YOD);
brfInput.set('>', CHATAF_KAMATZ);
brfInput.set('3', CHATAF_PATACH);
brfInput.set('5', CHATAF_SEGOL);
brfInput.set(',', SHVA);
brfInput.set('"', DAGESH);
brfInput.set('-', MAQAF);
brfInput.set(' ', SPACE);
brfInput.set('1', COMMA);
brfInput.set('4', FULL_STOP);
brfInput.set('8', QUESTION_MARK);
brfInput.set('\n', NEW_LINE);

const singleBrailleChar = new Map();
const doubleBrailleChar = new Map();
singleBrailleChar.set('a', ALEPH);
doubleBrailleChar.set('ar', CHATAF_KAMATZ);
singleBrailleChar.set('b', BET);
singleBrailleChar.set('c', PATACH);
doubleBrailleChar.set('ch', KHAF);
singleBrailleChar.set('d', DALET);
singleBrailleChar.set('e', SEGOL);
doubleBrailleChar.set('ed', AYIN);
doubleBrailleChar.set('en', CHATAF_SEGOL);
singleBrailleChar.set('f', FEI);
singleBrailleChar.set('g', GIMEL);
doubleBrailleChar.set('gh', KAMATZ);
singleBrailleChar.set('h', HE);
singleBrailleChar.set('i', HIRIQ);
doubleBrailleChar.set('in', HIRIQ_YOD);
singleBrailleChar.set('k', KAF);
singleBrailleChar.set('j', YOD);
singleBrailleChar.set('l', LAMED);
singleBrailleChar.set('m', MEM);
singleBrailleChar.set('n', NUN);
singleBrailleChar.set('o', CHOLAM);
doubleBrailleChar.set('ou', TAV_WITH_DAGESH);
doubleBrailleChar.set('ow', CHOLAM_VAV);
singleBrailleChar.set('p', PEI);
singleBrailleChar.set('q', QOF);
singleBrailleChar.set('r', REISH);
singleBrailleChar.set('s', SAMEKH);
doubleBrailleChar.set('sh', SHIN);
doubleBrailleChar.set('st', TSERE);
singleBrailleChar.set('⁄', TSERE);	// in numeric mode
singleBrailleChar.set('t', TET);
doubleBrailleChar.set('th', TAV);
singleBrailleChar.set('u', KUBUTZ);
singleBrailleChar.set('v', VET);
singleBrailleChar.set('w', VAV);
singleBrailleChar.set('wh', SIN);
singleBrailleChar.set('x', CHET);
singleBrailleChar.set('z', ZAYIN);
singleBrailleChar.set(':', CHATAF_PATACH);
singleBrailleChar.set('-', MAQAF);
singleBrailleChar.set(' ', SPACE);
singleBrailleChar.set(',', COMMA);
singleBrailleChar.set('?', QUESTION_MARK);
singleBrailleChar.set('\n', NEW_LINE);
doubleBrailleChar.set('\n\n', PARAGRAPH);
//singleBrailleChar.set('', );

const SubstringPosition = Object.freeze({
	ANY: 0,
	INITIAL: 1,
	MIDDLE: 2,
	FINAL: 3,
	WHOLE_WORD: 4
});

class TextExpansion {
	constructor(replacements, position) {
		this.replacement = replacements;
		this.position = position || SubstringPosition.ANY;
	}
}

const longBrailleChar = new Map();
longBrailleChar.set('the', new TextExpansion([TSADI]));
longBrailleChar.set('ing', new TextExpansion([SHURUK]));
//longBrailleChar.set('', );

const heScriptOutput = new Map();
heScriptOutput.set(ALEPH, 'א');
heScriptOutput.set(VET, 'ב');
heScriptOutput.set(BET, 'בּ');
heScriptOutput.set(GIMEL, 'ג');
heScriptOutput.set(DALET, 'ד');
heScriptOutput.set(HE, 'ה');
heScriptOutput.set(VAV, 'ו');
heScriptOutput.set(ZAYIN, 'ז');
heScriptOutput.set(CHET, 'ח');
heScriptOutput.set(TET, 'ט');
heScriptOutput.set(YOD, 'י');
heScriptOutput.set(KHAF, 'כ');
heScriptOutput.set(KAF, 'כּ');
heScriptOutput.set(KHAF_SOFIT, 'ך');
heScriptOutput.set(KAF_SOFIT, 'ךּ');
heScriptOutput.set(LAMED, 'ל');
heScriptOutput.set(MEM, 'מ');
heScriptOutput.set(MEM_SOFIT, 'ם');
heScriptOutput.set(NUN, 'נ');
heScriptOutput.set(NUN_SOFIT, 'ן');
heScriptOutput.set(SAMEKH, 'ס');
heScriptOutput.set(AYIN, 'ע');
heScriptOutput.set(FEI, 'פ');
heScriptOutput.set(PEI, 'פּ');
heScriptOutput.set(FEI_SOFIT, 'ף');
heScriptOutput.set(TSADI, 'צ');
heScriptOutput.set(TSADI_SOFIT, 'ץ');
heScriptOutput.set(QOF, 'ק');
heScriptOutput.set(REISH, 'ר');
heScriptOutput.set(SIN, 'שׂ');
heScriptOutput.set(SHIN, 'שׁ');
heScriptOutput.set(TAV, 'ת');
heScriptOutput.set(TAV_WITH_DAGESH, 'תּ');
heScriptOutput.set(DAGESH, 'ּ');
heScriptOutput.set(MAQAF, '־');
heScriptOutput.set(SPACE, ' ');
heScriptOutput.set(COMMA, ',');
heScriptOutput.set(FULL_STOP, '.');
heScriptOutput.set(QUESTION_MARK, '?');
heScriptOutput.set(NEW_LINE, '\n');
heScriptOutput.set(PARAGRAPH, '\n\n');
heScriptOutput.set(PATACH, 'ַ');
heScriptOutput.set(STOLEN_PATACH, 'ַ');
heScriptOutput.set(CHATAF_PATACH, 'ֲ');
heScriptOutput.set(KAMATZ, 'ָ');
heScriptOutput.set(KAMATZ_HE, 'ָה');
heScriptOutput.set(KAMATZ_YOD_VAV, 'ָיו');
heScriptOutput.set(SEGOL, 'ֶ');
heScriptOutput.set(SEGOL_YOD, 'ֶי');
heScriptOutput.set(CHATAF_SEGOL, 'ֱ');
heScriptOutput.set(TSERE, 'ֵ');
heScriptOutput.set(TSERE_YOD, 'ֵי');
heScriptOutput.set(HIRIQ, 'ִ');
heScriptOutput.set(HIRIQ_YOD, 'ִי');
heScriptOutput.set(KAMATZ_KATAN, 'ׇ');
heScriptOutput.set(CHATAF_KAMATZ, 'ֳ');
heScriptOutput.set(CHOLAM, 'ֹ');
heScriptOutput.set(CHOLAM_VAV, 'וֹ');
heScriptOutput.set(KUBUTZ, 'ֻ');
heScriptOutput.set(SHURUK, 'וּ');
heScriptOutput.set(SHVA, 'ְ');
heScriptOutput.set(INITIAL_SHVA, 'ְ');
heScriptOutput.set(FINAL_SHVA, 'ְ');
heScriptOutput.set(HE_MATER, 'ה');
heScriptOutput.set(ALEPH_MATER, 'א');

const unicodeBraille = new Map();
unicodeBraille.set(ALEPH, '⠈');
unicodeBraille.set(VET, '⠧');
unicodeBraille.set(BET, '⠃');
unicodeBraille.set(GIMEL, '⠛');
unicodeBraille.set(DALET, '⠙');
unicodeBraille.set(HE, '⠓');
unicodeBraille.set(VAV, '⠺');
unicodeBraille.set(ZAYIN, '⠵');
unicodeBraille.set(CHET, '⠭');
unicodeBraille.set(TET, '⠞');
unicodeBraille.set(YOD, '⠚');
unicodeBraille.set(KHAF, '⠡');
unicodeBraille.set(KAF, '⠅');
unicodeBraille.set(KHAF_SOFIT, '⠡');
unicodeBraille.set(KAF_SOFIT, '⠅');
unicodeBraille.set(LAMED, '⠇');
unicodeBraille.set(MEM, '⠍');
unicodeBraille.set(MEM_SOFIT, '⠍');
unicodeBraille.set(NUN, '⠝');
unicodeBraille.set(NUN_SOFIT, '⠝');
unicodeBraille.set(SAMEKH, '⠎');
unicodeBraille.set(AYIN, '⠫');
unicodeBraille.set(FEI, '⠋');
unicodeBraille.set(PEI, '⠏');
unicodeBraille.set(FEI_SOFIT, '⠋');
unicodeBraille.set(TSADI, '⠮');
unicodeBraille.set(TSADI_SOFIT, '⠮');
unicodeBraille.set(QOF, '⠟');
unicodeBraille.set(REISH, '⠗');
unicodeBraille.set(SIN, '⠱');
unicodeBraille.set(SHIN, '⠩');
unicodeBraille.set(TAV, '⠹');
unicodeBraille.set(TAV_WITH_DAGESH, '⠳');
unicodeBraille.set(DAGESH, '⠐');
unicodeBraille.set(MAQAF, '⠤');
unicodeBraille.set(SPACE, ' ');
unicodeBraille.set(COMMA, '⠂');
unicodeBraille.set(FULL_STOP, '⠲');
unicodeBraille.set(QUESTION_MARK, '⠦');
unicodeBraille.set(NEW_LINE, '\n');
unicodeBraille.set(PARAGRAPH, '\n  ');
unicodeBraille.set(PATACH, '⠉');
unicodeBraille.set(STOLEN_PATACH, '⠉');
unicodeBraille.set(CHATAF_PATACH, '⠒');
unicodeBraille.set(KAMATZ, '⠣');
unicodeBraille.set(KAMATZ_HE, '⠣⠓');
unicodeBraille.set(KAMATZ_YOD_VAV, '⠣⠚⠺');
unicodeBraille.set(SEGOL, '⠑');
unicodeBraille.set(SEGOL_YOD, '⠑⠚');
unicodeBraille.set(CHATAF_SEGOL, '⠢');
unicodeBraille.set(TSERE, '⠌');
unicodeBraille.set(TSERE_YOD, '⠼');
unicodeBraille.set(HIRIQ, '⠊');
unicodeBraille.set(HIRIQ_YOD, '⠔');
unicodeBraille.set(KAMATZ_KATAN, '⠣');
unicodeBraille.set(CHATAF_KAMATZ, '⠜');
unicodeBraille.set(CHOLAM, '⠕');
unicodeBraille.set(CHOLAM_VAV, '⠪');
unicodeBraille.set(KUBUTZ, '⠥');
unicodeBraille.set(SHURUK, '⠬');
unicodeBraille.set(SHVA, '⠠');
unicodeBraille.set(INITIAL_SHVA, '⠠');
unicodeBraille.set(FINAL_SHVA, '⠠');
unicodeBraille.set(HE_MATER, '⠓');
unicodeBraille.set(ALEPH_MATER, '⠈');
//unicodeBraille.set();

const parsers = new Map();
parsers.set('sighted', parseHebrew);
parsers.set('brf', parseBRF);
parsers.set('heb-in-en', parseHebrewInEnglish);
const producers = new Map();
producers.set('sighted', toSighted);
producers.set('dots', toUnicodeGlyphs);
let inputType = 'sighted';
let outputType = 'dots';

const inputBox = document.getElementById('input-text');
const outputBox = document.getElementById('output');
const minTextAreaHeight = 'calc(1.5em + 14px)';
const maxTextAreaHeight = 290;

function clearOutput() {
	outputBox.value = '';
	outputBox.style.height = minTextAreaHeight;
}

outputBox.style.height = minTextAreaHeight;

function resizeInputBox() {
	if (inputType === 'brf') {
		inputBox.style.height = minTextAreaHeight;
	} else {
		inputBox.style.height = '';
		const height = Math.min(inputBox.scrollHeight + 2, maxTextAreaHeight);
		inputBox.style.height = height + 'px';
	}
}

function sightedToBraille(event) {
	const outputOpts = document.getElementById('hebrew-output-options');
	outputOpts.classList.add('show');
	$('#hebrew-input-options').collapse('show');
	clearOutput();
	outputBox.lang = outputType === 'dots' ? 'he-Brai' : '';
	outputBox.dir = 'ltr';
	inputBox.lang = 'he';
	inputBox.dir = 'rtl';
	inputType = 'sighted';
	resizeInputBox();
}

function brailleToSighted(event) {
	const outputOpts = document.getElementById('hebrew-output-options');
	outputOpts.classList.remove('show');
	$('#hebrew-input-options').collapse('hide');
	clearOutput();
	outputBox.lang = 'he';
	outputBox.dir = 'rtl';
	inputBox.lang = '';
	inputBox.dir = 'ltr';
	inputType = this.value;
	resizeInputBox();
}

document.getElementById('input-script-sighted').addEventListener('input', sightedToBraille);
document.getElementById('input-script-brf').addEventListener('input', brailleToSighted);
document.getElementById('input-script-english').addEventListener('input', brailleToSighted);

document.getElementById('btn-submit').addEventListener('click', function (event) {
	event.preventDefault();
	const parser = parsers.get(inputType);
	const intermediateRep = parser(inputBox.value);
	let producer;
	if (inputType === 'sighted') {
		producer = producers.get(outputType);
	} else {
		producer = toSighted;
	}
	const output = producer(intermediateRep);
	outputBox.value = output;
	outputBox.style.height = '';
	const height = Math.min(outputBox.scrollHeight + 2, maxTextAreaHeight);
	outputBox.style.height = 'max(' + height + 'px, ' + minTextAreaHeight + ')';
	document.getElementById('output-btns').scrollIntoView({behavior: 'smooth', block: 'end'});
	outputBox.focus();
	outputBox.scrollTop = 0;
});

{
	const pasteButton = document.getElementById('btn-paste');
	
	if ('readText' in navigator.clipboard) {
		pasteButton.addEventListener('click', function (event) {
			navigator.clipboard.readText().then(text => {
				inputBox.value = text;
				clearOutput();
			}).catch(e => {
				alert('Before you can use this feature you need to adjust your browser settings to grant this page permission to use the clipboard.');
			});
		});
	} else {
		pasteButton.remove();
	}
}

document.getElementById('btn-upload').addEventListener('click', function (event) {
	document.getElementById('upload-file').click();
});

inputBox.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		if (event.shiftKey || event.ctrlKey) {
			const currentHeight = inputBox.clientHeight + 2;
			inputBox.style.height = 'min(calc(' + currentHeight + 'px + 1.5em), ' + maxTextAreaHeight + 'px)';
		} else {
			event.preventDefault();
			document.getElementById('btn-submit').click();
		}
	}
});

let pasting = false;

inputBox.addEventListener('paste', function (event) {
	pasting = true;
});

inputBox.addEventListener('input', function (event) {
	if (pasting || this.value === '') {
		resizeInputBox();
	}
	clearOutput();
	pasting = false;
});

outputBox.addEventListener('beforeinput', function (event) {
	event.preventDefault();
});

$('.collapse').collapse({toggle: false});

function addSofitSymbols(symbols) {
	const maxSymbol = symbols.length - 1;
	let i = maxSymbol;
	let symbol, sofit;
	while (i >= 1) {
		symbol = symbols[i];
		if (isPunctuation(symbol) || i === maxSymbol) {
			i--;
			while (i >= 0 && !hasLetter(symbol)) {
				symbol = symbols[i];
				i--;
			}
			sofit = sofitSymbols.get(symbol);
			if (sofit !== undefined) {
				symbols[i + 1] = sofit;
			}
		}
		i--;
	}
}

function parseBRF(str) {
	let symbols = [];
	for (let brfChar of str.toUpperCase()) {
		if (brfChar === '@') {
			// Some kind of cantillation mark?
			continue;
		}
		const symbol = brfInput.get(brfChar);
		if (symbol === undefined) {
			throw new Error('Unable to translate ' + brfChar);
		}
		symbols.push(symbol);
	}
	addSofitSymbols(symbols);

	// Identify paragraphs
	const newSymbols = [];
	i = 0;
	while (i < symbols.length) {
		const symbol = symbols[i];
		if (symbol === NEW_LINE && symbols[i + 1] === SPACE && symbols[i + 2] === SPACE) {
			newSymbols.push(PARAGRAPH);
			i += 3;
		} else {
			newSymbols.push(symbol);
			i++;
		}
	}
	return newSymbols;
}

function parseHebrewInEnglish(str) {
	const symbols = [];
	let numericMode = false;
	let i = 0;
	letterLoop: while (i < str.length) {
		let singleLetter = str[i];
		if (singleLetter >= 'A' && singleLetter <= 'Z') {
			symbols.push(SHVA);
			singleLetter = singleLetter.toLowerCase();
		} else if (
			(singleLetter >= '0' && singleLetter <= '9') ||
			singleLetter === '⁄'
		) {
			if (!numericMode) {
				symbols.push(TSERE_YOD);
				numericMode = true;
			}
			if (singleLetter === '0') {
				singleLetter = 'j';
			} else if (singleLetter !== '⁄') {
				// 1..9 -> a..i
				singleLetter = String.fromCharCode(singleLetter.charCodeAt(0) + 48);
			}
		} else if (numericMode) {
			const nextLetter = str[i + 1];
			if (singleLetter === ' ' && nextLetter >= '0' && nextLetter <= '9') {
				symbols.push(DAGESH);
				i++;
				continue;
			} else if (singleLetter !== '.' && singleLetter !== ',') {
				numericMode = false;
			}
		}

		if (!numericMode) {
			for (let contraction of longBrailleChar.keys()) {
				if (contraction === singleLetter + str.slice(i + 1, i + contraction.length)) {
					const expansion = longBrailleChar.get(contraction);
					const replacement = expansion.replacement;
					symbols.push(...replacement);
					i += contraction.length;
					continue letterLoop;
				}
			}

			const doubleLetter = singleLetter + str[i + 1];
			const twoLetterSymbol = doubleBrailleChar.get(doubleLetter);
			if (twoLetterSymbol !== undefined) {
				symbols.push(twoLetterSymbol);
				i += 2;
				continue;
			}
		}

		const oneLetterSymbol = singleBrailleChar.get(singleLetter);
		if (oneLetterSymbol === undefined) {
			throw new Error('Unable to translate ' + singleLetter);
		} else {
			if (isPunctuation(oneLetterSymbol) && symbols[symbols.length - 1] === KHAF) {
				symbols.push(FINAL_SHVA);
			}
			symbols.push(oneLetterSymbol);
			i++;
		}
	}
	if (symbols[symbols.length - 1] === KHAF) {
		symbols.push(FINAL_SHVA);
	}
	addSofitSymbols(symbols);
	return symbols;
}

function toSighted(intermediateRep) {
	let output = '';
	for (let symbol of intermediateRep) {
		output += heScriptOutput.get(symbol);
	}
	return output;
}

function toUnicodeGlyphs(intermediateRep) {
	let output = '';
	for (let symbol of intermediateRep) {
		output += unicodeBraille.get(symbol);
	}
	return output;
}
