jQuery(document).ready(function ($) {

  $("form").submit(function () { //устанавливаем событие отправки для формы с id=form
    console.log('Отправка формы');
    var form_data = $(this).serialize(); //собераем все данные из формы
    $.ajax({
      type: "POST", //Метод отправки
      url: "mailer/mail.php", //путь до php фаила отправителя
      data: form_data,
    });
  });
});