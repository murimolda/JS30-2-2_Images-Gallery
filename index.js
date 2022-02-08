document.addEventListener("DOMContentLoaded", function () {


    /*Function to find the element that is wider than the body of the page*/
    const docWidth = document.documentElement.offsetWidth;

    [].forEach.call(
        document.querySelectorAll('*'),
        function (el) {
            if (el.offsetWidth > docWidth) {
                console.log(el);
            }
        }
    );

    // /*Change color theme*/
    // const htmlColor = document.querySelector('[data-color]');
    // const changeThemeButton = document.querySelector('.header-change-theme-button')

    // const changeColorTheme = (theme) => {
    //     const whiteThemeElements = document.querySelectorAll('[data-theme]');
    //     if (theme === 'white') {
    //         whiteThemeElements.forEach(element => {
    //             element.classList.add("white-theme");
    //             htmlColor.dataset.color = 'white'
    //         });
    //     } else if (theme === 'dark') {
    //         whiteThemeElements.forEach(element => {
    //             element.classList.remove("white-theme");
    //             htmlColor.dataset.color = 'dark'
    //         });
    //     }
    //     themeColor = theme
    // }
    // changeThemeButton.addEventListener('click', () => {
    //     if (htmlColor.dataset.color === 'dark') {
    //         changeColorTheme('white');
    //     } else if (htmlColor.dataset.color === 'white') {
    //         changeColorTheme('dark');
    //     }
    // })

    const searchForm = document.querySelector('.header-search-input');
    const searchIcon = document.querySelector('.header-search-icon');
    const imageWrap = document.querySelector('.image-container')

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

    const loadImages = (data) => {
        for (let i = 0; i < data.results.length; i++) {
            let image = document.createElement("div");
            image.className = "image-wrap";
            image.style.backgroundImage = `url(${data.results[i].urls.raw}&w=1366&h=768)`;
            image.addEventListener("dblclick", function () {
                window.open(data.results[i].links.download, '_blank');
            })
            imageWrap.appendChild(image);
        }
    }

    searchForm.addEventListener("keydown", (event) => {
        if (event.key == "Enter")
            apiRequest();
    });

    searchIcon.addEventListener("click", () => {
        apiRequest();
    });



});

