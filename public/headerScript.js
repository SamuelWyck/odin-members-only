(function() {
    const userMenu = document.querySelector(".user-menu");
    const userMenuBtn = document.querySelector(".user-btn");
    const userMenuImg = document.querySelector(".user-menu-img");
    const mainMenu = document.querySelector("header > nav");
    const mainMenuBtn = document.querySelector(".main-menu-btn");
    const newMessageModal = document.querySelector(".new-message-modal");
    const newMessageBtn = document.querySelector(".new-btn");
    const exitNewMessageBtn = document.querySelector(".new-message-exit-btn");



    let smallWindow = window.innerWidth <= 680;
    if (window.innerWidth <= 680) {
        mainMenu.classList.add("hidden");
    }


    if (userMenu) {
        userMenuBtn.addEventListener("click", function(event) {
            userMenuImg.classList.toggle("rotate");
            userMenu.classList.toggle("hidden");
            event.stopPropagation();
        });

        userMenu.addEventListener("click", function(event) {
            event.stopPropagation();
        });
    }


    mainMenuBtn.addEventListener("click", function(event) {
        mainMenu.classList.toggle("hidden");
        event.stopPropagation();
    });


    mainMenu.addEventListener("click", function(event) {
        if (userMenu) {
            userMenuImg.classList.add("rotate");
            userMenu.classList.add("hidden");
        }
        event.stopPropagation();
    });


    document.addEventListener("click", function() {
        if (userMenu) {
            userMenuImg.classList.add("rotate");
            userMenu.classList.add("hidden");
        }
        
        if (window.innerWidth <= 680) {
            mainMenu.classList.add("hidden");
        }
    });


    window.addEventListener("resize", function() {
        if (this.window.innerWidth <= 680 && !smallWindow) {
            mainMenu.classList.add("hidden");
            smallWindow = true;
        } else if (this.window.innerWidth > 680 && smallWindow) {
            mainMenu.classList.remove("hidden");
            smallWindow = false
        }
    });



    if (newMessageBtn) {
        newMessageBtn.addEventListener("click", function() {
            newMessageModal.classList.remove("hidden");
        });

        exitNewMessageBtn.addEventListener("click", function() {
            newMessageModal.classList.add("hidden")
        });
    }
})();