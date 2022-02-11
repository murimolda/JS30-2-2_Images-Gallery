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
    /*Загрузка темы "горы" при открытии страницы. 
    Закостылила, конечно, но пока не разобралась 
    в этой теме достаточно для того, чтобы сделать изящней :)*/
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

            /*открытие галереи на том изображении, на котором произошел клик*/
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
        const header = document.querySelector('.header');
        galleryCloseButton.addEventListener('click', function () {
            header.scrollIntoView();
            fullscreenContainer.classList.remove("active");
        })
    }

    /*загрузка изображений по клику Enter*/
    searchForm.addEventListener("keyup", (event) => {
        if (event.key === "Enter")
            apiRequest();
        const fullscreenItems = document.querySelectorAll('.fullscreen-image');
        for (let k = fullscreenItems.length - 1; k >= 0; k--) {
            fullscreenItems[k].remove();
        }
    });

    /*загрузка изображений по клику на иконку поиска*/
    searchIcon.addEventListener("click", () => {
        apiRequest();
        const fullscreenItems = document.querySelectorAll('.fullscreen-image');
        for (let k = fullscreenItems.length - 1; k >= 0; k--) {
            fullscreenItems[k].remove();
        }
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

    console.log(`
        Самооценка 65 баллов:
        1. Вёрстка +10:
            - на странице есть несколько фото и строка поиска +5
            - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, [логотип курса] 
            https://rs.school/images/rs_school_js.svg) со ссылкой на курс +5
        2. При загрузке приложения на странице отображаются полученные от API изображения +10
        3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения
            соответствующей тематики, если такие данные предоставляет API +10
        4. Поиск +30
            - при открытии приложения курсор находится в поле ввода +5
            - есть placeholder +5
            - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
            - поисковый запрос можно отправить нажатием клавиши Enter +5
            - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает
                отображаться в поле ввода +5
            - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается
            placeholder +5
        5. Дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +5 из 10
        ( Не удалось избавится от плавной прокрутки к изображению при открытии галереи и при закрытии галереи)
            - реализована функция День/Ночь, которая изменяет оформление страницы в зависимости от времени суток
            - реализована функция fullscreen галереи`
    )











});

