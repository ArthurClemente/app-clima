window.addEventListener('load', () => {
    let long;
    let lat;
    let descTemperatura = document.querySelector(".descTemperatura");
    let grau = document.querySelector(".grau");
    let local = document.querySelector(".clima-local");

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
                })
        });
    }
});