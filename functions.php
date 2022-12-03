<?php
if (!function_exists('ai_post_generator_return_json_2')){
    /**
     * return_json
     * 
     * @param array $response
     * @return json
     */
    function ai_post_generator_return_json_2($response = array()) {
        header('Content-Type: application/json');
        exit(json_encode($response));
    }
}
if (!function_exists('ai_post_generator_stripAccents2')){
    function ai_post_generator_stripAccents2($str) {
        return strtr(utf8_decode($str), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
    }
}


?>
