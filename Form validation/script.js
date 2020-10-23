'use strict';

function validateForm(obj){
	/*
	formId – идентификатор формы;
	formValidClass – класс, добавляемый форме в случае пройденной проверки;
	formInvalidClass – класс, добавляемый форме в случае ошибок;
	inputErrorClass – класс, добавляемый элементам input в случае ошибочного заполнения.
	*/

	var form = document.getElementById(obj.formId);
	form.addEventListener("blur", function(event){
		if (event.target.tagName === 'INPUT'){
			var inputId = event.target.id;
			var inp = document. getElementById(inputId);
			//Обязательное поле
			checkRequired(inp);
			//поле с валидатором
			checkValidator(inp);
		}
	}, true);

	form.addEventListener("focus", function(event){
		if (event.target.tagName === 'INPUT'){
			var inputId = event.target.id;
			var inp = document. getElementById(inputId);
			inp.classList.remove(obj.inputErrorClass);
		}
	}, true);

	form.addEventListener("submit", function(event){
		event.preventDefault();
		var arrInput = Array.from(document.querySelectorAll('input'));
		for (var elemInput of arrInput){
			checkRequired(elemInput);
			checkValidator(elemInput);
		}
		var bool = true;
		for (var elem of arrInput){
			if (elem.classList.contains(obj.inputErrorClass)){
				bool = false;
			}
		}
		if (bool){
			form.classList.add(obj.formValidClass);
			form.classList.remove(obj.formInvalidClass);
		} else{
			form.classList.add(obj.formInvalidClass);
			form.classList.remove(obj.formValidClass);
		}
	});

	//Проверка обязательного поля
	function checkRequired(inp){
		if (inp.dataset.required === ""){
					if (inp.value === ""){
						inp.classList.add(obj.inputErrorClass);
					}
				}
	}

	function checkValidator(inp){
		if (!(inp.value === "")) {
			switch(inp.dataset.validator){
				//Валидация числового поля
				case 'number':
					if (/\d/.test(inp.value)){
						var num = parseInt(inp.value);
							if (inp.dataset.validatorMin && inp.dataset.validatorMax){
								if (!((inp.dataset.validatorMin <= num) && (num <= inp.dataset.validatorMax))){
									inp.classList.add(obj.inputErrorClass);
								}
							} else {
								if (((inp.dataset.validatorMin <= num) || (num <= inp.dataset.validatorMax))){
									inp.classList.add(obj.inputErrorClass);
								}
							}
						} else {
							inp.classList.add(obj.inputErrorClass);
						}
						break;
				//Валидация буквенного поля
				case 'letters':
					if (/\d/.test(inp.value)){
						inp.classList.add(obj.inputErrorClass);
					}
					break;
				//Валидация поля с паттерном
				case 'regexp':
					const re = new RegExp(inp.dataset.validatorPattern);
					if (!re.test(inp.value)){
						inp.classList.add(obj.inputErrorClass);
					}
					break;
		}	}
	}
	
}


