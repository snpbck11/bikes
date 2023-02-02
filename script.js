// Слайдер

const slider = document.querySelector('.slider');
const sliderContainer = slider.querySelector('.slider__container');
const sliderItems = sliderContainer.querySelectorAll('.slider__item');
const prevSlide = slider.querySelector('#slider-prev');
const nextSlide = slider.querySelector('#slider-next');

let offset = 0;

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

const bikesSelector = document.querySelectorAll('.bikes__selector');
const bikesPuprose = document.querySelectorAll('.bikes__purpose');

function switcherSelector(button, selector) {
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function () {
      for (let j = 0; j < selector.length; j++) {
        selector[j].classList.remove('bikes__selector_opened');
        button[j].classList.remove('bikes__purpose_active');
      }
      button[i].classList.add('bikes__purpose_active');
      selector[i].classList.add('bikes__selector_opened');
    });
  }
}

switcherSelector(bikesPuprose, bikesSelector);

// Свитчер темы

const switcher = document.querySelector('.theme-switcher');

switcher.querySelector('.theme-switcher__container').addEventListener('click', () => {
  switcher.classList.toggle('theme-switcher_theme_dark');
  switcher.querySelector('.theme-switcher__toggler').classList.toggle('theme-switcher__toggler_active');
  document.querySelector('.page').classList.toggle('page_theme_dark');
  document.querySelectorAll('.slider__button').forEach((button) => {
    button.classList.toggle('slider__button_theme_dark')
  });
  document.querySelector('.footer').classList.toggle('footer_theme_dark')
});


// Форма для почты

const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__button');

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

formButton.addEventListener('click', () => {
  formInput.value = 'Круто!'
})
