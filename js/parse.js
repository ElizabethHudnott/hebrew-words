'use strict';

/* TODO
 * Pei sofit
 * Vav with dagesh and shuruk
 * Cholam implied by shin dot
 */

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
const SPACE = 37;
const COMMA = 38;
const FULL_STOP = 39;
const QUESTION_MARK = 40;
const NEW_LINE = 41;

// 2xx are short vowels
// 1xx are long vowels and diphthongs
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
symbolMap.set(' ', SPACE);
symbolMap.set(',', COMMA);
symbolMap.set('.', FULL_STOP);
symbolMap.set('׃', FULL_STOP);
symbolMap.set('?', QUESTION_MARK);
symbolMap.set('\n', NEW_LINE);
//symbolMap.set('', );

function isVowel(symbol) {
	return symbol > VOWEL_MARK;
}

function parseHebrew(input) {
	const chars = input.normalize('NFD').split('');
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

		if (nextLetter === DAGESH) {
			if (
				thisLetter === VET ||
				thisLetter === KHAF || thisLetter === KHAF_SOFIT ||
				thisLetter === FEI ||
				thisLetter === TAV
			) {
				// Bet, Kaf, Kaf Sofit, Pei, Tav with dagesh
				newLetters.push(thisLetter + 1);
			} else if (thisLetter === VAV && !nextNextIsVowel) {
				// Shuruk
				newLetters.push(SHURUK);
			} else {
				newLetters.push(DAGESH, nextLetter);
			}
			i += 2;
		} else if (thisLetter === VAV && nextLetter === CHOLAM) {
			// Cholam Vav
			newLetters.push(CHOLAM_VAV);
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
		if (penultimate === CHET || penultimate === AYIN) {
			newLetters[numLetters - 1] = penultimate;
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