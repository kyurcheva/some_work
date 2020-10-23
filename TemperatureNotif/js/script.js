//console.log(getRandomTemp(0, 45));
	minTemp = 22;
	maxTemp = 25;
	
	var dateArr = [];
	var tempArr = [];
	var audio = new Audio();

	 $(document).ready(function(){
        //Скрыть PopUp при загрузке страницы    
        PopUpHide();
   
    //Функция отображения PopUp
    function PopUpShow(){
        $("#popup-norm").show();
        $("#zatem").show()
    }
    //Функция скрытия PopUp
    function PopUpHide(){
        $("#popup-norm").hide();
        $("#zatem").hide();
    }

    $("#set-norm").click(function(){
    	PopUpShow();
    });

    $("#btn_apply").click(function(){
    	//minTemp = $("#temp-from");
    	minTemp = $("input[name='temp-from']").val();
    	maxTemp = $("input[name='temp-to']").val();
    	$("#temp-norm").text("Temperature norm: " + minTemp + " - " + maxTemp + " ℃");
    	PopUpHide();
    });
	

	function addDateArr(arr, time){
		if (arr.length < 20){
			arr.push(time);
		}
		else{
			arr.shift();
			arr.push(time);
		}
	}

	setInterval(function(){
		let currentTemp;
		currentTemp = getRandomTemp(0, 45);
		console.log("RGEYRTYRTT ", minTemp);
		console.log("RGEY ", maxTemp);
		//audio.play();
		addDateArr(dateArr, new Date().toLocaleTimeString());
		addDateArr(tempArr, currentTemp);
		console.log(dateArr);
		console.log(tempArr);
		$("#temp-block").html(currentTemp);
		addData(myLineChart, dateArr, tempArr);
		if (currentTemp >= minTemp && currentTemp <= maxTemp){
			$(".whole-temp-block").css({"transition-property": "background-color", "transition-duration": "2s", "background-color": "rgba(76, 175, 80, 0.7)"});
			audio.pause();
			audio.currentTime = 0;
		}
		if (currentTemp > maxTemp){
			$(".whole-temp-block").css({"transition-property": "background-color", "transition-duration": "2s", "background-color": "rgba(244, 67, 54, 0.7)"});
			audio.play();
		}
		if (currentTemp < minTemp){
			$(".whole-temp-block").css({"transition-property": "background-color", "transition-duration": "2s", "background-color": "rgba(33, 150, 243, 0.7)"});
			audio.play();
		}
	}, 2000);


	function getRandomTemp(min, max){
		return (Math.floor(Math.random()*(max-min)*100))/100;
	}

	var ctx = document.getElementById('myChart').getContext('2d');
		var myLineChart = new Chart(ctx, {
	   		type: 'line',
	    	data: {
	    		labels: [],
	    		datasets: [{
	    			label: '# Temperature',
	    			data: [],
	    			/*backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 150, 12, 0.2)'],
	            	borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 150, 12, 0.2)'],*/
	            	backgroundColor: 'rgba(96, 125, 139, 0.3)',
	            	borderColor: 'rgba(96, 125, 139, 1)',
	            	lineTension: 0
	    		}]
	    	},
	    	options: {
	    		title: {
	    			display: true,
	    			text: 'Temperature Chart',
	    			fontSize: 22,
	    			padding: 15,
	    			fontFamily: 'Arial'
	    		},
		        scales: {
		            yAxes: [{
		                ticks: {
		                	min: 0,
		                	max: 45,
		                    beginAtZero: true
		                },
		                scaleLabel: {
        					display: true,
        					labelString: "Temperature C",
        					fontSize: 20      					}
		            }],
		            xAxes: [{
		            	scaleLabel: {
        					display: true,
        					labelString: "Time",
        					fontSize: 20      					}
		            }]
		        }
	    	}
		});


//Function for update Chart, add data to Chart
function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update({
    	duration: 0,
    	easing: 'linear'
    });
}

$("#sound").click(function(){
	console.log('click sound')
	if ($("#sound").attr("src") == "img/sound_off.png"){
		$("#sound").attr("src", "img/sound_on.png")
		audio.src = 'sound/signal_dymoulovitelya.mp3'
	} 
	else{
		$("#sound").attr("src", "img/sound_off.png")
		audio.src = '';
	}
});
});