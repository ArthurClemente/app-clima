window.addEventListener("load", () => {
    let appId = '923a24b5768942f63baf42197c5dca3a';
    let unidade = 'metric';

    let long;
    let lat;
    let descTemperatura = document.querySelector(".descTemperatura");
    let grau = document.querySelector(".grau");
    let local = document.querySelector(".clima-local");
    let mudarGrau = document.querySelector(".mudarGrau");
    const spanTemperatura = document.querySelector(".temperatura span");

        // Transformar o if em função
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp } = data.main;
                    const { description, icon } = data.weather[0];
                    const { name } = data;
                    grau.textContent = temp;
                    descTemperatura.textContent = description;
                    local.textContent = name;

                    //Coloca o ícone
                    document.querySelector(".icone").setAttribute("src", icon)

                    //Muda a temperatura C/F
                    graus(temp)
                })
        });
    }else{
        
    }
    // Criar função para pegar as coordenadas da cidade pelo nome
    function graus(temperatura) {
        mudarGrau.addEventListener('click', () => {
            if (spanTemperatura.textContent === "Cº") {
                let grauF = (temperatura * 9/5) + 32;
                grau.textContent = Math.floor(grauF);
                spanTemperatura.textContent = "Fº";
            } else {
                grau.textContent = temperatura;
                spanTemperatura.textContent = "Cº";
            }
        })
    }

    function buscarClima(termoDeBusca) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${termoDeBusca}&APPID=${appId}&units=${unidade}`).then(result => {
            return result.json();
        }).then(result => {
            init(result);
        })
    }

    function init(resultadoDoServidor){
        console.log(resultadoDoServidor);
    }

    document.getElementById('botaoPesquisa').addEventListener('click', () => {
        let termoDeBusca = document.getElementById('inputPesquisa').value;
        if(termoDeBusca){
            buscarClima(termoDeBusca);
        }
    })
});