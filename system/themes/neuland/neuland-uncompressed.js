/**
 * FilterManager handles filter to dynamically add and hide them
 * 
 */
function FilterManager()
{
	var self = this;
	var disabledFilter = new Array();
	var output = $$('#tl_top_panel')[0];
	var form = $$('.tl_panel').getParent('form')[0];
	var groups = new Array();
	
	self.init = function()
	{
		if(typeof form == 'undefined' || form === null) {
			$$('.add-filter').getParent().hide();
			return;
		}
		
		var filterMenu = $$('.add-filter')[0];
		var submit;
		
		form.getElements('.tl_subpanel').each(function(panel) 
		{		
			// inject search and submit panel to the to
			if(panel.hasClass('tl_search')) 
			{
				// remove old stylect stuff
				panel.getElements('div').destroy();
				panel.inject(form, 'top');
				
				if(typeof submit != 'undefined') 
				{
					submit.inject(form, 'top');
				}
								
				return;
			}
			
			// submit panel fount store it in a var so we can inject it after
			// the search field
			else if(panel.hasClass('tl_submit_panel')) 
			{
				panel.getElement('.tl_img_submit').destroy();
				panel.getElements('div').destroy();
				
				var button = new Element('button');
				var icon = new Element('i');
				
				icon.set('class', 'icon-large icon-refresh');
				icon.inject(button);
				
				button.set('class', 'neuland_submit');
				button.inject(panel, 'bottom');
								
				submit = panel;
				return;	
			}							
			
			// handle groud lists
			var group = new FilterGroup(panel.getElement('strong'), filterMenu, form);
			group.init();
			
			// get elelements
			var selects = panel.getElements('select');

			// go throw each select menu
			selects.each(function(select) 
			{
				group.addNode(select);																															
			});
						
			group.render(form);
			groups.push(group);
			delete(group);				
		});
		
		
		form.getElements('.tl_panel').destroy();	
		form.inject(output, 'top');
		
		disableFilterMenu();
	};
	
	
	/*
	 * create new list element with and a tag inside end return it
	 * 
	 * @param string text
	 * @param string optional class name
	 * @param function optional click action
	 * @return Element li element
	 */
	var createListElement = function(text, className, actionFnc)
	{
		var li = new Element('li');
		var a = new Element('a');		
		
		if(className) {
			a.set('class', className);
		}
		
		if(actionFnc === null)  {
			actionFnc = function(e) { e.stop(); return false }; 
		}
		
		a.appendText(text);
		a.addEvent('click', actionFnc);		  
		a.inject(li);
		
		return li;
	};
	
	
	/**
	 * disable filter menu if no more filter are stored in the list
	 */
	var disableFilterMenu = function()
	{
		var disable = true;

		Object.each(disabledFilter, function(item, key) {
			if(item.length > 0) {
				disable = false;
			}
		});
		
		if(disable) {
			$$('.add-filter').getParent().getElement('.dropdown-toggle').removeEvents('click').addClass('disabled');	
		}
		
	};
	
	
	/**
	 * handles filter groups
	 * 
	 * @param element
	 * @param filterMenu
	 */
	var FilterGroup = function (el, filterMenu, form)
	{	
		var ref = this;
		
		var form = form;
		var groupElement = el;
		var nodes = new Array();
		var groupName;
		var filterMenu = filterMenu;
		var groupGenerated = null;
		
		
		ref.init = function()
		{
			//groupName = groupElement.get('text');
			
			if(typeof disabledFilter[ref.getName()] == 'undefined') 
			{
				disabledFilter[ref.getName()] = new Array();
			}
			
			// clreate group entry in the filter menu
			createListElement(ref.getName(), 'group', null).inject(filterMenu);
		};
		
		
		/**
		 * get name of current group
		 */
		ref.getName = function() 
		{
			return groupElement.get('text');			
		};
		
		/**
		 * add node to element
		 * 
		 * 
		 */
		this.addNode = function(node)
		{
			disabledFilter[ref.getName()].push(node);			
			
			if(!node.getElement('option[selected]'))
			{
				// create list item for menu
				createListElement(node.getElement('option').get('text'), null, function(e) {
					e.stop();				
					
					ref.showNode(node);
					ref.render(form);
												
					this.getParent('.btn-group').removeClass('open');
					this.destroy();
					
					disableFilterMenu();
														
				}).inject(filterMenu);
							
				return false;
			}
				
			return ref.showNode(node);
		};
		
		
		/**
		 * show node
		 * 
		 * @param Element node
		 */
		this.showNode = function(node)
		{
			if(!disabledFilter[ref.getName()].contains(node)) 
			{
				return false;
			}

			if(groupGenerated == null) 
			{
				groupGenerated = new Element('div');
				groupGenerated.set('class', 'tl_subpanel');
				
				var title = new Element('strong');
				title.set('text', ref.getName());				
				title.inject(groupGenerated);
			}

			node.show();
			node.inject(groupGenerated);
			disabledFilter[ref.getName()].erase(node);
			
			return true;
		};
		
		
		/**
		 * render group to target
		 * 
		 * @param target
		 */
		this.render = function()
		{
			if(groupGenerated) {
				groupGenerated.inject(form);	
			}
			
			output.getElements('.tl_subpanel div').destroy();
			Stylect.convertSelects();
		};
	};
}

/**
 * document ready event lets doing all stuff we need to do
 * 
 */
document.addEvent('domready', function() {
	// enabling the dropdown menus
	$$('.dropdown-toggle').addEvent('click', function() {
		var parent = this.getParent();
		
		parent.toggleClass('open');
		
		if(parent.hasClass('open')) {
			var ul = this.getParent().getElement('ul');	
			ul.position( {
				x: this.getCoordinates().right - ul.getSize().x,
				y: this.getParent('#header').getCoordinates().bottom -5, 
			});			
		}
	});	
	
	
	// initialize the filter manager which handles the movement of the filter
	filter = new FilterManager();
	filter.init();

});