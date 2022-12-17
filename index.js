const weatherApp = {
    start: () => {
        document.getElementById('get_weather')
        document.addEventListener('click', weatherApp.getWeather);
    },
    getWeather: (ev) => {
        let lat = document.getElementById('latitude').value;
        let lon = document.getElementById('longitude').value;
        let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=996c35add7baef1972abb370040cbc68&lang=en&units=metric`;
        
        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((data) => {
                weatherApp.displayWeather(data);
            })
          .catch(console.err);
    },
    displayWeather: (resp) => {
        console.log(resp);
        let row = document.querySelector('.weather_card');

        row.innerHTML = resp.daily
            .map((day, index) => {
                if(index <= 0){
                    let  dt = new Date(day.dt * 1000); 
                    return `
                    <div class="card_content">
                        <h3 class="card_date">${dt.toDateString()}</h3>
                        <img src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png" alt="logo" id="logo">
                        <div class="information">
                            <p class="card_info"><strong>High</strong>: ${day.temp.max}&deg;C</p>
                            <p class="card_info"><strong>Low</strong>: ${day.temp.min}&deg;C</p>
                            <p class="card_info"><strong>UV Index</strong>: ${day.uvi}</p>
                            <p class="card_info"><strong>Precipitation</strong>: ${day.pop * 100}%</p>
                        </div>
                    </div>
                    `;
                }
            })
            .join(' ');
    },

};

weatherApp.start();