/*
	var resize = document.getElement('#resize');
	resize.setStyle('position', 'fixed');
	resize.setStyle('color', '#666');	
	resize.setStyle('top', '70px');
	resize.setStyle('left', '310px');
	resize.setStyle('cursor', 'pointer');
	resize.setStyle('z-index', '500');
	resize.setStyle('transform', 'rotate(90deg)');
	
	resize.makeDraggable({
		limit: {x : [250,document.getSize().x - 900]},
		modifiers : {'x': 'left', 'y': false},
		
		onDrag: function(el) {
			$('left').setStyle('width', el.getPosition().x-30 + 'px');
			$('container').setStyle('margin-left', el.getPosition().x - 10 + 'px');
			//alert(el.getPosition().x);	
			//window.fireEvent('resize');
			this.scrollTo(0, 1);
		},
	});*/