<?php $filename = 'messages.csv'; ?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Angela's Freedom Board</title>
	<link rel="stylesheet" href="style.css"/>

</head>
<body>
    <h1>Freedom Board</h1>

    <!-- Action points to the processing file -->
	<!-- Note that when the form gets submitted, the form data
			is processed by post_message.php.
	-->
	<!-- TODO: Task 1 - Ensure that the form is submitted
				using the POST method. The message and the name of the
				poster must be available via $_POST["name"] and
				$_POST["message"] at the server side.
	-->
    <form action="post_message.php" method="POST">
        <input type="text" placeholder="Your Name" name="name" required ><br><br>
        <textarea placeholder="Write a message..." name="message" required ></textarea><br><br>
        <button type="submit">Post to Board</button>
    </form>

    <hr>
    <h2>Recent Messages</h2>
    <?php
    if (file_exists($filename)) {
        $file = fopen($filename, 'r');
        // Loop through each row of the CSV to display it
        while (($row = fgetcsv($file, 0, ',', '"', '')) !== FALSE) { // Fix on depracated value
            // $row[0] = Name, $row[1] = Message, $row[2] = Timestamp
            echo "<div class='post'>";
            echo "<strong>" . htmlspecialchars($row[0]) . "</strong>: " . htmlspecialchars($row[1]);
            echo "<div class='meta'>Posted on: " . $row[2] . "</div>";
            echo "</div>";
        }
        fclose($file);
    } else {
        echo "<p>No messages yet. Be the first to post!</p>";
    }
    ?>
</body>
</html>
