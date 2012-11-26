<?php

/**
 * Contao Open Source CMS
 * 
 * Copyright (C) 2005-2012 Leo Feyer
 * 
 * @package News
 * @link    http://contao.org
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */

 /**
 * Register the namespaces
 */
ClassLoader::addNamespace('Netzmacht');

/**
 * Register the classes
 */
ClassLoader::addClasses(array
(
	// Classes
	'BackendUser' => 'system/modules/neuland/classes/BackendUser.php',
	'Netzmacht\Neuland\NeulandTheme' => 'system/modules/neuland/classes/NeulandTheme.php'
));
