$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1000,
        prevArrow: '<button type="button" class="slick-prev"> <img src="../icons/chevron-left-solid.png"> </button>',
        nextArrow: '<button type="button" class="slick-next"> <img src="../icons/chevron-right-solid.png"> </button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                arrows: false,
              }
            },
        ] 
    });
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $('.catalog-item__link').each(function(i) {
    //  $(this).on('click', function(e) {
    //    e.preventDefault();              /* убираем стандартное поведение ссылки */
    //    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //  })
    //}) 

    //$('.catalog-item__back').each(function(i) {
    //  $(this).on('click', function(e) {                                  
    //    e.preventDefault();
    //    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //  })
    //})
                                /*  снизу более оптимизированный код, суть та же*/

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    
//modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {   //при нажатии на кнопку с классор .button_min
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); //в поле с классом .modal__descr вставляется текст из поля с классом .catalog-item__subtitle
        $('.overlay, #order').fadeIn('slow'); //плавная анимация перечисленных селекторов
      })
    });
    
  //настройка валлидации форм

    function valideForms(form){ //создал функцию с переменной
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2  //минимальное количесво символов в поле ввода
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
          },
        messages: {
          name: {
            required: "Введите ваше имя",
            minlength: jQuery.validator.format("Минимум {0} символа")
          },
          phone: "Введите номер телефона",
          email: {
            required: "Введите адрес почты",
            email: "введите адрес почты, например: name@gmail.com"
          }
        }
      });
    };

    valideForms('#consultation-form'); //подставил в переменную
    valideForms('#consultation form');
    valideForms('#order form');

    //настройка Masked input

    $("input[name=phone]").mask("+375 (99) 999-99-99"); 

});