$(function()
{
	const $toggleBtn = $('.cv-items .toggle-btn');
	$toggleBtn.css({ cursor: 'pointer' });

	const isToggleVisible = function($toggle)
	{
		let isVisible = true;
		$toggle.each(function()
		{
			if ($(this).css('display') === 'none')
			{
				isVisible = false;
				return false; // Break
			}
		});

		return isVisible;
	};

	$toggleBtn.each(function()
	{
		const $this = $(this);
		const $toggle = $this.parent().children('.toggle');

		const isVisible = isToggleVisible($toggle);
		if (isVisible)
			$this.html($this.attr('data-text-toggle-off'));
		else
			$this.html($this.attr('data-text-toggle-on'));
	});

	$toggleBtn.click(function(e)
	{
		e.preventDefault();
		const $this = $(this);
		const $toggle = $this.parent().children('.toggle');

		const isVisible = isToggleVisible($toggle);
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
