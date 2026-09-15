<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Login </title>


</head>  

<body>
    <h1>Haven't Account yet? Just Click Register.</h1>

    <h1>Log in</h1>
    <form action="process.php" method="POST">
        <label>Email</label><br>
        <input type="email" name="login_email" required placeholder="Enter Email Here!...">
        <br><br>

        <label>Password</label><br>
        <input type="password" name="login_pass" required placeholder="Enter Password Here!...">
        <br><br>

        <input type="submit" name="login" value="LOGIN">
    </form>

    <p><a href="reg.php">Click Here to Register</a></p>
</body>
</html>
