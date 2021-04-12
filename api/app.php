<?php
require_once 'headers.php';

$conn = new mysqli('localhost', 'root', '', 'tictacdo_db');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {  //id used to fetch single row
        $id = $conn->real_escape_string($_GET['id']);
        $sql = $conn->query("SELECT * FROM tasks WHERE id = '$id'");
        $data = $sql->fetch_assoc();
    } else { //fetch all rows
        $data = array();
        $sql = $conn->query("SELECT * FROM tasks");
        while  ($d = $sql->fetch_assoc()) {
            $data[] = $d;
        }
    }

    exit(json_encode($data)); //return json data
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $sql = $conn->query("INSERT INTO tasks (title, subtitle, content) VALUES ('".$data->title.
    "', '".$data->subtitle."', '".$data->content."')");
    if ($sql) {
        $data->id = $conn->insert_id; //append id to the data object
        exit(json_encode($data));
    } else {
        exit(json_encode(array('status' => 'error')));
    
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (isset($_GET['id'])) {  
    $id = $conn->real_escape_string($_GET['id']);
    $data = json_decode(file_get_contents("php://input"));
    $sql = $conn->query("UPDATE tasks SET title = '".$data->title."', subtitle = '".$data->subtitle."',  content = '".$data->content."' WHERE id = '$id'");
    if ($sql) {
        exit(json_encode(array('status' => 'success')));
    } else {
        exit(json_encode(array('status' => 'error')));
    }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['id'])) { 
    $id = $conn->real_escape_string($_GET['id']);   
    $sql = $conn->query("DELETE FROM tasks WHERE id = '$id'");
    if ($sql) {
        exit(json_encode(array('status' => 'success')));
    } else {
        exit(json_encode(array('status' => 'error')));
    }
} 
}