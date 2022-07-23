import { formSelector } from './constants/selectors.js';
import { $ } from './util.js';
import { showLottoDetailNumbers, hideLottoDetailNumbers, showElement } from './view.js';
import {
	resetPriceInputValue,
	savePriceInputValueToStore,
	resetLottoList,
	saveLottoAnswerListToStore,
	getAnswerCountArray,
} from './model.js';

export const onCheckLottoNumbersToggleBtn = function ({ target: { checked } }) {
	if (checked) {
		showLottoDetailNumbers();
	} else {
		hideLottoDetailNumbers();
	}
};

export const onSubmitLottoPurchaseForm = function (ev) {
	ev.preventDefault();
	const priceInputVal = ev.srcElement[0].valueAsNumber;
	resetPriceInputValue();
	resetLottoList();
	if (validateInputMoney(priceInputVal)) {
		savePriceInputValueToStore(priceInputVal);
		showElement($(formSelector.LOTTO_ANSWER_FORM));
	}
};

export const onSubmitLottoAnswerForm = function (ev) {
	ev.preventDefault();
	const { elements } = ev.srcElement;
	const answerValues = Array.from(elements).reduce((acc, cur) => {
		const { valueAsNumber } = cur;
		if (valueAsNumber) {
			return [...acc, cur.valueAsNumber];
		}
		return acc;
	}, []);

	if (validateInputAnswer(answerValues)) {
		saveLottoAnswerListToStore(answerValues);
		getAnswerCountArray();

		// 결과모달 보여주기 추가할것
	}
};
