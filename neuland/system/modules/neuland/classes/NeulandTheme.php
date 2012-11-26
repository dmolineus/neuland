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

namespace Netzmacht\Neuland;
use Backend;
 
class NeulandTheme extends Backend
{
	
	/**
	 * define hook for parseTemplate to assign default template vars
	 * 
	 * @param BackendTemplate
	 * @param string template NAme
	 */
	public function initialize($objTemplate)
	{
		if(TL_MODE != 'BE' || !$GLOBALS['TL_CONFIG']['useNeulandTheme']) 
		{
			return;
		}
		
		if($objTemplate->getName() == 'be_main')
		{
			$this->loadLanguageFile('default');
		
			$objTemplate->neulandMenuTitle = $GLOBALS['TL_LANG']['MSC']['neulandMenuTitle'];
			$objTemplate->neulandFilterTitle = $GLOBALS['TL_LANG']['MSC']['neulandFilterTitle'];			
		}
	}
	
}
