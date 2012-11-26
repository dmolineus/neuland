<?php

/**
 * Contao Open Source CMS
 * 
 * Copyright (C) 2005-2012 Leo Feyer
 * 
 * @package   neuland 
 * @author    David Molineus <http://www.netzmacht.de>
 * @license   GNU/LGPL 
 * @copyright Copyright 2012 David Molineus netzmacht creative 
 *  
 **/

// we do some icon replacement in the templates so we can set the configs to phpOnly
$GLOBALS['ICON_REPLACER']['navigation']['phpOnly'] = true;

// define hooks
$GLOBALS['TL_HOOKS']['parseTemplate'][] = array('Netzmacht\Neuland\NeulandTheme', 'initialize');
