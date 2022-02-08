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


});

