const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const showMorePlayers = document.querySelector("#show-all-player-records");

playerRecordsSize = 3
playerRecordsState = "closed"
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

DBraids.sort(function compare(a, b) {
    return parseInt(b.raidDate,10) - parseInt(a.raidDate,10) 
  }).forEach(raid =>{
    const tr = document.createElement('tr');
    tr.classList.add("collapsible")
    const trContent = `
    <td>${raid.raidDate.slice(-2,)}/${raid.raidDate.slice(-4,-2)}/${raid.raidDate.slice(0,-4)}</td>
    <td>${raid.totalGold}</td>
    <td>${raid.average}</td>
    <td class="${raid.mejora.slice(0,-1) > 0 ? 'success' : raid.mejora.slice(0,-1) < 0 ? 'danger' : ''}">${raid.mejora}</td>
    <td class="${raid.status === 'ended' ? 'primary' : 'warning'}">${raid.status === 'ended' ? 'Completed' : 'Ongoing'}</td>
    
    `
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
})


const collapsibleRows = document.querySelectorAll(".collapsible");

collapsibleRows.forEach(row => {
    row.addEventListener("click", () => {
        const content = row.nextElementSibling.querySelector(".content")
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});