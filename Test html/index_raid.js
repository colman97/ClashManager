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

const collapsibleRows = document.querySelectorAll(".collapsible");

collapsibleRows.forEach(row => {
    row.addEventListener("click", () => {
        const content = row.nextElementSibling.querySelector(".content")
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

playersCapitalRaid.forEach((player,index)  => {
    option1 = document.createElement('option');
    option2 = document.createElement('option');
    
    option1.innerHTML = player.name;
    option2.innerHTML = player.name;
    option1.value=index;
    option2.value=index;
    document.querySelector('#player1Selection').appendChild(option1);
    document.querySelector('#player2Selection').appendChild(option2);
})
value1 = 0;
value2 = 1;

function getOption() {
    selectElement1 = document.getElementById('player1Selection');
    selectElement2 = document.getElementById('player2Selection');
    value1 = selectElement1.value;
    value2 = selectElement2.value;
    plotGrapgh()
}


function plotGrapgh(){

    var existingChart = Chart.getChart("myChart");
    if (existingChart) {
        existingChart.destroy();
    }

    var dataFromJS = [];
    var labels = [];
    raidsData =playersCapitalRaid[value1]
    for (var i = 0; i < raidsData['raids'].length; i++) {
        dataFromJS.push(raidsData['raids'][i]['capitalResourcesLooted']);
        labelPretty = raidsData['raids'][i]['date'].slice(6,8)+"/"+raidsData['raids'][i]['date'].slice(4,6)+"/"+raidsData['raids'][i]['date'].slice(0,4);
        labels.push(labelPretty);
    }

    var dataFromJS2 = [];
    var labels2 = [];
    raidsData2 =playersCapitalRaid[value2]
    for (var i = 0; i < raidsData2['raids'].length; i++) {
        dataFromJS2.push(raidsData2['raids'][i]['capitalResourcesLooted']);
        labelPretty2 = raidsData2['raids'][i]['date'].slice(6,8)+"/"+raidsData2['raids'][i]['date'].slice(4,6)+"/"+raidsData2['raids'][i]['date'].slice(0,4);
        labels2.push(labelPretty2);
    }

    const data = {
        labels: labels,
        datasets: [{
        label: playersCapitalRaid[value1]['name'],
        data: dataFromJS,
        backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
        ],
        borderColor: [
            'rgba(255, 26, 104, 1)',
        ],
        lineTension: 0
        },{
            label: playersCapitalRaid[value2]['name'],
            data: dataFromJS2,
            backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
            'rgba(54, 162, 235, 1)',
            ],
            lineTension: 0
        }]
    };
    const customLegend ={
        id:'customLegend',
        afterDraw:(chart,args,pluginOptions) =>{
            const {ctx,data,chartArea:{left,right,top,bottom,width,height},scales: {x,y}} = chart;
            ctx.save();

            data.datasets.forEach((dataset,index)=>{
                let color = 'transparent';
                if(chart.isDatasetVisible(index)=== true){
                    color = dataset.borderColor;
                }
                ctx.font = 'bolder 12px poppins';
                ctx.fillStyle = color;
                ctx.textAlign = 'right';
                ctx.fillText(dataset.label,left -50,chart.getDatasetMeta(index).data[0].y);
            })
        }
    }
    // config 
    const config = {
        type: 'line',
        data,
        options: {
            layout:{
                padding:{
                    left:(context)=>{
                        return context.chart.ctx.measureText('aaaaaaaaaaaaaaaa').width +25;
                    }
                }
            },
        scales: {
            y: {
            beginAtZero: true
            }
        }
        },
        plugins:[customLegend]
    };

    // render init block
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}
plotGrapgh();