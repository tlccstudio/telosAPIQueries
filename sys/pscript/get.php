<?php

function endFail($val=0)
{
	header('Content-Type: application/json');
	echo '{"success": ' . $val . ', "data": null}';
	exit();
}

if(!isset($_GET['flag']))
{ endFail(); }

$flag = $_GET['flag'];

$myfile = fopen("../../live/var/telosAPIList.json", "r") or die("Unable to open file!");
$content = fread($myfile,filesize("../../live/var/telosAPIList.json"));
fclose($myfile);

$jFile = json_decode($content);

//find url and set
for($i=0; $i<count($jFile); $i++)
{
	$flags = explode(",", $jFile[$i]->flags);
	
	if($jFile[$i]->active === 1)
	{
		if(in_array($flag, $flags))
		{
			header('Content-Type: application/json');
			echo '{"success": ' . '1' . ', "data": "' . $jFile[$i]->url . '"}';
			exit();
		}
	}
}

endFail(-1);

?>