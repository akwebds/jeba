<?php 

    $mailResponse;
    $fromName = 'Joyous Elite Business Advisory';
    $fromEmail = "info@joyouselite.in";
    $to_email = "info@joyouselite.in";

    if(isset($_POST['type'])){
        $name = ucwords($_POST['name']);
        $phoneNumber = $_POST['phoneNumber'];
        $email = $_POST['email'];
        
        $subject = "New Callback Request";

        $body = "Name: ". $name . "\nPhone Number: ". $phoneNumber . "\nEmail: ". $email;
        $headers = 'From: '.$name.' <'.$email.'>' . PHP_EOL .
            'X-Mailer: PHP/' . phpversion();
        
        if (mail($to_email, $subject, $body, $headers)) {
            $mailResponse['success']= true;
            $mailResponse['status']=200;
            $mailResponse['message']='Thank you for callback request';
            echo json_encode($mailResponse);
            exit;
        } else {
            $mailResponse['success']= false;
            $mailResponse['status']=200;
            $mailResponse['message']='Error in sending mail';
            echo json_encode($mailResponse);
            exit;
        }

    }else{
        $company = ucwords($_POST['company']);
        $name = ucwords($_POST['name']);
        $email = $_POST['email'];
        $phoneNumber = $_POST['phoneNumber'];
        $website = $_POST['website'];
        $assistanceWith = $_POST['assistanceWith'];
        $message = $_POST['message'];
        
        $subject = "New Contact us request";

        $body = "Company Name:" . $company . "\nName: ". $name . "\nEmail: ". $email . "\nPhone Number: ". $phoneNumber . "\nWebsite: ". $website . "\nWhat do you need assistance with: ". $assistanceWith . "\nCallback Details\n". $message;
        $headers = 'From: '.$name.' <'.$email.'>' . PHP_EOL .
            'X-Mailer: PHP/' . phpversion();
        
        if (mail($to_email, $subject, $body, $headers)) {
            $mailResponse['success']= true;
            $mailResponse['status']=200;
            $mailResponse['message']='Thank you for contact us';
            echo json_encode($mailResponse);
            exit;
        } else {
            $mailResponse['success']= false;
            $mailResponse['status']=200;
            $mailResponse['message']='Error in sending mail';
            echo json_encode($mailResponse);
            exit;
        }
    }
?>