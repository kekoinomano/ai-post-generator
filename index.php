<?php
/**
 * Plugin Name: AI Post Generator
 * Description: With this plugin you can generate posts written by AI
 * Version:     1.0.0
 * Author:      Kekotron
 * Author URI:  https://miportfolio.wakeapp.org
 * Text Domain:  ai-post-generator
 *
 *
 * @package    AIPostGenerator
 * @since      1.0.0
 * @copyright  Copyright (c) 2021, Kekotron
 * @license    GPL-2.0+
 */

// Plugin directory
define( 'AI_POST_GENERATOR_PLUGIN_DIR' , plugin_dir_path( __FILE__ ) );
define( 'AI_POST_GENERATOR_PLUGIN_URL' , plugin_dir_url( __FILE__ ) );

// Plugin files
require_once( AI_POST_GENERATOR_PLUGIN_DIR . '/inc/insert-head.php' );	// Insert code (head)
require_once( AI_POST_GENERATOR_PLUGIN_DIR . '/inc/insert-body.php' );	// Insert code (body)


