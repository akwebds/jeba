<?php 

if($_POST){ 
    $mailResponse; 
    $fname 	=  ucwords($_POST["fullName"]); 
    $email 	=  $_POST["email"]; 
    $phoneNumber 	=  $_POST["phoneNumber"]; 
    $qualification 	=  $_POST["qualification"]; 
    $employer   = $_POST["employer"];
    $designation   = $_POST["designation"];
    $experience        = $_POST["experience"];
    $subject 		= 'Resume Received'; 
	$to    = "careers@joyouselite.in"; 
	$from_email   = "info@joyouselite.in";
    $attachments = $_FILES['resumeFile'];
      
    $file_count = count($attachments['name']);   
    $boundary = md5("developer"); 
     
	$message_body =  "<html>
<head>
<title>HTML email</title>
</head>
<body> 
<table> 
<tr>
<td>Full Name</td>
<td>$fname</td>
</tr>
<tr>
<td>Email Address</td>
<td>$email</td>
</tr>
<tr>
<td>Phone Number</td>
<td>$phoneNumber</td>
</tr>
<tr>
<td>Qualification</td>
<td>$qualification</td>
</tr>
<tr>
<td>Employer</td>
<td>$employer</td>
</tr>
<tr>
<td>Designation</td>
<td>$designation</td>
</tr>
<tr>
<td>Experience</td>
<td>$experience</td>
</tr>
</table>
</body>
</html>"; 
	   
        $headers = "MIME-Version: 1.0\r\n"; 
        $headers .= "From: ".$name."<".$email.">\r\n"; 
        $headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n"; 
         
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n"; 
        $body .= chunk_split(base64_encode($message_body)); 
 
        for ($x = 0; $x < $file_count; $x++){       
            if(!empty($attachments['name'][$x])){
                
                if($attachments['error'][$x]>0)  
                {
                    $mymsg = array( 
                    1=>"The uploaded file exceeds the upload_max_filesize directive in php.ini", 
                    2=>"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form", 
                    3=>"The uploaded file was only partially uploaded", 
                    4=>"No file was uploaded", 
                    6=>"Missing a temporary folder" ); 
                    print  json_encode( array('type'=>'error',$mymsg[$attachments['error'][$x]]) ); 
					exit;
                }
                 
                $file_name = $attachments['name'][$x];
                $file_size = $attachments['size'][$x];
                $file_type = $attachments['type'][$x];
                 
                $handle = fopen($attachments['tmp_name'][$x], "r");
                $content = fread($handle, $file_size);
                fclose($handle);
                $encoded_content = chunk_split(base64_encode($content)); 
                
                $body .= "--$boundary\r\n";
                $body .="Content-Type: $file_type; name=".$file_name."\r\n";
                $body .="Content-Disposition: attachment; filename=".$file_name."\r\n";
                $body .="Content-Transfer-Encoding: base64\r\n";
                $body .="X-Attachment-Id: ".rand(1000,99999)."\r\n\r\n"; 
                $body .= $encoded_content; 
            }
        }

        
    $sentMail = mail($to, $subject, $body, $headers);
    if($sentMail)  
    {             

		$subject2 = "Thank you for job application";

        $message_body2 =  "<html>
                        <body> 
                        <table> 
                        <tr>
                        <td style='color: #000000;'> Hi ".$fname."<br><br>
                            Thank you for your interest in roles at Joyous Elite Business Advisory.
                            <br><br>
                            We have received your application and will come back to you as soon as we can to provide an update on the outcome of your application.
                            <br><br>
                            Please feel free to contact us at careers@joyouselite.in if you do have any questions.
                            <br><br>
                            Kind regards 
                            <br><br>
                            Team Careers 
                            <br> 
                            Joyous Elite Business Advisory
                            <br>
                            <img src='https://joyouselite.in/images/logo.png' width='300' style='margin-top: 10px;'>
                            <span style='opacity:0;'>Form submitted #" . date("Y-m-d h:i:sa")."</span>
                        </td>
                        </tr>
                        </table>
                        </body>
                        </html>";

        $body2 = $message_body2; 
        
        $headers2 = 'From: Joyous Elite Business Advisory <'.$to.'>'. "\r\n";
        $headers2 .= 'MIME-Version: 1.0'. "\r\n";
        $headers2 .= 'Content-Type: text/html; charset=ISO-8859-1'. "\r\n";
        
        mail($email, $subject2, $body2, $headers2);

        $mailResponse['success']= true;
        $mailResponse['status']=200;
        $mailResponse['message']='Thank you for applying';
        echo json_encode($mailResponse);
        exit;
    }else{
        $mailResponse['success']= false;
        $mailResponse['status']=200;
        $mailResponse['message']='Error in sending mail';
        echo json_encode($mailResponse);
		exit;
    }
} 
?>