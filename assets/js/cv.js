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

		let isVisible = true;
		$toggle.each(function()
		{
			if ($(this).css('display') === 'none')
			{
				isVisible = false;
				return false; // Break
			}
		})

		if (!isVisible)
		{
			$toggle.css('display', ''); // Toggle on
			$this.html($this.attr('data-text-toggle-off'));
		}
		else
		{
			$toggle.css('display', 'none'); // Toggle off
			$this.html($this.attr('data-text-toggle-on'));
		}
	});
});
