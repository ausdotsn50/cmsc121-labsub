<?php
// TODO: Define and initialize the following variables
// $firstName
// $lastName
// $age
// $course
// $gwa

    $firstName='Angela Denise';
    $lastName='Almazan';
    $age=20;
    $course='Computer Science';
    $gwa='1.76';
?>

<!DOCTYPE html>
<html>
<head>
    <title>Profile Page</title>
    <style>
        .card {
            width: 400px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
        }
        .badge {
            padding: 5px 10px;
            border-radius: 5px;
            color: white;
        }
    </style>
</head>
<body>

<div class="card">
    <h1>
        <?php echo $firstName . " " . $lastName ?>
    </h1>

    <p>Course: 
        <?php echo $course ?>
    </p>
    
    <!-- TODO: Add conditional badge for Minor / Adult / Senior -->
    <p>Age: 
        <?php 
            if($age > 0 && $age < 18) {
                echo "Minor";
            }
            else if($age > 18 && $age < 65) {
                echo "Adult";
            }
            else {
                echo "Senior";
            }
        ?>
    </p>

    <!-- TODO: If GWA <= 1.75, display "With Academic Distinction" -->
    <p>GWA: 
        <?php
            if($gwa <= 1.75) {
                echo $gwa . " | With Academic Distinction";
            }
            else {
                echo $gwa;
            }
        ?>
    </p>
</div>

</body>
</html>
