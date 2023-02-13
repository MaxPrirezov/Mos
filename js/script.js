const END = "change";
const START = "ontouchstart" in document ? "touchstart" : "mousedown";
const INPUT = "input";
const MAX_ROTATION = 35;
const SOFTEN_FACTOR = 3;

class RangeInput {
  constructor(el) {
    this.el = el;

    this._handleEnd = this._handleEnd.bind(this);
    this._handleStart = this._handleStart.bind(this);
    this._handleInput = this._handleInput.bind(this);

    //Call the plugin
    $(this.el.querySelector("input[type=range]")).rangeslider({
      polyfill: false, //Never use the native polyfill
      rangeClass: "rangeslider",
      disabledClass: "rangeslider-disabled",
      horizontalClass: "rangeslider-horizontal",
      verticalClass: "rangeslider-vertical",
      fillClass: "rangeslider-fill-lower",
      handleClass: "rangeslider-thumb",
      onInit: function () {
        //No args are passed, so we can't change context of this
        const pluginInstance = this;

        //Move the range-output inside the handle so we can do all the stuff in css
        $(pluginInstance.$element)
          .parents(".range")
          .find(".range-output")
          .appendTo(pluginInstance.$handle);
      },
    });

    this.sliderThumbEl = el.querySelector(".rangeslider-thumb");
    this.outputEl = el.querySelector(".range-output");
    this.inputEl = el.querySelector("input[type=range]");
    this._lastOffsetLeft = 0;
    this._lastTimeStamp = 0;

    this.el
      .querySelector(".rangeslider")
      .addEventListener(START, this._handleStart);
  }

  _handleStart(e) {
    this._lastTimeStamp = new Date().getTime();
    this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;

    //Wrap in raf because offsetLeft is updated by the plugin after this fires
    requestAnimationFrame((_) => {
      //Bind through jquery because plugin doesn't fire native event
      $(this.inputEl).on(INPUT, this._handleInput);
      $(this.inputEl).on(END, this._handleEnd);
    });
  }

  _handleEnd(e) {
    //Unbind through jquery because plugin doesn't fire native event
    $(this.inputEl).off(INPUT, this._handleInput);
    $(this.inputEl).off(END, this._handleEnd);

    requestAnimationFrame(
      (_) => (this.outputEl.style.transform = "rotate(0deg)")
    );
  }

  _handleInput(e) {
    let now = new Date().getTime();
    let timeElapsed = now - this._lastTimeStamp || 1;
    let distance = this.sliderThumbEl.offsetLeft - this._lastOffsetLeft;
    let direction = distance < 0 ? -1 : 1;
    let velocity = Math.abs(distance) / timeElapsed; //pixels / millisecond
    let targetRotation = Math.min(
      Math.abs(distance * velocity) * SOFTEN_FACTOR,
      MAX_ROTATION
    );

    requestAnimationFrame(
      (_) =>
        (this.outputEl.style.transform =
          "rotate(" + targetRotation * -direction + "deg)")
    );

    this._lastTimeStamp = now;
    this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;
  }
}
document.querySelectorAll(".range").forEach((el) => {
  new RangeInput(el);
});

const data = {
  countSlides: document.querySelector("[name^='rangeSlides']").value,
  text: 0,
  photos: 0,
  photoProf: 0,
  design: 0,
  anime: 0,
  days: 0,
  langs: 0,
};

function culc() {
  let ratio = 1;
  if (data.days == 3) {
    ratio = 2;
  }
  if (data.days > 3 && data.days < 8) {
    ratio = 1.5;
  }
  const sum =
    (data.countSlides * 3500 +
      data.text +
      data.countSlides * data.photos +
      data.photoProf +
      data.design +
      data.anime +
      data.countSlides * 1500 * data.langs) *
    ratio;
  document.querySelector("#price__total").textContent = sum;
  document.querySelector("#price__installment").textContent = Math.round(
    sum / 10
  );
  console.log(data);
}

