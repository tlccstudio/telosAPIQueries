<?php

function endFail($val=0)
{
	header('Content-Type: application/json');
	echo '{"success": ' . $val . ', "data": null}';
	exit();
}

if(!isset($_GET['index']))
{ endFail(); }

$index = (int) $_GET['index'];

if($index < 0)
{ endFail(); }


$myfile = fopen("../../live/var/telosAPIList.json", "r") or die("Unable to open file!");
$content = fread($myfile,filesize("../../live/var/telosAPIList.json"));
fclose($myfile);

$jFile = json_decode($content);
$aNew = [];

array_push($aNew, $jFile[$index]);

//find url and set
for($i=0; $i<count($jFile); $i++)
{
    if($index === $i) //skip
    {}
    else
    { array_push($aNew, $jFile[$i]); }
}

$myfile = fopen("../../live/var/telosAPIList.json", "w") or die("Unable to open file!");
fwrite($myfile, json_encode($aNew));
fclose($myfile);

header('Content-Type: application/json');
echo '{"success": ' . '1' . ', "data": ' . json_encode($aNew) . '}';
exit();

?>