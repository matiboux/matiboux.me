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
	$('.timeline-items .item').hide();
	
	var value = (typeof(value) == "string") ? value : $('#timelineSearch [name="searchField"]').val();
	console.log(value);
	if(value != "") {
		if($('#timelineSearch [name="searchTagsOnly"]').prop('checked'))
			$('.timeline-items .item .tags:icontains("' + value + '")').parents('.item').show();
		else
			$('.timeline-items .item:icontains("' + value + '")').show();
	}
	else
		$('.timeline-items .item').show();
};

$('#timelineSearch [name="searchField"]').keyup(function() {
	searchHandler($(this).val());
});
$('#timelineSearch [name="searchTagsOnly"]').change(searchHandler);
$('#timelineSearch [type="reset"]').click(function() {
	searchHandler("");
});
