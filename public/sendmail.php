<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $exhibition = $_POST['exhibition'];
    $country = $_POST['country'];

    $to = 'atiguy@mail.ru';
    $subject = 'New Contact Form ICA Events';
    $headers = "From: info@ica-events.com" . "\r\n" .
               "CC: info@ica-events.com";

    $body = "Name: $name\n".
            "Email: $email\n".
            "Phone: $phone\n".
            "Message: $message\n".
            "Exhibition: $exhibition\n".
            "Country: $country\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Email sent successfully";
    } else {
        echo "Failed to send email";
    }
}
?>
