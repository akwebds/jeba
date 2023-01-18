<?php

    if(isset($_POST['type']) == 'callback'){
        $name = $_POST['name']
        $phoneNumber = $_POST['phoneNumber']

        $to_email = "ka020694@gmail.com";
        $subject = "New Callback Request";
        $body = "Name: ". $name . "<br>".
                "Phone Number: ". $phoneNumber;
        $headers = "From: akwebds@gmail.com";
        
        if (mail($to_email, $subject, $body, $headers)) {
            echo json_encode(['success'=>true]);
        } else {
            echo json_encode(['success'=>false]);
        }

    }



?>