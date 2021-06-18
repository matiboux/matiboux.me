$(function() {
	$('[data-toggle="popover"]').popover();
	$('[data-toggle="tooltip"]').tooltip();
	
	$.expr[':'].icontains = $.expr.createPseudo(function(arg) {
		return e => $(e).text().toLowerCase().indexOf(arg.toLowerCase()) >= 0;
	});
	$.expr[':'].iequals = $.expr.createPseudo(function(arg) {
		return e => $(e).text().toLowerCase() == arg.toLowerCase();
	});

	const searchHandler = function(value) {
		const $item = $('.timeline-items .item');
		$item.hide();
		
		if (typeof(value) != 'string' || value == '') {
			// window.history.replaceState(null, document.title, document.location.pathname)
			window.history.pushState(null, document.title, document.location.pathname)
			
			$item.show();
		}
		else {
			// window.history.replaceState(null, document.title, document.location.pathname + "#" + value)
			window.history.pushState(null, document.title, document.location.pathname + "#" + value)
			
			const colonindex = value.indexOf(':');
			
			let selector = value.slice(0, colonindex > 0 ? colonindex : 0);
			let search = value.slice(colonindex + 1);
			
			if (selector == '' && $('#timelineSearch [name="searchTagsOnly"]').prop('checked'))
				selector = 'tag';
			
			selector.replace(' ', '_');
			
			if (!selector)
				$item.filter(':icontains("' + search + '")').show();
			else if (selector == 'language')
				$item.find('.' + selector + ':iequals("' + value.slice(value.indexOf(':') + 1) + '")').parents('.item').show();
			else
				$item.find('.' + selector + ':icontains("' + value.slice(value.indexOf(':') + 1) + '")').parents('.item').show();
		}
	};

	$('#timelineSearch [name="searchField"]').keyup(function() {
		searchHandler($(this).val());
	});
	$('#timelineSearch [name="searchTagsOnly"]').change(function() {
		searchHandler($('#timelineSearch [name="searchField"]').val());
	});
	$('#timelineSearch [type="reset"]').click(function() {
		searchHandler("");
	});
	
	const tagLinkHandler = function(e) {
		e.preventDefault();
		const value = $(this).attr('class').split(' ', 1)[0] + ':' + $(this).text().trim().toLowerCase();
		$('#timelineSearch [name="searchField"]').val(value);
		searchHandler(value);
	};
	$('.timeline-items .item a.badge').click(tagLinkHandler);
	$('.timeline-items .item a.language').click(tagLinkHandler);
	$('.timeline-items .item a.tool').click(tagLinkHandler);
	$('.timeline-items .item a.library').click(tagLinkHandler);
	$('.timeline-items .item a.tag').click(tagLinkHandler);
	
	const checkLocation = function() {
		if (document.location.hash) {
			const value = decodeURIComponent(document.location.hash.substring(1));
			$('#timelineSearch [name="searchField"]').val(value);
			searchHandler(value);
		}
	};
	
	window.addEventListener('popstate', checkLocation);
	checkLocation();
});
