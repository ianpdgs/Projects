<?php
    include "conn.php";
    session_start();

    if(isset($_POST['reg_button'])){

      $name=$_POST['nm'];
      $email=$_POST['email'];
      $password=$_POST['pass'];
      $phone_number=$_POST['pn'];

      $insertcustomer=mysqli_query($conn, "INSERT INTO customer VALUES('0', '$name', '$email', '$password', '$phone_number')");
 
        if($insertcustomer==true){
          ?>
          <script>
            alert("Account Accepted! Welcome Users");
            window.location.href="index.php";
          </script>
          <?php

    }else{
          ?>
          <script>
            alert("Account Accepted! Welcome Users");
            window.location.href="reg.php";
          </script>
          <?php
            
        } 
    }

    if(isset($_POST['login'])){
        $email=$_POST['login_email'];
        $password=$_POST['login_pass'];
  
        $check=mysqli_query($conn,"SELECT * FROM customer WHERE email='$email' AND password='$password'");
  
        $num=mysqli_num_rows($check);
  
        if($num >=1){
  
          $_SESSION['email']=$email;
          ?>
          <script>
            
            window.location.href="homepage.php";
          </script>
  
          <?php
          
        }else{
          ?>
          <script>
            alert("error");
            window.location.href="index.php";
          </script> 
  
          <?php
          
        }
  
      }