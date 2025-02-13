import $ from 'jquery';

export const accordion = () => {
  const $accordions = $('.accordion-ui');
  if ($accordions.length === 0) return;

  $('.accordion-ui__header').click(function () {
    const $content = $(this).next('.accordion-ui__content');
    const $allContent = $('.accordion-ui__content');

    if ($content.is(':visible')) {
      $(this).removeClass('active');
      $content.slideUp();
    } else {
      $('.accordion-ui__header').removeClass('active');
      $allContent.slideUp();
      $(this).addClass('active');
      $content.slideDown();
    }
  });

  const accordionContainer = $('[data-accordion-container]');
  if (accordionContainer.length === 0) return;
  accordionContainer.on('click', '.accordion-ui__header', function () {
    accordionContainer.find('.accordion-ui').not($(this).parent()).removeClass('active');
  });
};
