<?php


$manifest = file_get_contents('./public/js/manifest.json');
$decoded = json_decode($manifest, true);
header("Location: ./public/js{$decoded['main.js']}", 302);
