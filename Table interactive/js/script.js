var data;
		var idSortControl = true;
		var fnSortControl = true;
		var r_id = 1;

		//----------Получение данных с сервера и запись в таблицу
		function initReq(url){
			var req = new XMLHttpRequest();
			req.open('GET', url);
			req.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200){
					//document.getElementById('demo').innerHTML = req.responseText;
					console.log(req.responseText);
					data = JSON.parse(req.response);
					console.log(data.length);
					$(function(){
							
						for (var i = 0; i < data.length; i++) {
							///$('#table').append('<tr id="r_' + r_id + '" class="row"><td class="id">' + data[i].id + '</td><td class="firstName">' + data[i].firstName + '</td><td class="lastName">' + data[i].lastName + '</td><td class="email">' + data[i].email + '</td><td class="phone">' + data[i].phone + '</td></tr>');
							$('#table-body').append('<tr id="r_' + r_id + '" class="table-row"><th scope="row" class="id">' + data[i].id + '</th><td class="firstName">' + data[i].firstName + '</td><td class="lastName">' + data[i].lastName + '</td><td class="email">' + data[i].email + '</td><td class="phone">' + data[i].phone + 
								'</td></tr>');
							r_id++;
						}
						});

				}
			};
			req.send();
			}

			$('#btn_big_data').click(function(){
				var url = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
				initReq(url);
			});

			$('#btn_small_data').click(function(){
				var url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
				initReq(url);
			});
			

			//-------------Сортировка по FirstName

			$("#tab_fn").click(function(){
				$('#tab_id').html('id');
				console.log('click_id!');
				var arrFirstName = [];
				numFirstName = 1;
				for (var j = 0; j < data.length; j++){
					arrFirstName[j] = $('#r_' + numFirstName).children('.firstName').html();
					numFirstName++;
				}
				if (fnSortControl){
					arrFirstName.sort();
					fnSortControl = false;
					$('#tab_fn').html('firstName ▲');
				} else {
					arrFirstName.sort(compareDecrease);
					fnSortControl = true;
					$('#tab_fn').html('firstName ▼');
				}
				for (var p = 0; p < arrFirstName.length; p++){
					for (var q = 1; q <= arrFirstName.length; q++){
						if ($('#r_' + q).children('.firstName').html() == arrFirstName[p]){
							$('#r_' + q).detach().appendTo($('#table'));
						}
					}
				}
			});

			//-------------Сортировка по ID

			$("#tab_id").click(function(){
				var arr = [];
				//arr_norm = [];
				arrId = 1;
				$('#tab_fn').html('firstName');
				for (var j = 0; j < data.length; j++){
					arr[j] = $('#r_' + arrId).children('.id').html();
					//arr_norm[j] = $('#r_' + arr_id).children('.id').html();
					arrId++;
				}
				//console.log(arr.sort(compareNumber));
				if (idSortControl){
					arr.sort(compareNumber);
					idSortControl = false;
					$('#tab_id').html('id ▲');
				} else {
					arr.sort(compareNumberReverse);
					idSortControl = true;
					$('#tab_id').html('id ▼');
				}
				for (var p = 0; p < arr.length; p++){
					for (var q = 1; q <= arr.length; q++){
						if ($('#r_' + q).children('.id').html() == arr[p]){
							$('#r_' + q).detach().appendTo($('#table'));
						}
					}
				}
			});

			//---------------Вспомогательные для сортировки
			function compareNumber(a, b){
				return a - b;
			}

			function compareNumberReverse(a,b){
				return b - a;
			}

			function compareDecrease(a, b){
				if (a > b) return -1;
				else if (a < b) return 1;
				else return 0;
			}


			//-----------------Поиск подстроки в столбцах

			$('#btn_search').click(function(){
				//console.log('click search');
				var searchStr = $('#input_search').val();
				//console.log(searchStr);
				for (var r = 1; r <= data.length; r++){
					if (searchStr === ""){
						$('#r_' + r).show();
					}
					if (!($('#r_' + r).children('.id').html().includes(searchStr) || $('#r_' + r).children('.lastName').html().includes(searchStr) || $('#r_' + r).children('.firstName').html().includes(searchStr) || $('#r_' + r).children('.email').html().includes(searchStr) || $('#r_' + r).children('.phone').html().includes(searchStr))){
						$('#r_' + r).hide();
					}
				}

				/*for (var p = 0; p < arr.length; p++){
					for (var q = 1; q <= arr.length; q++){
						if ($('#r_' + q).children('.id').html() == arr[p]){
							$('#r_' + q).detach().appendTo($('#table'));
						}
					}
				}*/
			});



			//-----------------Вывод таблицы Info для элемента, по клику на его строку

			$('#table').on('click', '.table-row', function(e){
				var row = $(this).children();
				var rowElem;
				//$("#info_table").show();
				$("#info-table").removeClass('d-none');
				$('#inf_id').html(row[0].textContent);
				$('#inf_fn').html(row[1].textContent);
				$('#inf_ln').html(row[2].textContent);
				$('#inf_em').html(row[3].textContent);
				$('#inf_ph').html(row[4].textContent);
				console.log(row[0].textContent)

				//console.log(row);
				for (var i = 0; i < data.length; i++){
					if (row[0].textContent == data[i].id){
						rowElem = data[i];
					}
				}
				console.log(rowElem);

				$('#inf_user').html(rowElem.firstName + " " + rowElem.lastName);
				$('#inf_desc').html(rowElem.description);
				$('#inf_address').html(rowElem.address.streetAddress);
				$('#inf_city').html(rowElem.address.city);
				$('#inf_state').html(rowElem.address.state);
				$('#inf_zip').html(rowElem.address.zip);

				PopUpShow();
					
			});

			//--------Скрыть инфо по клику в пустом участке страницы
			
			$(document).click(function(e){
				if (!$('#table').is(e.target) && $('#table').has(e.target).length === 0 && !$('#info_table').is(e.target) && $('#info_table').has(e.target).length === 0 && !$('#add_form').is(e.target) && $('#add_form').has(e.target).length === 0 && !$('#btn_show_add').is(e.target)){
					console.log('hide');
					//$('#info_table').addClass("d-none");
					PopUpHide();
				}
			});
			

			//--------функция проверки заполненности поля для активации кнопки Add из формы
			
			function check(){
				console.log('mouseUp');
				if ($('#form_id').val().length != 0 && $('#form_fn').val().length != 0 && $('#form_ln').val().length != 0 && $('#form_em').val().length != 0 && $('#form_ph').val().length != 0){
					$('#btn_add').removeAttr('disabled');
				} else{
					$('#btn_add').attr("disabled", "disabled");
				}
				//$('#btn_add').disabled = document.forms[0].elements.id.value ? "" : "disabled";
			}

			//----------Функция проверки валидности введенных значений для ID, email, phone и добавления новой строки в начало таблицы
			$('#btn_add').click(function(){
				console.log('button add');
				for (var r = 1; r <= data.length; r++){		
					if ($('#r_' + r).children()[0].textContent === $('#form_id').val()){
						alert('This Id already exists');
					}
				}	
				if ($('#form_em').val().match(/^[A-Z]{2}.+[@]{1}.+[.]{1}.+$/) && $('#form_ph').val().match(/^\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/)){
					$('tbody:first').before('<tr id="r_' + r_id + '" class="row"><td class="id">' + $('#form_id').val() + '</td><td class="firstName">' + $('#form_fn').val() + '</td><td class="lastName">' + $('#form_ln').val() + '</td><td class="email">' + $('#form_em').val() + '</td><td class="phone">' + $('#form_ph').val() + '</td></tr>');
					r_id++;
				} else if (!$('#form_em').val().match(/^[A-Z]{2}.+[@]{1}.+[.]{1}.+$/)){
							alert("Email is not correct. Example: XXxxxxx@xxx.xxx");
						}
						if (!$('#form_ph').val().match(/^\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/)){
							alert("Phone is not correct. Example: (XXX)XXX-XXXX");
						}
				$('#add_form').hide();
				$('#btn_show_add').show();
			});	


			//---------Клик по кнопке ADD RECORD, открытие формы для ввода
			$('#btn_show_add').click(function(){
				$('#add_form').show();
				$('#btn_show_add').hide();
				$('#btn_add').attr("disabled", "disabled");
			});




			//-----------------
	$(document).ready(function(){
        //Скрыть PopUp при загрузке страницы    
        PopUpHide();
    });
    
    //Функция отображения PopUp
    function PopUpShow(){
        $("#popup-info").show();
    }
    
    //Функция скрытия PopUp
    function PopUpHide(){
        $("#popup-info").hide();
    }