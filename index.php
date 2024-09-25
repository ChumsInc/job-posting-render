<?php

use chums\ui\WebUI2;
use chums\ui\CSSOptions;
/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once ("autoload.inc.php");

$ui = new WebUI2([
    'requireLogin' => false,
    'title' => 'Current Openings',
]);
$ui->addCSS('public/main.css', CSSOptions::parse(['useTimestampVersion' => true]))
    ->addManifestJSON('public/js/manifest.json')
    ->render();
