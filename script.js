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