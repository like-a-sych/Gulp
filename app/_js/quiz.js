//quiz
$(".next-step").click(function () {

	if ($(this).parent().parent().find($("input:checked")).length > 0) {
		$(this).closest(".step.active").next().addClass("active"),
			$(this).closest(".step.active").removeClass("active");
		//var s = $('.quiz').offset().top - 10; $("body,html").animate({ scrollTop: s }, 500);
		var i = $(this).closest('.quiz').find(".prg1 .line").attr("data-left");
		$(this).closest('.quiz').find(".prg1 .line").css("left", -1 * (parseInt(i) - 20) + "%"),
			$(this).closest('.quiz').find(".prg1 .line").attr("data-left", parseInt(i) - 20);
		var a = $(this).closest('.quiz').find(".current-step").html();
		$(this).parent().closest('.quiz').find('.current-step').html(a - 1);
		if (a == 2) {
			$(this).closest(".quiz").find(".progress-text").html('Все готово. <strong>Остался последний шаг</strong>');
			//$('#progress-text').addClass('final-step');
			$(this).closest("#quiz").find("._container").addClass("quiz-finish");
			//var s = $('.quiz').offset().top; $("body,html").animate({ scrollTop: s }, 500);
		}
		if (a == 2) { $(this).closest(".quiz").find('.rp-rule__span').html('вопрос') } else
			if (a == 3 || a == 4 || a == 5) { $(this).closest(".quiz").find('.rp-rule__span').html('вопроса') } else {
				$(this).closest(".quiz").find('.rp-rule__span').html('вопросов')
			}
	}
});
//Кнопки "пропустить" и "назад"

$(".quiz-variants__skip").click((function () {
	$(this).closest('.quiz').find(".step.active").next().addClass("active"),
		$(this).closest('.step.active').removeClass("active");

	var e = $(this).data("step");

	var t = $(this).closest('.quiz').find(".prg1 .line").attr("data-left");
	$(this).closest('.quiz').find(".prg1 .line").css("left", -1 * (parseInt(t) - 25) + "%"),
		$(this).closest('.quiz').find(".prg1 .line").attr("data-left", parseInt(t) - 25);
	var a = $(".current-step").html();
})),

	$(".quiz-variants__prev").click((function () {
		$(this).closest('.quiz').find(".step.active").prev().addClass("active"),
			$(this).closest('.step.active').removeClass("active");

		var e = $(this).data("step");

		var t = $(this).closest('.quiz').find(".prg1 .line").attr("data-left");

		$(this).closest('.quiz').find(".prg1 .line").css("left", -1 * (parseInt(t) + 25) + "%"),
			$(this).closest('.quiz').find(".prg1 .line").attr("data-left", parseInt(t) + 25);
		var a = $(".current-step").html();
		var a = $(this).closest('.quiz').find(".current-step").html();
		$(this).parent().closest('.quiz').find('.current-step').html(parseInt(a) + 1);
		if (a == 2) {
			$(this).closest(".quiz").find(".progress-text").html('Все готово. <strong>Остался последний шаг</strong>');
			//$('#progress-text').addClass('final-step');
			$(this).closest(".section-9__container").addClass("quiz-finish");
			//var s = $('.quiz').offset().top; $("body,html").animate({ scrollTop: s }, 500);
		}
		if (a == 2) { $(this).closest(".quiz-section").find('.rp-rule__span').html('вопрос') } else
			if (a == 3 || a == 4 || a == 5) { $(this).closest(".quiz-section").find('.rp-rule__span').html('вопроса') } else {
				$(this).closest(".quiz-section").find('.rp-rule__span').html('вопросов')
			};
	}));




$('.variant2').click(function () {
	if ($(this).find('input').prop("checked")) {
		$(this).addClass('active22');
	}
	else {
		$(this).removeClass('active22');
	}
});

//всплывающая подскака на бутсрапе

var popoverTriggerList, popoverList = (popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))).map((function (e) {
	return new bootstrap.Popover(e)
}
));
popoverList = (popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))).map((function (e) {
	return new bootstrap.Popover(e)
}
));
$("body").on("click", (function (e) {
	$('[data-bs-toggle="popover"]').each((function () {
		$(this).is(e.target) || 0 !== $(this).has(e.target).length || 0 !== $(".popover").has(e.target).length || $(this).popover("hide")
	}
	))
}
));


//таймер для квиза


function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 25);
	var minutes = Math.floor((t / 1000 / 60) % 20);
	return {
		'total': t,
		'minutes': minutes,
		'seconds': seconds
	};
}
function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	function updateClock() {
		var t = getTimeRemaining(endtime);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}
var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
initializeClock('countdown', deadline);
initializeClock('countdown2', deadline);


