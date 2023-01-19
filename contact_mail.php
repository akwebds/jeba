<?php 

    $mailResponse;
    $fromName = 'Joyous Elite Business Advisory';
    $fromEmail = "info@joyouselite.in";

    if(isset($_POST['type']) == 'callback'){
        $name = $_POST['name'];
        $phoneNumber = $_POST['phoneNumber'];

        
        $to_email = "ka020694@gmail.com";
        $subject = "New Callback Request";

        $body = "Name: ". $name . "\nPhone Number: ". $phoneNumber;
        $headers = 'From: '.$fromName.' <'.$fromEmail.'>' . PHP_EOL .
            'X-Mailer: PHP/' . phpversion();
        
        if (mail($to_email, $subject, $body, $headers)) {
            $mailResponse['success']= true;
            $mailResponse['status']=200;
            $mailResponse['message']='';
            echo json_encode($mailResponse);
        } else {
            $mailResponse['success']= false;
            $mailResponse['status']=200;
            $mailResponse['message']='Error in sending mail';
            echo json_encode($mailResponse);
        }

    }
?>