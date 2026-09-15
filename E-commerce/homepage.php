<?php
  include "conn.php";
  session_start();
?>
  
  
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="design.css">
  <title>Nyx Shop</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>
<body>
  
  <div class="head">
    <a href="#"><img src="img/nyx online shop.png" class="logo"></a>
    
    <div>
      <ul id="nav" class="navbar">
        <li><a href="homepage.php">Home</a></li>
        <li><a href="shop.php">Shop</a></li>
        <li><a href="about.php">About</a></li>
        <li><a href="contact.php">Contact</a></li>
        <li><a href="index.php">Logout</a></li>
        <li id="lg-bag"><a href="cart.php"><i class="fa-solid fa-cart-shopping"></i></a></li>
        <a href="#" id="close"><i class="fa-solid fa-xmark"></i></a>
      </ul>
    </div>
    <div id="mobile">
      <a href="cart.php"><i class="fa-solid fa-cart-shopping"></i></a>
      <i id="bar" class="fa-solid fa-bars"></i>
    </div>
  </div>
  
  <div class="home">
    <h4>Bakal Na</h4>
    <h2>Super Value Deals</h2>
    <h1>On All Products</h1>
    <p>Bakal Na </p>
    <button>Shop Now</button>
  </div>
  
  <div class="contain sect-p1">
    <h2>Featured products</h2>
    <p>Summer Collection</p>
    <div class="pro-con">
      <div class="con">
        <img src="img/lala.jpg">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/basketball.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/basketball.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/basketball.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/basketball.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/basketball.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/socks3.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/cup.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
    </div>
  </div>
  
  
  <div class="banner sect-m1">
    <h4>Offers</h4>
    <h2>Up To <span>80% off</span> All t-shirts and Items</h2>
    <button class="normal">Explore More</button>
  </div>
  
  
  <div class="contain sect-p1">
    <h2>New Arrivals</h2>
    <p>Summer Collection</p>
    <div class="pro-con">
      <div class="con">
        <img src="img/cup5.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/dunkhigh.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/socks12.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/short4.jpg">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/p12.jpg">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/slipper1.png">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/bag9.jpg">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
      <div class="con">
        <img src="img/pants.jpg">
        <div class="des">
          <span>Didas ah</span>
          <h4>Bayo Ni ralp</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>700</h4>
        </div>
        <a href=""><i class="fa-solid fa-cart-plus cart"></i></a>
      </div>
    </div>
  </div>
  
  <div class="sm-banner sect-p1">
    <div class="banner-box">
      <h4>Crazy Deals</h4>
      <h2>Buy 1 get 1 free</h2>
      <span>The best classic dree and T-Shirt</span>
      <button class="white">Learn More</button>
    </div>
    <div class="banner-box box-2">
      <h4>Seasonal Sale</h4>
      <h2>Summer Collection 50% Off</h2>
      <span>The best classic dree and T-Shirt</span>
      <button class="white">Learn More</button>
    </div>
  </div>
  
  <footer class="sect-p1">
    <div class="col">
      <img class="logo" src="img/log.jpg">
      <h4>Contact</h4>
      <p>Address: Brgy Rizal</p>
      <p>Phone Number: 098472727</p>
    </div>
    <div class="follow">
      <h4>Follow Us</h4>
      <div class="icon">
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-tiktok"></i>
        <i class="fa-brands fa-instagram"></i>
      </div>
    </div>
    
    <div class="col">
      <h4>About</h4>
      <p>About us</p>
      <p>Privacy Policys</p>
      <p>Terms & Conditions</p>
      <p>Contact Us</p>     
    </div>
    
    <div class="col">
      <h4>My Account</h4>
      <p>Sign In</p>
      <p>View Cart</p>
      <p>My Wishlsit</p>
      <p>Help</p>     
    </div>
    
    <div class="copyright">
      <p>2022 Copyright Html Css And Javascript Projects </p>
    </div>
  </footer>
  
  <script src="script.js"></script>


</body>
</html>