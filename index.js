document.addEventListener("DOMContentLoaded", function () {


    /*функция показывает в консоли элементы, 
    которые выходят за границы основного блока, 
    и тогда появляется горизонтальная полоса прокрутки*/
    const docWidth = document.documentElement.offsetWidth;

    [].forEach.call(
        document.querySelectorAll('*'),
        function (el) {
            if (el.offsetWidth > docWidth) {
                console.log(el);
            }
        }
    );


    const searchForm = document.querySelector('.header-search-input');
    const searchIcon = document.querySelector('.header-search-icon');
    const imageWrap = document.querySelector('.image-container');


    const apiRequest = () => {
        imageWrap.textContent = "";
        const url = `https://api.unsplash.com/search/photos?query=${searchForm.value}&per_page=20&client_id=44p5ICsqB7rV99h5gLkFVA_fc4PTLn7YKs4j9RD8MGE`;
        fetch(url)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(data => {
                loadImages(data);
            })
            .catch(error => console.log(error));
    }
    /*Загрузка темы "горы" при открытии страницы. Закостылила, конечно, но пока не разобралась, как сделать изящней*/
    window.addEventListener('load', () => {
        imageWrap.textContent = "";
        const url = `https://api.unsplash.com/search/photos?query=mountains&per_page=20&client_id=44p5ICsqB7rV99h5gLkFVA_fc4PTLn7YKs4j9RD8MGE`;
        fetch(url)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(data => {
                loadImages(data);
            })
            .catch(error => console.log(error));
    });

    // /*fullscreen галерея*/
    const fullscreenContainer = document.querySelector('.fullscreen-container');
    const galleryArrowTop = document.querySelector('.fullscreen-arrow-top');
    const galleryArrowDown = document.querySelector('.fullscreen-arrow-down');
    const galleryCloseButton = document.querySelector('.fullscreen-gallery');


    const loadImages = (data) => {
        for (let i = 0; i < data.results.length; i++) {
            let image = document.createElement("div");
            image.className = "image-wrap";
            image.style.backgroundImage = `url(${data.results[i].urls.raw}&w=1366&h=768)`;
            imageWrap.appendChild(image);
        }
        let imageItems = document.querySelectorAll('.image-wrap');
        for (let j = 0; j < imageItems.length; j++) {
            let fullscreenImage = document.createElement("div");
            fullscreenImage.className = "fullscreen-image";
            fullscreenImage.style.backgroundImage = imageItems[j].style.backgroundImage;
            fullscreenContainer.appendChild(fullscreenImage);
            const fullscreenItems = document.querySelectorAll('.fullscreen-image');
            imageItems[j].addEventListener("dblclick", function (e) {
                fullscreenContainer.classList.add("active");
                fullscreenItems.forEach(element => {
                    if (element.style.backgroundImage === e.target.style.backgroundImage) {
                        element.classList.add("active");
                        element.scrollIntoView();
                    }
                });
            });
        }
        const fullscreenItems = document.querySelectorAll('.fullscreen-image');
        /*перемещение на один слайд вверх по клику на кнопку*/
        galleryArrowTop.addEventListener('click', function () {
            for (let k = 0; k < fullscreenItems.length; k++ && k !== 0) {
                if (fullscreenItems[k].classList.contains("active")) {
                    fullscreenItems[k - 1].scrollIntoView();
                    fullscreenItems[k].classList.remove("active");
                    fullscreenItems[k - 1].classList.add("active");

                }
            }
        });
        /*перемещение на один слайд вниз по клику на кнопку*/
        galleryArrowDown.addEventListener('click', function () {
            for (let k = fullscreenItems.length - 1; k >= 0; k--) {
                if (fullscreenItems[k].classList.contains("active") && k !== fullscreenItems.length - 1) {
                    fullscreenItems[k + 1].scrollIntoView();
                    fullscreenItems[k].classList.remove("active");
                    fullscreenItems[k + 1].classList.add("active");
                }
            }
        });
        galleryCloseButton.addEventListener('click', function () {
            for (let k = fullscreenItems.length - 1; k >= 0; k--) {
                if (fullscreenItems[k].classList.contains("active") && k !== fullscreenItems.length - 1) {
                    fullscreenItems[k].classList.remove("active");
                }
            }
            fullscreenContainer.classList.remove("active");
        })
    }

    /*загрузка изображений по клику Enter*/
    searchForm.addEventListener("keyup", (event) => {
        if (event.key === "Enter")
            apiRequest();
    });

    /*загрузка изображений по клику на иконку поиска*/
    searchIcon.addEventListener("click", () => {
        apiRequest();
    });

    /*Функция День/Ночь, меняет оформление страницы в зависимости от времени суток*/
    const changeTheme = () => {
        let date = new Date();
        let hour = date.getHours();
        const whiteThemeElements = document.querySelectorAll('[data-theme]');
        if (hour >= 7 && hour < 19) {
            whiteThemeElements.forEach(element => {
                element.classList.add("white-theme");
            });
        } else {
            whiteThemeElements.forEach(element => {
                element.classList.remove("white-theme");
            });
        }
    }

    window.addEventListener('load', changeTheme);




});

