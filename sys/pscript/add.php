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

if(substr($url,0, 4) !== "http")
{ $url = "https://" . $url; }

if(filter_var($url, FILTER_VALIDATE_URL) === FALSE)
{ endFail(-2); }

if(!isset($_GET['flags']))
{ endFail(); }

$flags = $_GET['flags'];

if(!isset($_GET['type']))
{ endFail(); }

$type = $_GET['type'];

if(($type !== "get") && ($type !== "post"))
{ endFail(); }

if(!isset($_GET['active']))
{ endFail(); }

if(!(($_GET['active'] === "1") || ($_GET['active'] === "0")))
{ endFail(); }

$active = (int) $_GET['active'];

$myfile = fopen("../../live/var/telosAPIList.json", "r") or die("Unable to open file!");
$content = fread($myfile,filesize("../../live/var/telosAPIList.json"));
fclose($myfile);

$jFile = json_decode($content);

$i = count($jFile);

array_push($jFile, new stdClass());
$jFile[$i]->url = $url;
$jFile[$i]->flags = $flags;
$jFile[$i]->active = $active;
$jFile[$i]->type = $type;

$myfile = fopen("../../live/var/telosAPIList.json", "w") or die("Unable to open file!");
fwrite($myfile, json_encode($jFile));
fclose($myfile);

header('Content-Type: application/json');
echo '{"success": ' . '1' . ', "data": ' . json_encode($jFile) . '}';
exit();

?>