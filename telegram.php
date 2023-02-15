<?php

$json = json_decode(file_get_contents("php://input"), true);

// Токен
$token = '5876114404:AAHKJQY3LiU7RJt_AB1_340-vf4GMNTt9ak';

// ID чата
$chat_id = '-613199884';

$name = strip_tags(urlencode($json['name']));
$phonenumber = strip_tags(urlencode($json['tel']));
$message = strip_tags(urlencode($json['message']));

$arr = array(
    'Имя пользователя: ' => $name,
    'Номер телефона: ' => $phonenumber,
    'Сообщение: ' => $message
);

foreach ($arr as $key => $value) {
    $txt .= "<b>".$key."</b>".$value."%0A";
};

$textSendStatus = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r"); 
$resData = array();
$resData["message"] = "1"; 
echo json_encode($resData);