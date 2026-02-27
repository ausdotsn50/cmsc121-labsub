<?php
// TODO: Define the $products multidimensional array

// where each item is also an array of 3 values [name, price, stock]

$products = [
      ["name" => "Kirkland", "price" => 530.00, "stock" => 3],
      ["name" => "Pilot", "price" => 12.75, "stock" => 10],
      ["name" => "AquaFlask", "price" => 1270.22, "stock" => 0],
      ["name" => "Angel's Burger", "price" => 82.00, "stock" => 5],
]
?>

<!DOCTYPE html>
<html>
<head>
    <title>Product Catalog</title>
    <style>
        .container {
            display: flex;
            gap: 20px;
        }
        .card {
            border: 1px solid #ccc;
            padding: 15px;
            width: 200px;
            border-radius: 8px;
        }
    </style>
</head>
<body>

<h2>Product Catalog</h2>

<div class="container">
    <!-- TODO: Loop through products and display cards -->
    <!--If stock = 0 → display:

    Out of Stock (in red)

    If stock ≤ 5 → display:

    Low Stock (orange)

    Otherwise:

    In Stock (green)
     -->

    <?php    
        foreach($products as $p) {
            echo "<div class='card'>";
                echo "<p>".$p["name"]."</p>" ;
                echo "<p>".$p["price"]."</p>" ;
                
                if($p["stock"] == 0) {
                    echo "<p style='color: red'> Out of Stock </p>" ;    
                } else if($p["stock"] <= 5) {
                    echo "<p style='color: orange'> Low Stock </p>" ;  
                } else {
                    echo "<p style='color: green'> In Stock </p>" ;  
                }
                
            
            echo "</div>";
        }
        
    ?>
    
</div>

</body>
</html>