const updateDays = (value) => {
  data.days = value;
  culc();
  if (value > 7) {
    document
      .querySelector(".rangeDays")
      .parentElement.classList.add("range-green");
    document
      .querySelector(".rangeDays")
      .parentElement.classList.remove("range-yellow");
    document
      .querySelector(".rangeDays")
      .parentElement.classList.remove("range-red");
  }
  if (value > 3 && value <= 7) {
    document
      .querySelector(".rangeDays")
      .parentElement.classList.remove("range-green");
    document
      .querySelector(".rangeDays")
      .parentElement.classList.add("range-yellow");
    document
      .querySelector(".rangeDays")
      .parentElement.classList.remove("range-red");
  }
  if (value <= 3) {
    document
      .querySelector(".rangeDays")
      .parentElement.classList.remove("range-green");
    document
      .querySelector(".rangeDays")
      .parentElement.classList.remove("range-yellow");
    document
      .querySelector(".rangeDays")
      .parentElement.classList.add("range-red");
  }
  setTimeout(function () {
    document.querySelector(".price__param-days").remove();
    const param = document.createElement("div");
    param.classList.add("price__param", "price__param-days");
    param.innerHTML = document.querySelector(".outputDays").innerHTML;
    document.querySelector(".price__params-items").appendChild(param);
  }, 100);
};

let langActive = [];
let counterLang = 0;
const langs = [
  ["EN", "img/Russia (RU).svg"],
  ["CH", "img/Russia (RU).svg"],
];

