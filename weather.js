// Weather API functionality
class WeatherSystem {
    constructor() {
        this.apiKey = localStorage.getItem('weatherApiKey') || '';
        this.currentLocation = 'Tehran';
        this.weatherData = null;
        this.forecastData = null;
    }

    async fetchWeatherData(location = this.currentLocation) {
        if (!this.apiKey) {
            throw new Error(currentLang === 'fa' ? 'کلید API تنظیم نشده است' : 'API key not set');
        }

        try {
            // Using OpenWeatherMap API as example
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}&units=metric&lang=${currentLang === 'fa' ? 'fa' : 'en'}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            this.weatherData = data;
            this.updateWeatherDisplay(data);
            
            // Fetch forecast
            await this.fetchForecastData(location);
            
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.showWeatherError(error.message);
        }
    }

    async fetchForecastData(location) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${this.apiKey}&units=metric&lang=${currentLang === 'fa' ? 'fa' : 'en'}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            this.forecastData = data;
            this.updateForecastDisplay(data);
            
        } catch (error) {
            console.error('Forecast fetch error:', error);
        }
    }

    updateWeatherDisplay(data) {
        // Update current weather
        document.getElementById('currentTemp').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('weatherDesc').textContent = data.weather[0].description;
        document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)} ${currentLang === 'fa' ? 'کیلومتر/ساعت' : 'km/h'}`;
        document.getElementById('uvIndex').textContent = data.uvi || 'N/A';

        // Update weather icon
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        
        const iconCode = data.weather[0].icon;
        document.getElementById('weatherIcon').textContent = iconMap[iconCode] || '🌤️';
    }

    updateForecastDisplay(data) {
        const forecastGrid = document.getElementById('forecastGrid');
        forecastGrid.innerHTML = '';

        // Get daily forecasts (every 8th item for daily forecast)
        const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

        dailyForecasts.forEach((forecast, index) => {
            const date = new Date(forecast.dt * 1000);
            const dayName = index === 0 ? 
                (currentLang === 'fa' ? 'امروز' : 'Today') : 
                (index === 1 ? (currentLang === 'fa' ? 'فردا' : 'Tomorrow') : 
                date.toLocaleDateString(currentLang === 'fa' ? 'fa-IR' : 'en-US', { weekday: 'short' }));

            const iconMap = {
                '01d': '☀️', '01n': '🌙',
                '02d': '⛅', '02n': '☁️',
                '03d': '☁️', '03n': '☁️',
                '04d': '☁️', '04n': '☁️',
                '09d': '🌧️', '09n': '🌧️',
                '10d': '🌦️', '10n': '🌧️',
                '11d': '⛈️', '11n': '⛈️',
                '13d': '❄️', '13n': '❄️',
                '50d': '🌫️', '50n': '🌫️'
            };

            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="text-sm font-medium mb-2">${dayName}</div>
                <div class="text-2xl mb-2">${iconMap[forecast.weather[0].icon] || '🌤️'}</div>
                <div class="text-lg font-semibold">${Math.round(forecast.main.temp)}°C</div>
                <div class="text-xs opacity-75 mt-1">${forecast.weather[0].description}</div>
                <div class="text-xs opacity-75 mt-1">${forecast.main.humidity}% ${currentLang === 'fa' ? 'رطوبت' : 'humidity'}</div>
            `;
            
            forecastGrid.appendChild(forecastItem);
        });
    }

    showWeatherError(message) {
        document.getElementById('currentTemp').textContent = '--°C';
        document.getElementById('weatherDesc').textContent = currentLang === 'fa' ? 'خطا در دریافت داده‌ها' : 'Error loading data';
        document.getElementById('feelsLike').textContent = '--°C';
        document.getElementById('humidity').textContent = '--%';
        document.getElementById('windSpeed').textContent = `-- ${currentLang === 'fa' ? 'کیلومتر/ساعت' : 'km/h'}`;
        document.getElementById('uvIndex').textContent = '--';
        
        if (window.showAlert) {
            window.showAlert(`❌ ${currentLang === 'fa' ? 'خطا در دریافت آب و هوا: ' : 'Weather error: '}${message}`, 'red');
        }
    }

    saveApiKey(apiKey) {
        this.apiKey = apiKey;
        localStorage.setItem('weatherApiKey', apiKey);
    }

    setLocation(location) {
        this.currentLocation = location;
        localStorage.setItem('weatherLocation', location);
    }
}

// Global weather system instance
let weatherSystem;

// Initialize weather system
function initializeWeather() {
    weatherSystem = new WeatherSystem();
    
    // Load saved location
    const savedLocation = localStorage.getItem('weatherLocation');
    if (savedLocation) {
        weatherSystem.currentLocation = savedLocation;
        document.getElementById('locationInput').value = savedLocation;
    }

    // Load saved API key
    const savedApiKey = localStorage.getItem('weatherApiKey');
    if (savedApiKey) {
        weatherSystem.apiKey = savedApiKey;
        // Auto-load weather if API key exists
        weatherSystem.fetchWeatherData();
    }
}

// Global functions for weather controls
function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    if (apiKey) {
        weatherSystem.saveApiKey(apiKey);
        if (window.showAlert) {
            window.showAlert(currentLang === 'fa' ? '✅ کلید API ذخیره شد' : '✅ API key saved', 'green', 3000);
        }
    } else {
        if (window.showAlert) {
            window.showAlert(currentLang === 'fa' ? '❌ لطفاً کلید API را وارد کنید' : '❌ Please enter API key', 'red');
        }
    }
}

function getWeather() {
    const location = document.getElementById('locationInput').value.trim();
    if (location) {
        weatherSystem.setLocation(location);
        weatherSystem.fetchWeatherData(location);
    } else {
        if (window.showAlert) {
            window.showAlert(currentLang === 'fa' ? '❌ لطفاً نام شهر را وارد کنید' : '❌ Please enter city name', 'red');
        }
    }
}

// Auto-refresh weather every 10 minutes
setInterval(() => {
    if (weatherSystem && weatherSystem.apiKey) {
        weatherSystem.fetchWeatherData();
    }
}, 600000);

console.log('🌤️ Weather system initialized');