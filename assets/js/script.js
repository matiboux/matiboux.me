$(function() {
	$('[data-toggle="popover"]').popover();
	$('[data-toggle="tooltip"]').tooltip();
});

$.expr[':'].icontains = $.expr.createPseudo(function(arg) {
    return function(e) {
        return $(e).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

var searchHandler = function(value) {
	var $item = $('.timeline-items .item');
	$item.hide();
	
	if(typeof(value) != 'string' || value == '')
		$item.show();
	else
	{
		var colonindex = value.indexOf(':');
		
		var selector = value.slice(0, colonindex > 0 ? colonindex : 0);
		var search = value.slice(colonindex + 1);
		
		if(selector == '' && $('#timelineSearch [name="searchTagsOnly"]').prop('checked'))
			selector = 'tags';
		
		selector.replace(' ', '_');
		
		console.log(selector);
		console.log(search);
		
		if(selector != '')
			$item.find('.' + selector + ':icontains("' + value.slice(value.indexOf(':') + 1) + '")').parents('.item').show();
		else
			$item.filter(':icontains("' + search + '")').show();
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

$('.timeline-items .item .tags a').click(function(e) {
	e.preventDefault();
	var value = $(this).attr('href').substring(1);
	$('#timelineSearch [name="searchField"]').val(value);
	searchHandler(value);
});

$('.timeline-items .item a.badge').click(function(e) {
	e.preventDefault();
	var value = $(this).attr('class').split(' ', 1)[0] + ':' + $(this).text().trim().toLowerCase();
	$('#timelineSearch [name="searchField"]').val(value);
	searchHandler(value);
});