const addLangSelect = () => {
  const selectLang = document.createElement("div");
  const selectBtn = document.createElement("div");
  const selectList = document.createElement("ul");
  const param = document.createElement("div");
  param.classList.add("price__param", "price__param-lang");
  param.style.display = "none";
  const numberSelect = counterLang;
  document.querySelector(".price__params-items").appendChild(param);
  langs.forEach((el) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-lang", el[0]);
    listItem.innerHTML = `${el[0]}<img class="price__flag" src="${el[1]}" alt="flag">`;
    selectList.appendChild(listItem);
    listItem.addEventListener("click", () => {
      langActive[numberSelect] = el[0];
      data.langs = langActive.length;
      param.innerHTML = `Перевод <span>${el[0]}</span>`;
      param.style.display = "flex";
      document.querySelector(".price__container").style.height = `${
        document.querySelector(".price__right").clientHeight + 100
      }px`;
      listItem.parentElement.style.display = "none";
      selectBtn.innerHTML = listItem.innerHTML;
      if (
        !document.querySelector(".btn-addlang") &&
        langs.length > counterLang + 1
      ) {
        const btnAdd = document.createElement("div");
        btnAdd.classList.add("btn-addlang");
        btnAdd.textContent = "Добавить новый язык +";
        document.querySelector(".dropdown_list").appendChild(btnAdd);
        btnAdd.addEventListener("click", () => {
          counterLang++;
          btnAdd.remove();
          addLangSelect();
        });
      }
      document.querySelectorAll(".courses li").forEach((el) => {
        let hide;
        for (index in langActive) {
          if (el.getAttribute("data-lang") == langActive[index]) {
            hide = true;
          }
        }
        if (hide) {
          el.style.display = "none";
        } else {
          el.style.display = "flex";
        }
      });
      console.log(data);
      console.log(langActive);
      culc();
    });
  });
  selectList.classList.add("courses");
  selectBtn.classList.add("dropdown_button");
  selectBtn.textContent = "Выбирете язык";
  selectBtn.addEventListener("click", () => {
    if (selectList.style.display == "block") {
      selectList.style.display = "none";
    } else {
      selectList.style.display = "block";
    }
  });
  window.onclick = function (event) {
    if (event.target != selectBtn) {
      selectList.style.display = "none";
    }
  };
  selectLang.appendChild(selectBtn);
  selectLang.appendChild(selectList);
  document.querySelector(".dropdown_list").appendChild(selectLang);
  document.querySelectorAll(".courses li").forEach((el) => {
    let hide;
    for (index in langActive) {
      if (el.getAttribute("data-lang") == langActive[index]) {
        hide = true;
      }
    }
    if (hide) {
      el.style.display = "none";
    } else {
      el.style.display = "flex";
    }
  });
};
document.querySelector("#translate").addEventListener("change", (e) => {
  if (e.target.checked) {
    e.target.parentElement.classList.add("active");
    addLangSelect();
  } else {
    document
      .querySelectorAll(".price__param-lang")
      .forEach((el) => el.remove());

    document.querySelector(".price__container").style.height = `${
      document.querySelector(".price__right").clientHeight + 100
    }px`;
    langActive = [];
    counterLang = 0;
    culc();
    e.target.parentElement.classList.remove("active");
    document.querySelector(".dropdown_list").innerHTML = "";
  }
});
const updateSlides = (value) => {
  let name = "слайдов";
  data.countSlides = value;
  if (document.querySelector("#anime").checked) {
    data.anime = data.countSlides * 1000;
  }
  culc();
  if (
    value == 22 ||
    value == 23 ||
    value == 24 ||
    value == 32 ||
    value == 33 ||
    value == 34 ||
    value == 42 ||
    value == 43 ||
    value == 44
  ) {
    name = "слайда";
  }
  if (value == 21 || value == 31 || value == 41) {
    name = "слайд";
  }
  setTimeout(function () {
    document.querySelector(".price__param-slides").remove();
    const param = document.createElement("div");
    param.classList.add("price__param", "price__param-slides");
    param.innerHTML = value + " " + name;
    document.querySelector(".price__params-items").appendChild(param);
  }, 100);
};
document.querySelector("#conentToBe").addEventListener("change", (e) => {
  if (e.target.checked) {
    data.text = 0;
  }
});
document.querySelector("#noContent").addEventListener("change", (e) => {
  if (e.target.checked) {
    data.text = 1500;
  }
});
document.querySelector("#photoToBe").addEventListener("change", (e) => {
  if (e.target.checked) {
    data.photos = 0;
  }
});
document.querySelector("#noPhoto").addEventListener("change", (e) => {
  if (e.target.checked) {
    data.photos = 500;
  }
});
document.querySelector("#profPhoto").addEventListener("change", (e) => {
  if (e.target.checked) {
    data.photoProf = 10000;
  } else {
    data.photoProf = 0;
  }
});
document.querySelector("#infoDesign").addEventListener("change", (e) => {
  if (e.target.checked) {
    const inputForm = document.createElement("input");
    inputForm.classList.add("price__input");
    inputForm.placeholder = "Количество";
    inputForm.type = "number";
    inputForm.min = 1;
    e.target.parentElement.appendChild(inputForm);
    inputForm.addEventListener("input", (e) => {
      data.design = e.target.value * 1500;
      culc();
    });
    data.design = 1500;
  } else {
    document.querySelector(".price__input").remove();
    data.design = 0;
  }
});
document.querySelector("#anime").addEventListener("change", (e) => {
  if (e.target.checked) {
    data.anime = 1000 * data.countSlides;
  } else {
    data.anime = 0;
  }
});
document.querySelectorAll(".price__form input").forEach((el) => {
  el.addEventListener("change", (e) => {
    culc();
    if (e.target.checked) {
      const param = document.createElement("div");
      param.classList.add("price__param");
      param.innerHTML = e.target.nextElementSibling.innerHTML;
      if (e.target.nextElementSibling.textContent != "") {
        document.querySelector(".price__params-items").appendChild(param);
      }
      if (e.target.type == "radio") {
        document
          .querySelectorAll(`input[name^="${e.target.name}"]`)
          .forEach((el) => {
            if (!el.checked) {
              document.querySelectorAll(".price__param").forEach((elParam) => {
                if (el.nextElementSibling.textContent == elParam.textContent) {
                  elParam.remove();
                }
              });
            }
          });
      }
    } else {
      document.querySelectorAll(".price__param").forEach((el) => {
        if (el.textContent == e.target.nextElementSibling.textContent) {
          el.remove();
        }
      });
    }
    document.querySelector(".price__container").style.height = `${
      document.querySelector(".price__right").clientHeight + 100
    }px`;
  });
});

document.querySelector("#newPreza").click();
document.querySelector("#conentToBe").click();
document.querySelector("#photoToBe").click();
document.querySelector("#designBrandbook").click();
document.querySelector(".price__container").style.height = `${
  document.querySelector(".price__right").clientHeight + 100
}px`;
culc();
