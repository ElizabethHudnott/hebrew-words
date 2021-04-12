'use strict'

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
unicodeBraille.set(DAGESH, '⠘');
unicodeBraille.set(SPACE, ' ');
unicodeBraille.set(COMMA, '⠂');
unicodeBraille.set(FULL_STOP, '⠲');
unicodeBraille.set(QUESTION_MARK, '⠦');
unicodeBraille.set(NEW_LINE, '\n');
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

let inputType = 'sighted';
let outputType = 'he-Brai';

document.getElementById('input-script-sighted').addEventListener('input', function (event) {
	$('#hebrew-output-options').collapse('show');
	const output = document.getElementById('output');
	output.innerHTML = '';
	output.lang = outputType === 'he-Brai' ? 'he-Brai' : '';
	output.dir = 'ltr';
	const input = document.getElementById('input-text');
	input.lang = 'he';
	input.dir = 'rtl';
	inputType = 'sighted';
});

function brailleToSighted(event) {
	$('#hebrew-output-options').collapse('hide');
	const output = document.getElementById('output');
	output.innerHTML = '';
	output.lang = 'he';
	output.dir = 'rtl';
	const input = document.getElementById('input-text');
	input.lang = '';
	input.dir = 'ltr';
	inputType = this.value;
}

document.getElementById('input-script-brf').addEventListener('input', brailleToSighted);
document.getElementById('input-script-english').addEventListener('input', brailleToSighted);

document.getElementById('btn-submit').addEventListener('click', function (event) {
	event.preventDefault();
	const intermediateRep = parseHebrew(document.getElementById('input-text').value);
	let output = '';
	for (let symbol of intermediateRep) {
		output += unicodeBraille.get(symbol);
	}
	document.getElementById('output').innerHTML = escapeHTML(output);
});

{
	const pasteButton = document.getElementById('btn-paste');
	
	if ('readText' in navigator.clipboard) {
		pasteButton.addEventListener('click', function (event) {
			navigator.clipboard.readText().then(text => {
				document.getElementById('input-text').value = text;
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

document.getElementById('input-text').addEventListener('keydown', function (event) {
	if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
		event.preventDefault();
		document.getElementById('btn-submit').click();
	}
});

$('.collapse').collapse({toggle: false});
