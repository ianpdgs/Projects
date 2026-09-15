<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Register</title>
</head>




<body>
    <h1>REGISTRATION </h1>

    <form action="process.php" method="POST">

            <label>Name: </label> </br>
            <input type="text" name="nm" required placeholder="Enter your Name..."> </p>
            
            <label>Email: </label> </br>
            <input type="email" name="email" required placeholder="Enter your Email..."> </p>

            <label>Password: </label> </br>
            <input type="password" name="pass" required placeholder="Enter your Password..."> </p>

            <label>Phone Number: </label> </br>
            <input type="text" name="pn" required placeholder="Enter your Phone Number..."> </p>

            <input type="submit" name="reg_button" value="REGISTER">

    </form>

    <p><a href="index.php">Click Here to Login!</a></p>
    
</body>
</html>