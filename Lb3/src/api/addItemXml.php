<?
ob_end_clean();
header('content-type: application/json;charset=utf-8');
$inputJsonData = file_get_contents("php://input");
$inputJson = json_decode($inputJsonData);
$id = $inputJson->id;
$name = $inputJson->name;
$email = $inputJson->email;
$value = $inputJson->value;
$exXml = $inputJson->xml;
$id++;
$newxml = new domDocument("1.0", "utf-8");
$newxml->load($exXml);
$items = $newxml->documentElement;
$item = $items->appendChild($newxml->createElement('item'));
$item->appendChild($newxml->createElement('id', $id));
$item->appendChild($newxml->createElement('name', $name));
$item->appendChild($newxml->createElement('email', $email));
$item->appendChild($newxml->createElement('value', $value));
$newxml->preserveWhiteSpace = false;
$newxml->formatOutput = true;
$newxml->save($exXml);

?>