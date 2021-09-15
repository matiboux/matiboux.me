$(function()
{
	const $toggleBtn = $('.cv-items .toggle-btn');

	$toggleBtn.each(function()
	{
		const $this = $(this);
		$this.html($this.attr('data-text-toggle-on'));
		$this.css({ cursor: 'pointer' });
	});

	$toggleBtn.click(function(e)
	{
		e.preventDefault();
		const $this = $(this);
		const $toggle = $this.parent().children('.toggle');

		if ($toggle.css('display') === 'none')
		{
			$toggle.css('display', '');
			$this.html($this.attr('data-text-toggle-off'));
		}
		else
		{
			$toggle.css('display', 'none');
			$this.html($this.attr('data-text-toggle-on'));
		}
	});
});
