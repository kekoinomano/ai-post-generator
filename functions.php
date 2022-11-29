<?php
if (!function_exists('return_json')){
    /**
     * return_json
     * 
     * @param array $response
     * @return json
     */
    function return_json($response = array()) {
        header('Content-Type: application/json');
        exit(json_encode($response));
    }
}
if (!function_exists('stripAccents')){
    function stripAccents($str) {
        return strtr(utf8_decode($str), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
    }
}


?>