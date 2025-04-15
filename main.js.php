<?php

/**
 * DO NOT REMOVE - this is used by chums.com/pages/careers
 */

$manifest = file_get_contents('./public/js/manifest.json');
$decoded = json_decode($manifest, true);
header("Location: ./public/js{$decoded['main.js']}", 302);
