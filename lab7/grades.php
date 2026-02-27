<?php
// TODO: Define the $students associative array
// where key is name, and value is grade
$students = [
    'Angela' => 90,
    'Arjay' => 88,
    'Aubrey' => 60,
    'Anica' => 100,
    'August' => 54,
]
?>

<!DOCTYPE html>
<html>
<head>
    <title>Grades Table</title>
    <style>
        table {
            border-collapse: collapse;
            width: 60%;
            font-family: Arial;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
        }
    </style>
</head>
<body>

<h2>Student Grades</h2>

<!--
    The table must have:

        | Student Name | Grade | Remark |

        Rules:

        Grade ≥ 90 → Excellent

        80–89 → Good

        75–79 → Passing

        Below 75 → Failing

        Use a foreach loop to create <tr> rows dynamically.
    -->


<table>
    <tr>
        <th>Student Name</th>
        <th>Grade</th>
        <th>Remark</th>
    </tr>

    <!-- TODO: Use foreach loop to generate table rows -->
    <?php
        echo "<tbody>";
            foreach($students as $name => $grade) {
                echo "<tr>";
                    echo "<td>".(string)$name."</td>";
                    echo "<td>".(int)$grade."</td>";

                    if($grade >= 90) {
                        echo "<td> Excellent </td>";
                    }
                    else if($grade <= 89 && $grade >=80) {
                        echo "<td> Good </td>";
                    }
                    else if($grade <= 79 && $grade >=75) {
                        echo "<td> Passing </td>";
                    } else if($grade < 75) {
                        echo "<td> Failing </td>";
                    }

                echo "</tr>";
            }
        echo "</tbody>";
    ?>

</table>

<!-- TODO: Display class average -->
<?php
    $class_ave = array_sum($students) / count($students);
    echo "<p> Class average: ".$class_ave."</p>"
?>

</body>
</html>
