<?php
$filename = 'messages.csv';
// Only process if the request is a POST

// TODO: TASK 2 - Check that message and name are not empty, otherwise
//        redirect back to index.php. Use the PHP's empty() function to check 
//        if the variable is set. 

if (empty($_POST["name"]) || empty($_POST["message"])) {
    header("Location: index.php");
    exit(); 
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// TODO: TASK 3 - Get data from $_POST and sanitize it
    // Hint: use htmlspecialchars()
    
    $name = $_POST["name"];
    $message = $_POST["message"];
    $timestamp = date('Y-m-d H:i:s');

    // Sanitize data with htmlspecialchars()
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $new_post = [$name, $message, $timestamp];

    // TODO: TASK 4 - Open the file in Append mode ('a')
	// Hint: 
    // $handle = ???
    if (file_exists($filename)) {
        $handle = fopen($filename, 'a');
        
        // TODO: TASK 5 - Use fputcsv() to save the [$name, $message, $timestamp] array
        fputcsv($handle, $new_post);
    } 

    // TODO: TASK 6 - Close the file handle
     fclose(stream: $handle);

    // Redirect back to main page
    header("Location: index.php");
    exit(); // Always exit after a redirect
} else {
    // TODO: Task 7 - If someone tries to access this file directly via browser (GET), send them back
	//        to index.php
    header("Location: index.php");
    exit(); 
}
?>
