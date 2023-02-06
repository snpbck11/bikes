// Константы и переменные
const slider = document.querySelector('.slider');
const sliderContainer = slider.querySelector('.slider__container');
const sliderItems = sliderContainer.querySelectorAll('.slider__item');
const prevSlide = slider.querySelector('#slider-prev');
const nextSlide = slider.querySelector('#slider-next');
const bikesSelect = document.querySelectorAll('.bikes__links');
const bikesPuprose = document.querySelectorAll('.bikes__purpose');
const switcher = document.querySelectorAll('.theme-switcher');
const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__button')
const form = document.querySelector('.form');
const selector = document.querySelector('.bikes__selector')

let offset = 0;

// Слайдер
showSlides(prevSlide, nextSlide);
checkButton();

function checkButton() {
  prevSlide.disabled = offset <=0;
  nextSlide.disabled = offset >= sliderContainer.offsetWidth * (sliderItems.length - 1);
}

function showSlides(prev, next) {
  next.addEventListener('click', () => {
    offset += sliderContainer.offsetWidth;
    sliderContainer.style.left = -offset + 'px';
    checkButton();
  });

  prev.addEventListener('click', () => {
    offset -= sliderContainer.offsetWidth;
    sliderContainer.style.left = -offset + 'px';
    checkButton();
  });
}
// Функция переключения слайдов 
function switcherSelector(button, select) {
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function () {
      for (let j = 0; j < select.length; j++) {
        select[j].classList.remove('bikes__links_opened');
        button[j].classList.remove('bikes__purpose_active');
      }
      button[i].classList.add('bikes__purpose_active');
      select[i].classList.add('bikes__links_opened');
    });
  }
}

switcherSelector(bikesPuprose, bikesSelect);

// Свитчер темы
switcher.forEach(item => {
    item.querySelector('.theme-switcher__container').addEventListener('click', () => {
    item.classList.toggle('theme-switcher_theme_dark');
    item.querySelector('.theme-switcher__toggler').classList.toggle('theme-switcher__toggler_active');
    document.querySelector('.page').classList.toggle('page_theme_dark');
    document.querySelectorAll('.slider__button').forEach(button => {
      button.classList.toggle('slider__button_theme_dark')
    });
    document.querySelector('.footer').classList.toggle('footer_theme_dark');
    document.querySelector('.header__menu-button').classList.toggle('header__menu-button_theme_dark')
  });
}) 

// Форма для почты
function checkInput(input, button) {
  input.addEventListener('input', () => {
    if (input.value.includes('@') && input.value.length > 3) {
      button.removeAttribute('disabled', 'disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  });
}

checkInput(formInput, formButton);

// Функция вывода "Круто"
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formInput.value = 'Круто!'
})

// Функция показа слайда по опции селектора
function selectItem(selector, select) {
  selector.addEventListener('change', () => {
    select.forEach(item => {
      item.classList.remove('bikes__links_opened');
      for (let i=0; i < selector.length; i++) {
        if(selector.value === select[i].id) {
          select[i].classList.add('bikes__links_opened')
        }
      }
    });
  })
}

selectItem(selector, bikesSelect)

// Функция вызова меню
document.querySelector('.header__menu-button').addEventListener('click', () => {
  document.querySelector('.header__menu-button').classList.toggle('header__menu-button_close')
  document.querySelector('.burger-menu').classList.toggle('burger-menu_active')
})

document.querySelectorAll('.menu__link').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.remove('burger-menu_active');
    document.querySelector('.header__menu-button').classList.remove('header__menu-button_close')
  })
});