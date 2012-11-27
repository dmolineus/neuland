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

// we use it because during the install process the BackendUser is not loaded
// and the fallback to the default theme does not work.
// Usually it's not an issue. only if the user, who install the theme has already
// chosen it because he is reinstalling it 
$GLOBALS['TL_CONFIG']['backendTheme'] = 'default';