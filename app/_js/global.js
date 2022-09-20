//Маска для ввода
$.mask.definitions.q = "[1,2,3,4,5,6,9]",
	//$('input[type="tel"]').mask('+7 (q99) 999-99-99');
	$('input[type="tel"]').mask('+7q99999999');

$.fn.setCursorPosition = function (pos) {
	if ($(this).get(0).setSelectionRange) {
		$(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
		var range = $(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};
$('input[name="phone"]').one('click', function () {
	$(this).setCursorPosition(4);
});
//Проверка формы бутстрапом
(function () {
	'use strict';
	window.addEventListener('load', function () {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					//event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();

$('form').submit(function (e) {
	if ($(this).hasClass('was-validated'))
		$(this).find('button[type="submit"]').prop('disabled', true);
});
// Чтобы не прыгал header при открытии бутсраповских модалок
$("header").on("click", ".offcanvas-btn", (function () {
	if ($('.offcanvas-end').hasClass('show')) {
		$('.header').css({ "padding-right": "17" })
	}
}
));

$(".modal").on("show.bs.modal", function (e) {
	$("header").css("padding-right", window.innerWidth - document.documentElement.clientWidth)
}),
	$(".modal").on("hidden.bs.modal", function (e) {
		$("header").css("padding-right", "0")
	});

$(".offcanvas").on("show.bs.offcanvas", function (e) {
	$("header").css("padding-right", window.innerWidth - document.documentElement.clientWidth)
}), $(".offcanvas").on("hidden.bs.offcanvas", function (e) {
	$("header").css("padding-right", "0")
});

//Сейчас работаем

var date = new Date();
var hourr = date.getHours();
var week = date.getDay();

if (hourr < 11 || hourr > 20) {
	$('.worknow').addClass('none');
	$('.online').addClass('none');
}
else {
	$('.worknow').removeClass('none');
	$('.online').removeClass('none');
};