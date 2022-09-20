<?php
session_start();

header("Content-Type: text/html; charset=utf-8");
require 'phpMailer/PHPMailerAutoload.php';

$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');


$phone = trim($_POST['phone']);
$from = trim($_POST['from']);
$email = trim($_POST['mail']);



if (!empty($_POST['question-1'])) {
$quest1 = implode(', ',$_POST['question-1']);
}
if (!empty($_POST['question-2'])) {
	$quest2 = implode(', ',$_POST['question-2']);
	}
$quest3 = $_POST['question-3'];
$quest4 = $_POST['question-4'];

$utm_source = $_SESSION['utm_source'];
$utm_medium = $_SESSION['utm_medium'];
$utm_campaign = $_SESSION['utm_campaign'];
$utm_content = $_SESSION['utm_content'];
$utm_term = $_SESSION['utm_term'];
/*
$bitrix_message = "Телефон: $phone".PHP_EOL;
$bitrix_message .= "Почта: $email".PHP_EOL.PHP_EOL;
$bitrix_message .= "Заявка с формы: $from".PHP_EOL.PHP_EOL;

if ($quest1) {$bitrix_message .= "<b>01. Где необходимо нанести покрытие?    </b> $quest1<br>";}
if ($quest2) {$bitrix_message .= "<b>02. Вы хотите приобрести только систему материалов или материалы + нанесение «под ключ»?</b> $quest2<br>";}
if ($quest3) {$bitrix_message .= "<b>03. Какой тип декоративного покрытия вас интересует?   </b> $quest3<br>";}
if ($quest4) {$bitrix_message .= "<b>04. Укажите примерную площадь поверхности    $quest4<br>";}
*/
/*$bitrix_message .= "Имя: $name".PHP_EOL;
$bitrix_message .= "Улица: $street".PHP_EOL.PHP_EOL;
$bitrix_message .= "Количество: $quantity".PHP_EOL.PHP_EOL;
$bitrix_message .= "Доставка: $dostavka".PHP_EOL.PHP_EOL;
$bitrix_message .= "Оплата: $oplata".PHP_EOL.PHP_EOL;
$bitrix_message .= "ФИО: $fio".PHP_EOL.PHP_EOL;
$bitrix_message .= "Сообщение: $soob".PHP_EOL.PHP_EOL;
$bitrix_message .= "Цена: $price".PHP_EOL.PHP_EOL;*/

/*$Send = new Send($phone, $from, $email, $bitrix_message, $utm_source, $utm_content, $utm_medium, $utm_term, $utm_campaign);
$Send->start();*/









$mail->setFrom('info@1mebel.by', '1mebel');
$mail->addAddress("avocode.web01@yandex.ru");


if ($_POST['token'] == $_SESSION['lastToken']) {
} else {
	if (!empty($phone)) {
    $_SESSION['lastToken'] = $_POST['token'];

    $title = "1mebel.by";
    $body = " Заявка с сайта 1mebel.by<br>
    --------------------------------------------------<br><br>";

    if ($from) {$body .= "$from<br>";}
    if ($quest1) {$body .= "<b>01. Какую мебель необходимо восстановить?</b> $quest1<br>";}
    if ($quest2) {$body .= "<b>02. Какой вид ремонта требуется?</b> $quest2<br>";}
    if ($quest3) {$body .= "<b>03. В какой области вы проживаете?</b> $quest3<br>";}
    if ($quest4) {$body .= "<b>04. Как срочно вы хотите	произвести ремонт мебели?</b> $quest4<br>";}
    if ($phone) {$body .= "Телефон: $phone<br>";}
    if ($email) {$body .= "Почта: $email<br>";}
		if ($utm_source) {$body .= "utm_source: $utm_source<br>";}
		if ($utm_medium) {$body .= "utm_medium: $utm_medium<br>";}
		if ($utm_campaign) {$body .= "utm_campaign: $utm_campaign<br>";}
		if ($utm_content) {$body .= "utm_content: $utm_content<br>";}
		if ($utm_term) {$body .= "utm_term: $utm_term<br>";}

    $body .="<br>--------------------------------------------------\n";

if (!empty($file['name'][0])) {
  for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
      $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
      $filename = $file['name'][$ct];
      if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
          $mail->addAttachment($uploadfile, $filename);
          $rfile[] = "Файл $filename прикреплён";
      } else {
          $rfile[] = "Не удалось прикрепить файл $filename";
      }
  }
}

$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;


    if(!$mail->send()) {
        echo 'Ошибка отправки.';
        //echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Сообщение отправлено';
    }


/*
$token = "5520177133:AAFYEQ7mPsL2QRyxjUdbKfviayFwJm_gO3o";

//Сюда вставляем chat_id
$chat_id = "-1001614941027";


//Собираем в массив то, что будет передаваться боту
$arr = array(
	'Сайт:' =>  $title,

);
	if ($from) {$arr['Заявка с формы:'] = $from;}
	if ($phone) {$arr['Телефон:'] = $phone;}
	if ($quest1) {$arr['Какую мебель необходимо восстановить?'] = $quest1;}
	if ($quest2) {$arr['Какой вид ремонта требуется?'] = $quest2;}
	if ($quest3) {$arr['В какой области вы проживаете?'] = $quest3;}
	if ($quest4) {$arr['Как срочно вы хотите	произвести ремонт мебели?'] = $quest4;}
	if ($email) {$arr['Почта:'] = $email;}
	if ($utm_source) {$arr['utm_source:'] = $utm_source;}
	if ($utm_medium) {$arr['utm_medium:'] = $utm_medium;}
	if ($utm_campaign) {$arr['utm_campaign:'] = $utm_campaign;}
	if ($utm_content) {$arr['utm_content:'] = $utm_content;}
	if ($utm_term) {$arr['utm_term:'] = $utm_term;}


//Настраиваем внешний вид сообщения в телеграме
foreach($arr as $key => $value) {
	$txt .= "<b>".$key."</b> ".$value."%0A";
};

//Передаем данные боту
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Выводим сообщение об успешной отправке
if ($sendToTelegram) {
	alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
}

//А здесь сообщение об ошибке при отправке
else {
	alert('Что-то пошло не так. ПОпробуйте отправить форму ещё раз.');
}
} */
}
}