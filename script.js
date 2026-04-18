document.getElementById('search-btn').addEventListener('click', getWeather);

document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

function getWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('请输入城市名');
        return;
    }

    const apiKey = 'c295211ff94fb5cd1024ee18afc642b5';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('城市未找到，请检查输入');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('获取天气数据失败，请稍后再试');
        });
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `湿度: ${data.main.humidity}%`;
}