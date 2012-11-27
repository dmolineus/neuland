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


 /**
  * Replace default BackendUser to inject a different be_main template for the neuland theme
  * 
  */
class BackendUser extends Contao\BackendUser
{
	/**
	 * make sure that neuland can be set as default theme. for supporting it
	 * we use the login method to lazy load the default theme on the login page
	 * 
	 */
	public function login()
	{
		// default.php set the default theme
		if($GLOBALS['TL_CONFIG']['backendTheme'] == 'neuland')
		{
			$this->lazyLoadNeulandTheme();
		}
		
		return parent::login();
	}
	
	
	/**
	 * set User From Db loads theme setting. so we use it to find out if we have to inject our template
	 */
	protected function setUserFromDb()
	{
		parent::setUserFromDb();
		
		if(Controller::getTheme() == 'neuland')
		{
			$this->lazyLoadNeulandTheme();
		}	
	}
	
	
	/**
	 * lazy load the neuland theme and set fallback to the default theme
	 * 
	 */
	protected function lazyLoadNeulandTheme()
	{
		// we have to check if extension is be deinstalled...
		if(\Input::get('do') == 'repository_manager' && \Input::get('uninstall') == 'neuland' && \Input::post('repository_submitbutton') != null)
		{
			// let's reset the backend theme
			$this->backendTheme = 'default';
			return;			
		}
	
		TemplateLoader::addFiles(array
		(
			'be_main'       => 'system/modules/neuland/templates',
			'be_login'       => 'system/modules/neuland/templates',
		));
		
		// we also set theme back to default because we only extend the main theme
		// paths to neuland files are hard coded in the template
		$GLOBALS['TL_CONFIG']['backendTheme'] = 'default';
		$GLOBALS['TL_CONFIG']['useNeulandTheme'] = true;
		
		// require usage of Font Awesome
		$GLOBALS['TL_CONFIG']['requireFontAwesome'] = true;
		$GLOBALS['TL_CONFIG']['requireImprovedTheme'] = true;
	}

}
