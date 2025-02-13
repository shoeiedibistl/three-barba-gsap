import $ from 'jquery';

export const inputReset = () => {
  const inputsContainers = $('[data-input-parent]');
  if (inputsContainers.length > 0) {
    inputsContainers.each(function () {
      const container = $(this);
      const input = container.find('[data-input]');
      const reset = container.find('.custom-placeholder__reset');
      if (!input.length) return;

      if (reset.length) {
        reset.on('click', function () {
          input.val('');
          input.trigger('input');
          container.removeClass('filled');
        });
      }
    });
  }
};
