<?php
	

    /**
     * Create the administration menus in the left-hand nav and load the JavaScript conditionally only on that page
     */
    if (!function_exists('ai_post_generator_add_my_admin_menus')){
	    function ai_post_generator_add_my_admin_menus(){
	        $my_page =  add_menu_page('Create post', 'AIPost', 'manage_options', 'ai_post_generator', 'ai_post_generator_add_integration_code_body', 'dashicons-plus');
		    // Load the JS conditionally
		    add_action( 'load-' . $my_page, 'load_admin_ai_post_generator_js' );
		}	
    	add_action( 'admin_menu', 'ai_post_generator_add_my_admin_menus' ); // hook so we can add menus to our admin left-hand menu
    }
    if (!function_exists('load_admin_ai_post_generator_js')){
	    // This function is only called when our plugin's page loads!
	    function load_admin_ai_post_generator_js(){
	        // Unfortunately we can't just enqueue our scripts here - it's too early. So register against the proper action hook to do it
	        add_action( 'admin_enqueue_scripts', 'ai_post_generator_enqueue_css_js' );
	    }
	}
	if (!function_exists('ai_post_generator_return_json')){
	    function ai_post_generator_return_json($response = array()) {
		    header('Content-Type: application/json');
		    exit(json_encode($response));
		}
	}

	if (!function_exists('ai_post_generator_stripAccents')){
		function ai_post_generator_stripAccents($str) {
		    return strtr(utf8_decode($str), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
		}
	}
	if (!function_exists('ai_post_generator_data_Publish')){
		function ai_post_generator_data_Publish() {
		  	if (!isset($_POST['text']) || !isset($_POST['title'])){
			  ai_post_generator_return_json( array('exito' => false, 'error' => 'Mensaje vacío') );
			}

			$title = wp_strip_all_tags($_POST['title']);
			$url = trim(preg_replace('/[^a-z0-9-]+/', '-', ai_post_generator_stripAccents(strtolower($title))), '-');

			$my_post = array(
				'post_title' => $title,
				'post_url' => $url,
				'post_content' => $_POST['text'],
				'post_status' => $_POST['type'],
				'post_author' => 1
			);

			$id = wp_insert_post( $my_post );
			ai_post_generator_return_json( array('exito' => true, 'url' => $url, 'id' => $id) );
		}
		add_action('wp_ajax_ai_post_generator_data_Publish', 'ai_post_generator_data_Publish');
	}


if (!function_exists('ai_post_generator_enqueue_css_js')){
	/**
	 * Enqueues the CSS and JS
	 *
	 * @since  1.0.0
	 * @author Your Name
	 * @return void
	 */
	function ai_post_generator_enqueue_css_js() {

	    // Create version codes
		$my_css_ver = date('Ymd-Gis', filemtime( AI_POST_GENERATOR_PLUGIN_DIR . 'css/my-styles.css' ));	
		$my_css_checkout = date('Ymd-Gis', filemtime( AI_POST_GENERATOR_PLUGIN_DIR . 'css/checkout.css' ));
		$my_css_bootstrap = date('Ymd-Gis', filemtime( AI_POST_GENERATOR_PLUGIN_DIR . 'css/bootstrap.min.css' ));
	    $my_js_ver  = date('ymd-Gis', filemtime( AI_POST_GENERATOR_PLUGIN_DIR . 'js/my-functions.js' ));
	    $my_js_checkout  = date('ymd-Gis', filemtime( AI_POST_GENERATOR_PLUGIN_DIR . 'js/checkout.js' ));
	    $my_js_bootstrap  = date('ymd-Gis', filemtime( AI_POST_GENERATOR_PLUGIN_DIR . 'js/bootstrap.bundle.min.js' ));
	    $my_js_jquery  = date('ymd-Gis', filemtime( AI_POST_GENERATOR_PLUGIN_DIR . 'js/jquery.min.js' ));
	    $my_js_circle  = date('ymd-Gis', filemtime( AI_POST_GENERATOR_PLUGIN_DIR . 'js/circle-progress.min.js' ));

		// Enqueue the stylesheet
		wp_enqueue_style(
			'my-styles',
			trailingslashit( AI_POST_GENERATOR_PLUGIN_URL ) . "css/my-styles.css",
			null,
			$my_css_ver
		);
		wp_enqueue_style(
			'my-styles1',
			trailingslashit( AI_POST_GENERATOR_PLUGIN_URL ) . "css/checkout.css",
			null,
			$my_css_checkout
		);
		wp_enqueue_style(
			'my-styles2',
			trailingslashit( AI_POST_GENERATOR_PLUGIN_URL ) . "css/bootstrap.min.css",
			null,
			$my_css_bootstrap
		);
		wp_enqueue_style(
			'my-styles3',
			"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
			null,
			null
		);
		
		// Enqueue the script
		wp_enqueue_script(
			'my-functions1',
			trailingslashit( AI_POST_GENERATOR_PLUGIN_URL ) . "js/jquery.min.js",
			null,
			$my_js_jquery,
			true
		);
		wp_enqueue_script(
			'my-functions2',
			trailingslashit( AI_POST_GENERATOR_PLUGIN_URL ) . "js/bootstrap.bundle.min.js",
			null,
			$my_js_bootstrap,
			true
		);		
		wp_enqueue_script(
			'my-functions3',
			trailingslashit( AI_POST_GENERATOR_PLUGIN_URL ) . "js/circle-progress.min.js",
			null,
			$my_js_circle,
			true
		);
		wp_enqueue_script(
			'my-functions4',
			trailingslashit( AI_POST_GENERATOR_PLUGIN_URL ) . "js/my-functions.js",
			null,
			$my_js_ver,
			true
		);
		// Enqueue the script
		wp_enqueue_script(
			'my-functions5',
			trailingslashit( AI_POST_GENERATOR_PLUGIN_URL ) . "js/checkout.js",
			null,
			$my_js_checkout,
			true
		);
	}
}
if (!function_exists('ai_post_generator_add_integration_code_head')){
	/**
	 * Insert Code into HTML head
	 *
	 * @since  1.0.0
	 * @author Your Name
	 */
	function ai_post_generator_add_integration_code_head() {
		?>
		<!-- More Integration Code -->
		<meta charset="utf-8">	
	    <script src="https://js.stripe.com/v3/"></script>

		<?php
	}
	add_action( 'admin_head', 'ai_post_generator_add_integration_code_head' );
}

