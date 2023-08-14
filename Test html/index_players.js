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
const dropdown1 = document.getElementById('player1Selection');
const dropdown2 = document.getElementById('player2Selection');
dropdown1.value = value1;
dropdown2.value = value2;

function getOption() {
    value1 = dropdown1.value;
    value2 = dropdown2.value;
    plotGrapgh()
}
function getRandomColor(seed) {

    const seedValue = seed;
    const rng = new Math.seedrandom(seedValue);
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(rng() * 16)];
    }

    return color;
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
            getRandomColor(1)
        ],
        borderColor: [
            getRandomColor(1)
        ],
        lineTension: 0
        },{
            label: playersCapitalRaid[value2]['name'],
            data: dataFromJS2,
            backgroundColor: [
                getRandomColor(2)
            ],
            borderColor: [
                getRandomColor(2)
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
                numeroImportante = 0
                // busco a ver cual es el primer resultado no nulo, para poner a esa altura el nombre aa la izquierda
                for(i=0;i<chart.getDatasetMeta(index).data.length;i++){
                    if(dataset.data[i] != null){
                        numeroImportante = i
                        break;
                    }
                }
                ctx.fillText(dataset.label,left -50,chart.getDatasetMeta(index).data[numeroImportante].y);
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



const data = {
    labels: [],
    datasets: []
};

//cogemos los labels de la bbdd de raids
DBraids.forEach((dataset,index)=>{
    dateClean = dataset['raidDate'].slice(6,8)+"/"+dataset['raidDate'].slice(4,6)+"/"+dataset['raidDate'].slice(0,4);
    data['labels'].push(dateClean)
})

console.log(data)
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


playersCapitalRaid.forEach((player,index) =>{
    var dataFromJS3 = [];
    var labels3 = [];
    raidsData3 =playersCapitalRaid[index]
    for (var i = 0; i < raidsData3['raids'].length; i++) {
        dataFromJS3.push(raidsData3['raids'][i]['capitalResourcesLooted']);
        labelPretty3 = raidsData3['raids'][i]['date'].slice(6,8)+"/"+raidsData3['raids'][i]['date'].slice(4,6)+"/"+raidsData3['raids'][i]['date'].slice(0,4);
        labels3.push(labelPretty3);
    }

    data3={}
    data3['label'] = playersCapitalRaid[index]['name']
    data3['data'] = dataFromJS3
    data3['backgroundColor'] = getRandomColor(index)
    data3['borderColor'] = getRandomColor(index)
    data3['lineTension'] = 0
    data['datasets'].push(data3)
})


// render init block
const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config
);
plotGrapgh();