<?php
$name = $_POST['name'];
$subject = $_POST['subject'];
$mail = $_POST['mail'];
$message = $_POST['message'];

$mailtext = '
<html>
  <body>
    <p><b>Absender:</b>&nbsp;'.$name.'</p>
    <p><b>E-Mail:</b>&nbsp;'.$mail.'</p> <br>
    <p>'.$message.'</p>
  </body>
</html>
';

$empfaenger = "kontakt@samuelwoelfl.de";
$subject = "Website Formular - ".$subject;
$header = "MIME-Version: 1.0\r\n";
$header .= "Content-type: text/html; charset=utf-8\r\n";
$header .= "From: $mail \r\n";
$header .= "X-Mailer: PHP ". phpversion();

if ( ! empty($name) && ! empty($mail) && strlen($mailtext) > 2) {
  mail($empfaenger, $subject, $mailtext, $header) or die("Error!");
  header("location: index.html#success");
}

?>
