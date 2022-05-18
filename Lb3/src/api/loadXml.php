<?
ob_end_clean();
header('content-type: application/json;charset=utf-8');
$inputJsonData = file_get_contents("php://input");
$inputJson = json_decode($inputJsonData);
$sR = $inputJson->sR;
$eR = $inputJson->eR;
$fR = $inputJson->fR;
if (file_exists($fR)) {
    $xml = simplexml_load_file($fR);
} else{
    exit('Не удалось открыть файл');
}
$output = array();
if($eR > count($xml)){
    $eR = count($xml);
}
for ($i = $sR; $i < $eR; $i++) {
    $output[] = $xml->item[$i];
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
?>