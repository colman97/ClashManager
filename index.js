const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const showMorePlayers = document.querySelector("#show-all-player-records");

playerRecordsSize = 5
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
    <td class="${raid.status === 'ended' ? 'primary' :  'warning'}">${raid.status === 'ended' ? 'Completed' : 'Ongoing'}</td>
    
    `
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
})

const root = document.documentElement;

participantes = DBraids[0]['participantes']
totalClan = DBraids[0]['totales']
comienzo = 1710
valor = DBraids[0]['average']
max = 0
for (i=0;i<DBraids.length;i++) {
    if(max < DBraids[i]['average']){
        max =  DBraids[i]['average']
    }
}
console.log(max)
record = max

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


function refreshPlayers(start,number,media,tipo){
    contador = 0
    listaRecords = []
    playersCapitalRaid.forEach(player =>{
        recordLocal = 0
        recordDate= ""
        numAttack = 0
        totalAvg = 0
        contadorAvgTotal = 0
        player['raids'].forEach(raid =>{
            contadorAvgTotal += 1
            totalAvg += raid['capitalResourcesLooted']
            if (raid['capitalResourcesLooted'] > recordLocal){
                recordLocal = raid['capitalResourcesLooted']
                recordDate = raid['date']
                numAttack = raid['attacks']
            }
        })
        jugadorDict = {}
        jugadorDict['nombre'] = player['name']
        jugadorDict['record'] = recordLocal
        jugadorDict['fecha'] = recordDate
        jugadorDict['avgTotal'] = Math.round(totalAvg/contadorAvgTotal)
        mediaJugador = recordLocal/numAttack
        jugadorDict['porcentaje'] = Math.round((((recordLocal/(media*6))-1)*100)*100)/100 + "%"
        listaRecords.push(jugadorDict)
    });

    listaRecords.sort(function compareByAge(a, b) {
        if (a['record'] < b['record']) {
          return 1;
        }
        if (a['record'] > b['record']) {
          return -1;
        }
        return 0;
      }).slice(start,number).forEach(player =>{
        console.log(player)
        arr=["success","primary","danger"]
        div = document.createElement('div');
        divContent = `
        <div>${contador+ start +1}</div>
            <div class="icon ${arr[contador % arr.length]}">
                <span class="material-icons-sharp">person</span>
            </div>
            <div class="right">
                <div class="info">
                    <h3>${player.nombre}</h3>
                    <small class="text-muted">${player.fecha.slice(-2,)}/${player.fecha.slice(-4,-2)}/${player.fecha.slice(0,-4)}</small>
                </div>
                <h5 class="${player.porcentaje.slice(0,-1) > 0 ? 'success' : player.porcentaje.slice(0,-1) < 0 ? 'danger' : ''}">${player.porcentaje}</h5>
                <div class="info">
                    <h3>Best: ${player['record']}</h3>
                    <small class="text-muted">avg: ${player['avgTotal']}</small>
                </div>
            </div>
            `
        div.innerHTML = divContent;
        div.classList.add("item")
        document.querySelector('.sales-analytics-items').appendChild(div);
        contador = contador +1
    })
}

refreshPlayers(0,playerRecordsSize,record,1)
showMorePlayers.addEventListener("click",() => {
    if (playerRecordsState == "closed"){
        last = playerRecordsSize
        playerRecordsSize = playerRecordsSize +45
        refreshPlayers(last,playerRecordsSize,record,1)
        showMorePlayers.innerHTML = "Hide"
        playerRecordsState = "open"
        event.preventDefault()
    } else {
        playerRecordsSize = 5
        document.querySelector('.sales-analytics-items').innerHTML ="";
        refreshPlayers(0,playerRecordsSize,record,1)
        showMorePlayers.innerHTML = "Show All"
        playerRecordsState = "closed"
        event.preventDefault()
    }
    
})
