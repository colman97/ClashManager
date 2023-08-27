const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

if(getDarkModeCookie()){
    setDarkModeCookie(getDarkModeCookie())
    document.body.classList.add('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
}
function setDarkModeCookie(value) {
    document.cookie = `darkmode=${value};`;
}

function getDarkModeCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'darkmode') {
            return value === 'true';
        }
    }
    return false; // Default to light mode if cookie not found
}

menuBtn.addEventListener('click',()=>{
    sideMenu.style.display='block';
})

closeBtn.addEventListener('click',()=>{
    sideMenu.style.display='none';
})

themeToggler.addEventListener('click',()=>{

    var isDarkMode = !getDarkModeCookie();
    setDarkModeCookie(isDarkMode);
    if (isDarkMode){
        document.body.classList.add('dark-theme-variables');

    } else {
        document.body.classList.remove('dark-theme-variables');
    }


    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})


dataBusqueda = []
playersCapitalRaid.forEach((player,index)  => {
    dataBusqueda.push(player['name'])
})

searchInput.addEventListener("input", () => {
    const inputValue = searchInput.value.toLowerCase();
    const filteredResults = dataBusqueda.filter(item => item.toLowerCase().includes(inputValue)).slice(0, 5);

    if (inputValue === "") {
        searchResults.style.display = "none";
    } else {
        searchResults.style.display = "block";
        searchResults.style.backgroundColor = "var(--color-white)";
        searchResults.innerHTML = "";
        filteredResults.forEach(result => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item");
            resultItem.textContent = result;
            resultItem.addEventListener("click", () => {
                searchInput.value = result;
                searchResults.style.display = "none";
            });
            searchResults.appendChild(resultItem);
        });
    }
});

