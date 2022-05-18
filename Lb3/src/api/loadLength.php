<?
ob_end_clean();
header('content-type: application/json;charset=utf-8');
$inputJsonData = file_get_contents("php://input");
$inputJson = json_decode($inputJsonData);
$fR = $inputJson->fR;
if (file_exists($fR)) {
    $xml = simplexml_load_file($fR);
} else{
    exit('Не удалось открыть файл');
}
$eR = count($xml);
echo json_encode($eR, JSON_UNESCAPED_UNICODE);
?>