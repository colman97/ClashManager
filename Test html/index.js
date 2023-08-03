const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const showMorePlayers = document.querySelector("#show-all-player-records");

playerRecordsSize = 3
playerRecordsState = "closed"


menuBtn.addEventListener('click',()=>{
    sideMenu.style.display='block';
})

closeBtn.addEventListener('click',()=>{
    sideMenu.style.display='none';
})

themeToggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})

DBraids.forEach(raid =>{
    const tr = document.createElement('tr');
    const trContent = `
    <td>${raid.raidDate}</td>
    <td>${raid.totalGold}</td>
    <td>${raid.average}</td>
    <td class="${raid.mejora.slice(0,-1) > 0 ? 'success' : raid.mejora.slice(0,-1) < 0 ? 'danger' : ''}">${raid.mejora}</td>
    <td class="${raid.shipping === 'Completed' ? 'primary' : raid.shipping === 'Ongoing' ? 'warning' : ''}">${raid.shipping}</td>
    <a href ="./raid_weekend.html?id=${raid.id}" class="primary">Details</a>
                    `
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
})

function refreshPlayers(start,number){
    contador = 0
    DBplayers.sort(function compareByAge(a, b) {
        if (a.record < b.record) {
          return 1;
        }
        if (a.record > b.record) {
          return -1;
        }
        return 0;
      }).slice(start,number).forEach(player =>{
        
        arr=["success","primary","danger"]
        div = document.createElement('div');
        divContent = `
            <div class="icon ${arr[contador]}">
                <span class="material-icons-sharp">person</span>
            </div>
            <div class="right">
                <div class="info">
                    <h3>${player.nombre}</h3>
                    <small class="text-muted">${player.fecha}</small>
                </div>
                <h5 class="${player.porcentaje.slice(0,-1) > 0 ? 'success' : player.porcentaje.slice(0,-1) < 0 ? 'danger' : ''}">${player.porcentaje}</h5>
                <h3>${player.record}</h3>
            </div>
            `
        div.innerHTML = divContent;
        div.classList.add("item")
        document.querySelector('.sales-analytics-items').appendChild(div);
        contador = contador +1
    })
}

refreshPlayers(0,playerRecordsSize)
showMorePlayers.addEventListener("click",() => {
    if (playerRecordsState == "closed"){
        last = playerRecordsSize
        playerRecordsSize = playerRecordsSize +47
        refreshPlayers(last,playerRecordsSize)
        showMorePlayers.innerHTML = "Hide"
        playerRecordsState = "open"
        event.preventDefault()
    } else {
        playerRecordsSize = 3
        document.querySelector('.sales-analytics-items').innerHTML ="";
        refreshPlayers(0,playerRecordsSize)
        showMorePlayers.innerHTML = "Show All"
        playerRecordsState = "closed"
        event.preventDefault()
    }
    
})

const root = document.documentElement;

participantes = 20
totalClan = 42
comienzo = 1710
valor = 2485.59
record = 2694.23

porcentajeMejora = valor/comienzo *100 -100
porcentajeEstadoActual = valor/record*100;
porcentajeParticipantes = (participantes/totalClan)*100;

const mejoraAcumulada = document.querySelector(".mejora-acumulada");
const mejoraAcumuladaValor = mejoraAcumulada.querySelector(".valor")
const mejoraAcumuladaPorcentaje = mejoraAcumulada.querySelector(".porcentaje")

mejoraAcumuladaValor.innerHTML = Math.round(valor-comienzo)
mejoraAcumuladaPorcentaje.innerHTML = Math.round(porcentajeMejora * 100) / 100 + "%"
root.style.setProperty('--mejora-total', porcentajeMejora);


const DataParticipantes = document.querySelector(".participantes");
const participantesValor = DataParticipantes.querySelector(".valor")
const participantesPorcentaje = DataParticipantes.querySelector(".porcentaje")


participantesValor.innerHTML = participantes
participantesPorcentaje.innerHTML = Math.round(porcentajeParticipantes * 100) / 100 + "%"
root.style.setProperty('--participantes-semanales', porcentajeParticipantes);


const estadoActual = document.querySelector(".estado-actual");
const estadoActualValor = estadoActual.querySelector(".valor")
const estadoActualPorcentaje = estadoActual.querySelector(".porcentaje")


estadoActualValor.innerHTML = valor
estadoActualPorcentaje.innerHTML = Math.round(porcentajeEstadoActual * 100) / 100 + "%"

if (porcentajeEstadoActual >= 100) {
    root.style.setProperty('--color-circle',"#41f1b6");
}
root.style.setProperty('--estado-actual', porcentajeEstadoActual);