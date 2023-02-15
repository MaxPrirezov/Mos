document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
    if(window.innerWidth <= 1260) {
        document.querySelector(".header__bottom").prepend(document.querySelector(".preview__social"));
        document.querySelector(".header__bottom").prepend(document.querySelector(".header__tel"));
    }
    const anchors = document.querySelectorAll('a[href*="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
    
        const blockID = anchor.getAttribute("href").substr(1);
    
        document.getElementById(blockID).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    })
    // founder
    
    var swiper = new Swiper(".founder-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      breakpoints: {
        640: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
    
    // reviews
    
    var swiper = new Swiper(".reviews__swiper", {
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: -10,
        depth: 0,
        modifier: 1,
        slideShadows: false,
        scale: 0.9,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    
    document
      .querySelector(".reviews__content .swiper-button-next")
      .addEventListener("click", () => {
        if (document.querySelector(".reviews__content .swiper-slide-prev")) {
          let videoPrev = document.querySelector(
            ".reviews__content .swiper-slide-prev .swiper-video"
          );
          videoPrev.pause();
          videoPrev.currentTime = 0;
        }
        document.querySelector(".reviews__play").style.opacity = 1;
      });
    document
      .querySelector(".reviews__content .swiper-button-next div")
      .addEventListener("click", () => {
        if (document.querySelector(".reviews__content .swiper-slide-prev")) {
          let videoPrev = document.querySelector(
            ".reviews__content .swiper-slide-prev .swiper-video"
          );
          videoPrev.pause();
          videoPrev.currentTime = 0;
        }
        document.querySelector(".reviews__play").style.opacity = 1;
      });
    
    document
      .querySelector(".reviews__content .swiper-button-prev")
      .addEventListener("click", () => {
        if (
          document.querySelector(
            ".reviews__content .swiper-slide-next .swiper-video"
          )
        ) {
          let videoPrev = document.querySelector(
            ".reviews__content .swiper-slide-next .swiper-video"
          );
          videoPrev.pause();
          videoPrev.currentTime = 0;
        }
        document.querySelector(".reviews__play").style.opacity = 1;
      });
    
    document
      .querySelector(".reviews__content .swiper-button-prev div")
      .addEventListener("click", () => {
        if (
          document.querySelector(
            ".reviews__content .swiper-slide-next .swiper-video"
          )
        ) {
          let videoPrev = document.querySelector(
            ".reviews__content .swiper-slide-next .swiper-video"
          );
          videoPrev.pause();
          videoPrev.currentTime = 0;
        }
        document.querySelector(".reviews__play").style.opacity = 1;
      });
    document.querySelector(".reviews__play").addEventListener("click", () => {
      let video = document.querySelector(".swiper-slide-active .swiper-video");
      document.querySelector(".reviews__play").style.opacity = 0;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
        document.querySelector(".reviews__play").style.opacity = 1;
      }
    });
    
    document.querySelector(".swiper-border").addEventListener("click", () => {
      let video = document.querySelector(".swiper-slide-active .swiper-video");
      document.querySelector(".reviews__play").style.opacity = 1;
      video.pause();
    });
    
    // cases
    var swiper = new Swiper(".cases__swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      simulateTouch: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      allowTouchMove: false,
      breakpoints: {
        1232: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
    
    // faq
    
    const questions = document.querySelectorAll(".faq__item");
    
    questions.forEach((question) => {
      question.addEventListener("click", () => {
        question.classList.toggle("faq__item-active");
      });
    });
    
    //learn
    
        if (
          document.documentElement.clientWidth < 480 ||
          document.documentElement.clientHeight < 620
        ) {
            document.querySelector(".learn__videos").remove();
        } else {
            const videos = document.querySelectorAll(".learn__videos-border .video");
            for (let i = 1; i < videos.length + 1; i++) {
              window.addEventListener("scroll", function () {
                if (
                  document.documentElement.clientWidth >= 480 ||
                  document.documentElement.clientHeight >= 620
                ) {
                  const vh = document.documentElement.clientHeight; // 100vh
                  const windowScrollTop = window.pageYOffset; // текущее положение
                  const padding =
                    (vh -
                      document.querySelector(".learn__videos-border .video").offsetHeight) /
                    2;
                  let learnItem = document.querySelector(`#learnItem${i}`); // фон
                  let learnVideo = document.querySelector(`#video${i}`).parentNode; // видео
                  let getItemCoords =
                    learnItem.getBoundingClientRect().top + windowScrollTop; //положение елемента в документе;
                  let hieghtEl = vh + windowScrollTop - getItemCoords - padding + 50;
            
                  if (i >= 2) {
                    if (hieghtEl > 0) {
                      learnVideo.style.height = `${hieghtEl}px`;
                    } else {
                      learnVideo.style.height = `0px`;
                    }
                  } else {
                    learnVideo.style.height = `100%`;
                  }
                }
              });
            }
        }
    
    //header
    
    document.querySelector(".header__burger").addEventListener("click", () => {
      document.querySelector(".header__burger").classList.toggle("active__burger");
      document.querySelector(".header__menu").classList.toggle("show");
      document.querySelector(".header").classList.toggle("header__show");
      
      document.body.classList.toggle("overflow");
    });
    
    const headerLinks = document.querySelectorAll(".header__menu-link a");
    
    headerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 1232) {
          document
            .querySelector(".header__burger")
            .classList.toggle("active__burger");
          document.querySelector(".header__menu").classList.toggle("show");
      document.querySelector(".header").classList.toggle("header__show");
          document.body.classList.toggle("overflow");
        }
      });
    });
    
    //smear
    
    // функция добавляет/убирает CSS-класс
    const scrollImations = (entries, observer) => {
      entries.forEach((entry) => {
        // анимируем, если элемент целиком попадает в отслеживаемую область
        if (entry.isIntersecting && entry.intersectionRatio == 1) {
          entry.target.classList.remove("waved");
        } else {
          //entry.target.classList.add('waved');
        }
      });
    };
    
    //модальное окно
    
    //маска телефона
    window.addEventListener("DOMContentLoaded", function () {
      [].forEach.call(document.querySelectorAll(".tel"), function (input) {
        var keyCode;
        function mask(event) {
          event.keyCode && (keyCode = event.keyCode);
          var pos = this.selectionStart;
          if (pos < 3) event.preventDefault();
          var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
          i = new_value.indexOf("_");
          if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i);
          }
          var reg = matrix
            .substr(0, this.value.length)
            .replace(/_+/g, function (a) {
              return "\\d{1," + a.length + "}";
            })
            .replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (
            !reg.test(this.value) ||
            this.value.length < 5 ||
            (keyCode > 47 && keyCode < 58)
          )
            this.value = new_value;
          if (event.type == "blur" && this.value.length < 5) this.value = "";
        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
      });
    });
    
    let ymSubmit;
    let message = "";
    const btns = document.querySelectorAll(".btn-modal");
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
          document.querySelector(".popup__btn span").textContent = btn.querySelector("span").textContent;
          document.querySelector(".popup__btn button").textContent = btn.querySelector("span").textContent;
          if (btn.lastElementChild.textContent == "Стать мастером") {
              ymSubmit = () => {
                  ym(91902724, 'reachGoal', 'form_sub_main_01'); 
              }
          } else if(btn.lastElementChild.textContent == "Подать заявку") {
              ymSubmit = () => {
                  ym(91902724, 'reachGoal', 'form_sub_main_02'); 
              }
          } else if(btn.lastElementChild.textContent == "Получить видеоурок") {
              ymSubmit = () => {
                  ym(91902724, 'reachGoal', 'form_sub_main_03'); 
              }
          } else if(btn.lastElementChild.textContent == "Купить") {
              ymSubmit = () => {
                  ym(91902724, 'reachGoal', 'form_sub_main_04'); 
              }
          } else {
              ymSubmit = () => {}
          }
        document.querySelector(".popup").classList.toggle("popup__active");
        document.body.classList.toggle("overflow");
        message = btn.lastElementChild.textContent;
      });
    });
    
    const btnsClose = document.querySelectorAll(".popup__close");
    
    btnsClose.forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelector(".popup").classList.toggle("popup__active");
        document.body.classList.toggle("overflow");
      });
    });
    
    const postData = async (url, data) => {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: data,
        });
        
        return await res.json();
    };
    
    const answer = document.createElement("div");
    
    function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      answer.remove();
      e.preventDefault();
      const formData = new FormData(form);
      const obj = Object.fromEntries(formData.entries());
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      if (obj.tel.length < 17) {
          answer.textContent = "Введите номер телефона!";
          document.querySelector(".popup__btn").after(answer);
          return
      }
      
        obj.message = message;
        if (obj.tel.length == 17 && obj.name.length > 1) {
          postData("/telegram.php", JSON.stringify(obj))
            .then((data) => {
              document.querySelector(".popup__answer").classList.toggle("show");
              document.querySelector(".popup__form").classList.toggle("show");
              ymSubmit();
            })
            .catch((e) => {
              answer.textContent = "Проверьте соединение с интернетом, и повторите попытку!";
              document.querySelector(".popup__btn").after(answer);
            })
        }
      });
    }
    
    bindPostData(document.querySelector(".popup__form"));
    
    window.addEventListener("scroll", () => {
        if(window.pageYOffset > 15) {
            document.querySelector("header").classList.add("active");
        } else {
            document.querySelector("header").classList.remove("active");
        }
    })
    if(window.pageYOffset > 15) {
        document.querySelector("header").classList.add("active");
    } else {
            document.querySelector("header").classList.remove("active");
    }
})
const cases = document.querySelectorAll(".case");
cases.forEach((caseItem) => {
  const before = caseItem.querySelector(".case__before");
  const beforeImg = caseItem.querySelector(".case__before-img");
  const change = caseItem.querySelector(".case__change");
  let isActive = false;

  document.addEventListener("DOMContentLoaded", () => {
    let width = caseItem.offsetWidth;
    beforeImg.style.width = `${width}px`;
  });

  const beforeAfterLisrener = (x) => {
    let shift = Math.max(0, Math.min(x, caseItem.offsetWidth));
    before.style.width = `${shift}px`;
    change.style.left = `${shift}px`;
  };

  const pauseEvents = (e) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

    if(window.innerWidth >= 1260) {
        document.body.addEventListener("mouseup", () => {
            isActive = false;
          });
        
          caseItem.addEventListener("mousedown", (e) => {
            isActive = true;
        
            let x = e.pageX;
        
            x -= caseItem.getBoundingClientRect().left;
            beforeAfterLisrener(x);
            pauseEvents(e);
          });
          document.body.addEventListener("mousemove", (e) => {
            if (!isActive) {
              return;
            }
        
            let x = e.pageX;
        
            x -= caseItem.getBoundingClientRect().left;
            beforeAfterLisrener(x);
            pauseEvents(e);
          });
    } else {
        document.body.addEventListener("touchend", (e) => {
            isActive = false;
          });
          document.body.addEventListener("touchstart", (e) => {
              if (e.target.className == "case__after-img"|| e.target.className == "case__before-img" || e.target.alt == "chance") {
            isActive = true;
            let x = e.targetTouches[0].pageX;
        
            x -= caseItem.getBoundingClientRect().left;
            beforeAfterLisrener(x);
            e.stopPropagation();
              }
          });
          document.body.addEventListener("touchmove", (e) => {
            if (!isActive) {
              return;
            }
            let x = e.targetTouches[0].pageX;
            x -= caseItem.getBoundingClientRect().left;
            beforeAfterLisrener(x);
            e.stopPropagation();
          });
    }
    // disable btn
    
    document.querySelector(".popup__btn").classList.add("disable");
    document.querySelector("#name").addEventListener("input", () => {
        if (document.querySelector("#name").value.length > 1 && document.querySelector("#tel").value.length == 17) {
            document.querySelector(".popup__btn").classList.remove("disable");
        } else {
            document.querySelector(".popup__btn").classList.add("disable");
        }
    })
    document.querySelector("#tel").addEventListener("input", () => {
        if (document.querySelector("#name").value.length > 1 && document.querySelector("#tel").value.length == 17) {
            document.querySelector(".popup__btn").classList.remove("disable");
        } else {
            document.querySelector(".popup__btn").classList.add("disable");
        }
    })
    
});