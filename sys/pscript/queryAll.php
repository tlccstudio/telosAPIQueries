<?php

function endFail($val=0)
{
	header('Content-Type: application/json');
	echo '{"success": ' . $val . ', "data": null}';
	exit();
}

$myfile = fopen("../../live/var/telosAPIList.json", "r") or die("Unable to open file!");
$content = fread($myfile,filesize("../../live/var/telosAPIList.json"));
fclose($myfile);

$jFile = json_decode($content);
$oRet = new Stdclass();

$oRet->success = 1;
$oRet->data = $jFile;

header('Content-Type: application/json');
echo json_encode($oRet);
exit();

?>