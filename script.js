class Slider {
  /* 
  $root — корень лучше передать как DOM элемент, ведь мы можем работать и не в document 
  options — кастомизацию лучше предусматривать сразу, удобно и не надо много переделывать потом если что
  */
  constructor($root, options = {}) {
    this._root = $root;
    this._container = this._root.querySelector(
      options.container ?? ".slider__container"
    );
    /*если планируем динамически изменять количество слайдов, то переносим в геттер*/
    this.slidesCount = this._container.querySelectorAll(
      options.item ?? ".slider__item"
    ).length;
    this._activeSlide = options.activeSlide ?? 0;
    this._controls = new Map();

    if (options.controls) {
      for (let { $el, condition, action } of options.controls) {
        this.addControl($el, condition, action);
      }
    }

    this._updateState(); //инициируем
  }

  /* для активного слайда делаем геттер и сеттер чтобы применять изменение сразу к слайдеру  */
  get activeSlide() {
    return this._activeSlide;
  }

  set activeSlide(value) {
    if (value < this.slidesCount && value >= 0) {
      this._activeSlide = value;
      this._updateState();
    }

    return this._activeSlide;
  }

  /* базовый набор действий для экшенов */
  next() {
    return this.activeSlide++;
  }
  prev() {
    return this.activeSlide--;
  }

  reset() {
    return (this.activeSlide = 0);
  }

  /* 
  контролы могут быть любыми, например переключаемая автоматическая перемотка и или изменение параметров слайдера 
  $el — DOM элемент, по той же причине что и в конструкторе
  condition — может ли контрол быть нажат в зависимости от текущего состояния слайдера
  action — действие по нажатию
  */
  addControl($el, condition, action) {
    this._controls.set($el, condition);
    /* делаем вызов с контекстом, если функции он нужен */
    $el.addEventListener("click", (e) => action.call(this, e));
  }

  _updateState() {
    /* управляем состоянием через переменные, для IE есть полифил */
    this._container.style = `
      --slidesCount: ${this.slidesCount};
      --activeSlide: ${this._activeSlide};
    `;

    /* не забываем при каждом изменении проверить наши контролы */
    this._controls.forEach((condition, $el) => {
      $el.disabled = !condition.call(this);
    });
  }
}

const mySlider = new Slider(document.getElementById("slider"), {
  controls: [
    {
      $el: document.getElementById("slider-prev"),
      condition: function () {
        return this.activeSlide > 0;
      },
      action: function () {
        return this.prev();
      }
    },
    {
      $el: document.getElementById("slider-next"),
      condition: function () {
        return this.activeSlide < this.slidesCount - 1;
      },
      action: function () {
        return this.next();
      }
    }
  ]
});

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
