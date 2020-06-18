$(document).ready(function() {

    $('.header__mobile-menu').click(function(e) {
        e.preventDefault();

        $('.header').toggleClass('header--mobile_opened');
    });

    $('.tel-input').inputmask({
        "mask": "+7 (999) 999-99-99"
        , "placeholder": "_"
        , showMaskOnHover: false
        , showMaskOnFocus: true
    });

    $('.open-modal').click(function(e) {
        e.preventDefault();

        $('#formModal').addClass('modal--opened');
        $('body').addClass('frozen');
    });

    $('.modal').click(function(e) {
        $(this).removeClass('modal--opened');
        $('body').removeClass('frozen');
    });

    $('.modal__close').click(function(e) {
        $(this).parents('.modal').removeClass('modal--opened');
        $('body').removeClass('frozen');
    });

    $('.modal__content').click(function(e) {
        e.stopPropagation();
    });

    $('.services__button').click(function(e) {
        e.preventDefault();
        var block = $(this).parents('.services__item');

        if (!block.hasClass('services__item--opened')) {
            $(this).text('Скрыть');
            block.addClass('services__item--opened');
        }
        else {
            $(this).text('Подробнее');
            block.removeClass('services__item--opened');
        }
    });

    $('.services2__title').click(function(e) {
        e.preventDefault();

        var block = $(this).parents('.services2__item');

        if (!block.hasClass('services2__item--opened')) {
            block.addClass('services2__item--opened');
        }
        else {
            block.removeClass('services2__item--opened');
        }
    });
});


function openThanksModal() {
    $('#thanksModal').addClass('modal--opened');
    $('body').addClass('frozen');
}