<?php

function endFail($val=0)
{
	header('Content-Type: application/json');
	echo '{"success": ' . $val . ', "data": null}';
	exit();
}

if(!isset($_GET['url']))
{ endFail(); }

$url = $_GET['url'];

if(filter_var($url, FILTER_VALIDATE_URL) === FALSE)
{ endFail(-2); }

$myfile = fopen("../../live/var/telosAPIList.json", "r") or die("Unable to open file!");
$content = fread($myfile,filesize("../../live/var/telosAPIList.json"));
fclose($myfile);

$jFile = json_decode($content);

//find url and remove
for($i=0; $i<count($jFile); $i++)
{
	if($url === $jFile[$i]->url)
	{ unset($jFile[$i]); }
}

//re-index array
$jFile = array_values($jFile);

$myfile = fopen("../../live/var/telosAPIList.json", "w") or die("Unable to open file!");
fwrite($myfile, json_encode($jFile));
fclose($myfile);

header('Content-Type: application/json');
echo '{"success": ' . '1' . ', "data": ' . json_encode($jFile) . '}';
exit();

?>