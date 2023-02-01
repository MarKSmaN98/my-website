
/*
let overall;

fetch('https://api.weather.gov/gridpoints/LWX/38,77/forecast/hourly')
    .then((response) => response.json())
    .then((data) => {overall = data});
    //.then(() => {console.log(overall)});

console.log(overall);
*/

/*
async function fetchWeather(x,y) {
    try {
        const response = await fetch('https://api.weather.gov/gridpoints/LWX/' + x + ',' + y + '/forecast/hourly');
        const overall = await response.json();
        return overall;
    }
    catch {
        console.error(error);
    }
}

async function renderWeather(x,y) {
    //alert("renderWeather");
    const z = await fetchWeather(x,y);
    //console.log(z.properties.periods);
    return(z);
}
/*
renderWeather().then(function() {
    let head = document.getElementById("table");
    t = document.createElement('table');
    let count = 0;
    alert("starting for loop");
    for (element in z.properties.periods) {
        r = t.insertRow(count);
        c = r.insertCell(0);
        c.innerText = z.properties.periods.temperature+ 'F';
        ++c;
    }
    //alert("appending");
    head.appendChild(t);
});
*/

function renderWeather(x,y) {
    const finalArr = new Map();
    let url = 'https://api.weather.gov/gridpoints/LWX/' + x + ',' + y + '/forecast/hourly';
    try {
        let iterator = fetch(url);
        iterator
            .then(response => {
                return response.json();
            })
            .then(x => {
                const dataHead = x;
                const tempArr = dataHead.properties.periods;

                let tableMount = document.getElementById("table");
                if (tableMount.querySelector('table') != null) {
                    let toDel = tableMount.querySelectorAll('table');
                    for (let i = 0; i < toDel.length; i++) {
                        toDel[i].remove();
                    }
                }
                let tableHead = document.createElement('table');
                tableHead.id = "weatherData";
                tableMount.appendChild(tableHead);
                let row, cell;

                let iter, time, temp;
                iter = 0;
                for(element in tempArr) {
                    //console.log('iterator = ' + iter);
                    time = tempArr[iter].startTime;
                    time = time.slice(11,16);
                    temp = tempArr[iter].temperature + 'F';
                    //finalArr.set(time, temp);
                    row = tableHead.insertRow(iter);
                    row.insertCell(0).textContent = time + ': ';
                    row.insertCell(1).textContent = temp;
                    ++iter;
                }

        
        
        
                //console.log(time);
                //console.log(temp);
                console.log(finalArr);
                return finalArr;
            });
        }
    catch {
        console.error(error);
    }
}
function getValues(){
    let x = document.getElementById("Lat").value;
    //console.log(x);
    //debugger;
    let y = document.getElementById("Long").value;
    console.log(y);
    //alert("getValues");
    renderWeather(x,y);
}

function a() {
    alert("click works!")
}



var el = document.getElementById("btnSearch");
el.addEventListener("click", getValues, false);




    //30°12'26.4"N 97°46'20.8"W