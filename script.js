// Theme System
let currentTheme = 'light';

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    if (theme === 'system') {
        theme = getSystemTheme();
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    
    // Update theme toggle
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = currentLang === 'fa' ? 'روشن' : 'Light';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = currentLang === 'fa' ? 'تاریک' : 'Dark';
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    
    // Save theme preference
    if (window.storage) {
        window.storage.set('theme', currentTheme);
    }
    
    // Show theme change notification
    const themeNames = {
        fa: { light: 'روشن', dark: 'تاریک' },
        en: { light: 'Light', dark: 'Dark' }
    };
    
    const themeName = themeNames[currentLang][currentTheme];
    const message = currentLang === 'fa' ? 
        `🎨 تم به ${themeName} تغییر یافت` : 
        `🎨 Theme changed to ${themeName}`;
    
    showAlert(message, 'blue', 2000);
}

function initializeTheme() {
    // Load saved theme or use system default
    if (window.storage) {
        currentTheme = window.storage.get('theme', 'light');
    }
    
    applyTheme(currentTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (currentTheme === 'system') {
            applyTheme('system');
        }
    });
}

// Language System
let currentLang = 'fa';

const translations = {
    fa: {
        mainTitle: '🚜 پنل کنترل مزرعه هوشمند',
        mainSubtitle: 'نظارت و کنترل سیستم‌های مزرعه در زمان واقعی',
        refreshBtn: '🔄 بروزرسانی همه داده‌ها',
        weatherSettingsBtn: '⚙️ تنظیمات آب و هوا',
        toggleModulesBtn: '📋 نمایش/مخفی کردن همه ماژول‌ها',
        weatherConfigTitle: '🌤️ پیکربندی API آب و هوا',
        apiKeyLabel: 'کلید RapidAPI',
        locationLabel: 'موقعیت',
        saveApiBtn: '💾 ذخیره کلید API',
        getWeatherBtn: '🌍 دریافت آب و هوا',
        systemStatusTitle: 'وضعیت سیستم',
        systemStatusLoading: 'در حال بارگذاری وضعیت سیستم...',
        weatherTitle: '🌤️ آب و هوا',
        feelsLikeLabel: 'احساس دما',
        humidityLabel: 'رطوبت',
        windLabel: 'باد',
        uvLabel: 'شاخص UV',
        forecastTitle: '📅 پیش‌بینی ۵ روزه',
        // Module names
        damdari: 'دامداری',
        golkhoneh: 'گلخانه',
        house: 'خانه',
        moocall: 'موکال',
        stash: 'انبار',
        // Status labels
        online: 'آنلاین',
        offline: 'آفلاین',
        offlineMessage: 'ماژول آفلاین - داده‌ها ممکن است قدیمی باشند',
        temperature: 'دما',
        humidity: 'رطوبت',
        gasLevel: 'سطح گاز',
        lightLevel: 'سطح نور',
        securityAlarm: 'آلارم امنیتی',
        fanStatus: 'وضعیت فن',
        lightStatus: 'وضعیت چراغ',
        doorStatus: 'وضعیت درب',
        active: 'فعال',
        inactive: 'غیرفعال',
        on: 'روشن',
        off: 'خاموش',
        open: 'باز',
        closed: 'بسته',
        // Control labels
        controls: 'کنترل‌ها',
        controlsDisabled: 'کنترل‌ها غیرفعال (ماژول آفلاین)',
        fanControl: 'کنترل فن',
        lightControl: 'کنترل چراغ',
        doorControl: 'کنترل درب',
        alarmControl: 'کنترل آلارم',
        turnOn: 'روشن کردن',
        turnOff: 'خاموش کردن',
        openDoor: 'باز کردن درب',
        closeDoor: 'بستن درب',
        stopAlarm: 'توقف آلارم',
        // Units
        celsius: '°C',
        percent: '%',
        kmh: 'کیلومتر/ساعت',
        // Days
        today: 'امروز',
        tomorrow: 'فردا'
    },
    en: {
        mainTitle: '🚜 Smart Farm Control Panel',
        mainSubtitle: 'Monitor and control your farm systems in real-time',
        refreshBtn: '🔄 Refresh All Data',
        weatherSettingsBtn: '⚙️ Weather Settings',
        toggleModulesBtn: '📋 Toggle All Modules',
        weatherConfigTitle: '🌤️ Weather API Configuration',
        apiKeyLabel: 'RapidAPI Key',
        locationLabel: 'Location',
        saveApiBtn: '💾 Save API Key',
        getWeatherBtn: '🌍 Get Weather',
        systemStatusTitle: 'System Status',
        systemStatusLoading: 'Loading system status...',
        weatherTitle: '🌤️ Weather',
        feelsLikeLabel: 'Feels Like',
        humidityLabel: 'Humidity',
        windLabel: 'Wind',
        uvLabel: 'UV Index',
        forecastTitle: '📅 5-Day Forecast',
        // Module names
        damdari: 'Livestock',
        golkhoneh: 'Greenhouse',
        house: 'House',
        moocall: 'MooCall',
        stash: 'Storage',
        // Status labels
        online: 'Online',
        offline: 'Offline',
        offlineMessage: 'Module offline - data may be outdated',
        temperature: 'Temperature',
        humidity: 'Humidity',
        gasLevel: 'Gas Level',
        lightLevel: 'Light Level',
        securityAlarm: 'Security Alarm',
        fanStatus: 'Fan Status',
        lightStatus: 'Light Status',
        doorStatus: 'Door Status',
        active: 'Active',
        inactive: 'Inactive',
        on: 'On',
        off: 'Off',
        open: 'Open',
        closed: 'Closed',
        // Control labels
        controls: 'Controls',
        controlsDisabled: 'Controls disabled (module offline)',
        fanControl: 'Fan Control',
        lightControl: 'Light Control',
        doorControl: 'Door Control',
        alarmControl: 'Alarm Control',
        turnOn: 'Turn On',
        turnOff: 'Turn Off',
        openDoor: 'Open Door',
        closeDoor: 'Close Door',
        stopAlarm: 'Stop Alarm',
        // Units
        celsius: '°C',
        percent: '%',
        kmh: 'km/h',
        // Days
        today: 'Today',
        tomorrow: 'Tomorrow'
    }
};

function t(key) {
    return translations[currentLang][key] || key;
}

function toggleLanguage() {
    currentLang = currentLang === 'fa' ? 'en' : 'fa';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    
    // Update language toggle
    document.getElementById('langIcon').textContent = currentLang === 'fa' ? '🇺🇸' : '🇮🇷';
    document.getElementById('langText').textContent = currentLang === 'fa' ? 'English' : 'فارسی';
    
    updateUILanguage();
    
    // Update theme toggle text
    applyTheme(currentTheme);
    
    // Re-render modules if they exist
    if (window.lastModulesData) {
        updateModules(window.lastModulesData);
    }
}

function updateUILanguage() {
    // Update all translatable elements
    Object.keys(translations[currentLang]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Update placeholders
    const apiKeyInput = document.getElementById('apiKeyInput');
    if (apiKeyInput) {
        apiKeyInput.placeholder = currentLang === 'fa' ? 'کلید RapidAPI خود را وارد کنید' : 'Enter your RapidAPI key';
    }
    
    const locationInput = document.getElementById('locationInput');
    if (locationInput) {
        locationInput.placeholder = currentLang === 'fa' ? 'نام شهر را وارد کنید' : 'Enter city name';
        if (!locationInput.value || locationInput.value === 'تهران' || locationInput.value === 'Tehran') {
            locationInput.value = currentLang === 'fa' ? 'تهران' : 'Tehran';
        }
    }
}

const API_BASE = 'https://z36b8c50-8180.inc1.devtunnels.ms/api';
window.lastModulesData = null;

// Enhanced fetch with better error handling
async function fetchAllData() {
    showAlert(currentLang === 'fa' ? '🔄 در حال بروزرسانی همه داده‌ها...' : '🔄 Refreshing all data...', 'blue', 2000);
    try {
        await Promise.all([
            fetchSystemStatus(),
            fetchModules()
        ]);
        showAlert(currentLang === 'fa' ? '✅ همه داده‌ها با موفقیت بروزرسانی شد' : '✅ All data refreshed successfully', 'green', 3000);
    } catch (error) {
        showAlert((currentLang === 'fa' ? '❌ خطا در دریافت داده‌ها: ' : '❌ Error fetching data: ') + error.message, 'red');
    }
}

// Fetch system status with enhanced display
async function fetchSystemStatus() {
    try {
        const response = await fetch(`${API_BASE}/status`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        updateSystemStatus(data);
    } catch (error) {
        showAlert((currentLang === 'fa' ? '❌ خطا در دریافت وضعیت سیستم: ' : '❌ Error fetching system status: ') + error.message, 'red');
        updateSystemStatusError();
    }
}

// Fetch module data
async function fetchModules() {
    try {
        const response = await fetch(`${API_BASE}/modules`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        window.lastModulesData = data.modules;
        updateModules(data.modules);
    } catch (error) {
        showAlert((currentLang === 'fa' ? '❌ خطا در دریافت داده‌های ماژول: ' : '❌ Error fetching module data: ') + error.message, 'red');
        // Show modules with offline status when fetch fails
        if (window.lastModulesData) {
            const offlineModules = {};
            Object.keys(window.lastModulesData).forEach(key => {
                offlineModules[key] = { ...window.lastModulesData[key], online: false };
            });
            updateModules(offlineModules);
        } else {
            // Show default modules structure when no data available
            const defaultModules = {
                damdari: { online: false, temperature: null, humidity: null },
                golkhoneh: { online: false, temperature: null, humidity: null },
                house: { online: false, doorStatus: null, alarmStatus: null },
                moocall: { online: false, temperature: null },
                stash: { online: false, temperature: null, humidity: null }
            };
            updateModules(defaultModules);
        }
    }
}

// Enhanced system status display
function updateSystemStatus(data) {
    const statusDiv = document.getElementById('systemStatus');
    const isHealthy = data.wifiConnected && Object.values(data.modules_health || {}).some(v => v);
    
    const uptimeHours = Math.floor(data.uptime / 3600);
    const uptimeMinutes = Math.floor((data.uptime % 3600) / 60);
    const freeMemory = (data.freeHeap / 1024).toFixed(1);
    
    statusDiv.innerHTML = `
        <h2 class="text-2xl font-semibold mb-4 flex items-center">
            <span class="status-indicator ${isHealthy ? 'status-online' : 'status-offline'}"></span>
            <span style="color: var(--text-primary)">${t('systemStatusTitle')}</span>
        </h2>
        <div class="stats-grid">
            <div class="status-card">
                <div class="text-sm" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'زمان فعالیت' : 'Uptime'}</div>
                <div class="text-xl font-semibold" style="color: var(--text-primary)">${uptimeHours}${currentLang === 'fa' ? 'ساعت' : 'h'} ${uptimeMinutes}${currentLang === 'fa' ? 'دقیقه' : 'm'}</div>
            </div>
            <div class="status-card">
                <div class="text-sm" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'حافظه آزاد' : 'Free Memory'}</div>
                <div class="text-xl font-semibold" style="color: var(--text-primary)">${freeMemory} KB</div>
            </div>
            <div class="status-card">
                <div class="text-sm" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'وضعیت WiFi' : 'WiFi Status'}</div>
                <div class="text-xl font-semibold ${data.wifiConnected ? 'text-green-600' : 'text-red-600'}">
                    ${data.wifiConnected ? (currentLang === 'fa' ? '✅ متصل' : '✅ Connected') : (currentLang === 'fa' ? '❌ قطع' : '❌ Disconnected')}
                </div>
            </div>
            <div class="status-card">
                <div class="text-sm" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'آدرس IP' : 'IP Address'}</div>
                <div class="text-lg font-mono" style="color: var(--text-primary)">${data.ip || 'N/A'}</div>
            </div>
            <div class="status-card">
                <div class="text-sm" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'شبکه' : 'Network'}</div>
                <div class="text-lg" style="color: var(--text-primary)">${data.ssid || 'N/A'}</div>
            </div>
            <div class="status-card">
                <div class="text-sm" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'کلاینت‌های متصل' : 'Connected Clients'}</div>
                <div class="text-xl font-semibold" style="color: var(--text-primary)">${data.connectedClients || 0}</div>
            </div>
        </div>
        <div class="mt-4">
            <h3 class="text-lg font-medium mb-2" style="color: var(--text-primary)">${currentLang === 'fa' ? 'سلامت ماژول‌ها' : 'Module Health'}</h3>
            <div class="flex flex-wrap gap-2">
                ${Object.entries(data.modules_health || {}).map(([module, status]) => 
                    `<span class="px-3 py-1 rounded-full text-sm font-medium ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${t(module)}: ${status ? t('online') : t('offline')}
                    </span>`
                ).join('')}
            </div>
        </div>
    `;
}

function updateSystemStatusError() {
    const statusDiv = document.getElementById('systemStatus');
    statusDiv.innerHTML = `
        <h2 class="text-2xl font-semibold mb-4 flex items-center">
            <span class="status-indicator status-offline"></span>
            <span style="color: var(--text-primary)">${t('systemStatusTitle')}</span>
        </h2>
        <div class="text-red-600 text-center py-8">
            <div class="text-4xl mb-2">⚠️</div>
            <div class="text-lg">${currentLang === 'fa' ? 'عدم اتصال به سیستم مزرعه' : 'Unable to connect to farm system'}</div>
            <div class="text-sm mt-2">${currentLang === 'fa' ? 'اتصال خود را بررسی کرده و دوباره تلاش کنید' : 'Check your connection and try again'}</div>
        </div>
    `;
}

// Enhanced module display - ALWAYS show content regardless of online status
function updateModules(modules) {
    const container = document.getElementById('modulesContainer');
    container.innerHTML = '';
    
    for (const [moduleName, data] of Object.entries(modules)) {
        const moduleDiv = document.createElement('div');
        moduleDiv.className = `glass-card p-6 rounded-xl shadow-xl module-section ${data.online ? 'online' : 'offline'}`;
        
        const moduleIcon = getModuleIcon(moduleName);
        const statusBadge = data.online ? 
            `<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🟢 ${t('online')}</span>` :
            `<span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">🔴 ${t('offline')}</span>`;

        moduleDiv.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-semibold cursor-pointer flex items-center" onclick="toggleSection(this.parentElement.nextElementSibling)" style="color: var(--text-primary)">
                    <span class="module-icon">${moduleIcon}</span>
                    ${t(moduleName)}
                </h2>
                ${statusBadge}
            </div>
            <div class="module-content">
                ${!data.online ? `<div class="offline-indicator">${t('offlineMessage')}</div>` : ''}
                ${renderModuleData(moduleName, data)}
                ${renderControlForm(moduleName, data)}
            </div>
        `;
        container.appendChild(moduleDiv);
    }
}

function getModuleIcon(moduleName) {
    const icons = {
        'damdari': '🐄',
        'golkhoneh': '🌱',
        'house': '🏠',
        'moocall': '📱',
        'stash': '🏪'
    };
    return icons[moduleName] || '📦';
}

// Complete module data rendering for all modules - ALWAYS show data
function renderModuleData(moduleName, data) {
    let html = `<div class="mb-6">
        <h3 class="text-lg font-medium mb-3" style="color: var(--text-primary)">📊 ${currentLang === 'fa' ? 'وضعیت فعلی' : 'Current Status'}</h3>
        <div class="sensor-grid">`;
    
    if (moduleName === 'damdari') {
        html += `
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('temperature')}</div>
                <div class="text-lg font-semibold text-blue-600">${data.temperature ?? 'N/A'} ${t('celsius')}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('humidity')}</div>
                <div class="text-lg font-semibold text-green-600">${data.humidity ?? 'N/A'} ${t('percent')}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('gasLevel')}</div>
                <div class="text-lg font-semibold text-yellow-600">${data.gasLevel ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('lightLevel')}</div>
                <div class="text-lg font-semibold text-purple-600">${data.lightLevel ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('securityAlarm')}</div>
                <div class="text-lg font-semibold ${data.securityAlarm ? 'text-red-600' : 'text-green-600'}">
                    ${data.securityAlarm ? `🚨 ${t('active')}` : `✅ ${t('inactive')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('fanStatus')}</div>
                <div class="text-lg font-semibold ${data.fanStatus ? 'text-green-600' : 'text-gray-600'}">
                    ${data.fanStatus ? `🌀 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('lightStatus')}</div>
                <div class="text-lg font-semibold ${data.lightStatus ? 'text-yellow-600' : 'text-gray-600'}">
                    ${data.lightStatus ? `💡 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'وضعیت تزریق' : 'Injection Status'}</div>
                <div class="text-lg font-semibold text-blue-600">${data.injectionStatus ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'درب ورودی' : 'Entrance Door'}</div>
                <div class="text-lg font-semibold text-indigo-600">${data.entranceDoorStatus ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'درب خروجی' : 'Exit Door'}</div>
                <div class="text-lg font-semibold text-indigo-600">${data.exitDoorStatus ?? 'N/A'}</div>
            </div>
        `;
    } else if (moduleName === 'golkhoneh') {
        html += `
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('temperature')}</div>
                <div class="text-lg font-semibold text-blue-600">${data.temperature ?? 'N/A'} ${t('celsius')}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('humidity')}</div>
                <div class="text-lg font-semibold text-green-600">${data.humidity ?? 'N/A'} ${t('percent')}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('gasLevel')}</div>
                <div class="text-lg font-semibold text-yellow-600">${data.gasLevel ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('lightLevel')}</div>
                <div class="text-lg font-semibold text-purple-600">${data.lightLevel ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('fanStatus')}</div>
                <div class="text-lg font-semibold ${data.fanStatus ? 'text-green-600' : 'text-gray-600'}">
                    ${data.fanStatus ? `🌀 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'وضعیت سقف' : 'Roof Status'}</div>
                <div class="text-lg font-semibold ${data.roofStatus ? 'text-blue-600' : 'text-gray-600'}">
                    ${data.roofStatus ? `🔓 ${t('open')}` : `🔒 ${t('closed')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'چراغ سقف' : 'Roof Light'}</div>
                <div class="text-lg font-semibold ${data.roofLightStatus ? 'text-yellow-600' : 'text-gray-600'}">
                    ${data.roofLightStatus ? `💡 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('doorStatus')}</div>
                <div class="text-lg font-semibold ${data.doorStatus ? 'text-blue-600' : 'text-gray-600'}">
                    ${data.doorStatus ? `🔓 ${t('open')}` : `🔒 ${t('closed')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'وضعیت پمپ' : 'Pump Status'}</div>
                <div class="text-lg font-semibold ${data.pumpStatus ? 'text-blue-600' : 'text-gray-600'}">
                    ${data.pumpStatus ? `💧 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'خطوط فعال' : 'Active Lines'}</div>
                <div class="text-lg font-semibold text-blue-600">${data.specificData?.ACTIVE_LINES ?? 'N/A'}</div>
            </div>
        `;
    } else if (moduleName === 'house') {
        html += `
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('doorStatus')}</div>
                <div class="text-lg font-semibold text-blue-600">${data.doorStatus ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'آلارم' : 'Alarm'}</div>
                <div class="text-lg font-semibold ${data.alarmStatus ? 'text-red-600' : 'text-green-600'}">
                    ${data.alarmStatus ? `🚨 ${t('active')}` : `✅ ${t('inactive')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'PIR نهارخوری' : 'PIR Dining'}</div>
                <div class="text-lg font-semibold ${data.pirDining ? 'text-red-600' : 'text-green-600'}">
                    ${data.pirDining ? '🔴' : '⚪'}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'PIR اتاق ۱' : 'PIR Room 1'}</div>
                <div class="text-lg font-semibold ${data.pirRoom1 ? 'text-red-600' : 'text-green-600'}">
                    ${data.pirRoom1 ? '🔴' : '⚪'}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'PIR اتاق ۲' : 'PIR Room 2'}</div>
                <div class="text-lg font-semibold ${data.pirRoom2 ? 'text-red-600' : 'text-green-600'}">
                    ${data.pirRoom2 ? '🔴' : '⚪'}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'PIR راهرو' : 'PIR Hallway'}</div>
                <div class="text-lg font-semibold ${data.pirHallway ? 'text-red-600' : 'text-green-600'}">
                    ${data.pirHallway ? '🔴' : '⚪'}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'چراغ نهارخوری' : 'Light Dining'}</div>
                <div class="text-lg font-semibold ${data.lightDining ? 'text-yellow-600' : 'text-gray-600'}">
                    ${data.lightDining ? `💡 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'چراغ اتاق ۱' : 'Light Room 1'}</div>
                <div class="text-lg font-semibold ${data.lightRoom1 ? 'text-yellow-600' : 'text-gray-600'}">
                    ${data.lightRoom1 ? `💡 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'چراغ اتاق ۲' : 'Light Room 2'}</div>
                <div class="text-lg font-semibold ${data.lightRoom2 ? 'text-yellow-600' : 'text-gray-600'}">
                    ${data.lightRoom2 ? `💡 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'چراغ راهرو' : 'Light Hallway'}</div>
                <div class="text-lg font-semibold ${data.lightHallway ? 'text-yellow-600' : 'text-gray-600'}">
                    ${data.lightHallway ? `💡 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
        `;
    } else if (moduleName === 'moocall') {
        html += `
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('temperature')}</div>
                <div class="text-lg font-semibold text-blue-600">${data.temperature ?? 'N/A'} ${t('celsius')}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'وضعیت LED' : 'LED Status'}</div>
                <div class="text-lg font-semibold ${data.specificData?.ledStatus ? 'text-yellow-600' : 'text-gray-600'}">
                    ${data.specificData?.ledStatus ? `💡 ${t('on')}` : `⭕ ${t('off')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'چرخش' : 'Rotation'}</div>
                <div class="text-lg font-semibold text-purple-600">${data.specificData?.rotation ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'لمس' : 'Touch'}</div>
                <div class="text-lg font-semibold text-green-600">${data.specificData?.touch ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'وضعیت زایمان' : 'Labor Status'}</div>
                <div class="text-lg font-semibold text-red-600">${data.specificData?.labor ?? 'N/A'}</div>
            </div>
        `;
    } else if (moduleName === 'stash') {
        html += `
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('temperature')}</div>
                <div class="text-lg font-semibold text-blue-600">${data.temperature ?? 'N/A'} ${t('celsius')}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('humidity')}</div>
                <div class="text-lg font-semibold text-green-600">${data.humidity ?? 'N/A'} ${t('percent')}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('gasLevel')}</div>
                <div class="text-lg font-semibold text-yellow-600">${data.gasLevel ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('lightLevel')}</div>
                <div class="text-lg font-semibold text-purple-600">${data.lightLevel ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${t('securityAlarm')}</div>
                <div class="text-lg font-semibold ${data.securityAlarm ? 'text-red-600' : 'text-green-600'}">
                    ${data.securityAlarm ? `🚨 ${t('active')}` : `✅ ${t('inactive')}`}
                </div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'درب بزرگ' : 'Great Door'}</div>
                <div class="text-lg font-semibold text-indigo-600">${data.greatDoorStatus ?? 'N/A'}</div>
            </div>
            <div class="sensor-item">
                <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? 'درب کوچک' : 'Small Door'}</div>
                <div class="text-lg font-semibold text-indigo-600">${data.smallDoorStatus ?? 'N/A'}</div>
            </div>
        `;
        
        // Add fan statuses
        for (let i = 1; i <= 5; i++) {
            html += `
                <div class="sensor-item">
                    <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? `فن ${i}` : `Fan ${i}`}</div>
                    <div class="text-lg font-semibold ${data[`fan${i}Status`] ? 'text-green-600' : 'text-gray-600'}">
                        ${data[`fan${i}Status`] ? `🌀 ${t('on')}` : `⭕ ${t('off')}`}
                    </div>
                </div>
            `;
        }
        
        // Add PIR statuses
        for (let i = 1; i <= 6; i++) {
            html += `
                <div class="sensor-item">
                    <div class="text-xs" style="color: var(--text-secondary)">${currentLang === 'fa' ? `PIR ${i}` : `PIR ${i}`}</div>
                    <div class="text-lg font-semibold ${data[`pir${i}Status`] ? 'text-red-600' : 'text-green-600'}">
                        ${data[`pir${i}Status`] ? '🔴' : '⚪'}
                    </div>
                </div>
            `;
        }
    }
    
    html += '</div></div>';
    return html;
}

// Complete control form rendering for all modules - Show controls but disable when offline
function renderControlForm(moduleName, data) {
    const isOffline = !data.online;
    const controlsClass = isOffline ? 'offline-controls' : '';
    
    let html = `<div class="${controlsClass}">
        <h3 class="text-lg font-medium mb-4" style="color: var(--text-primary)">🎛️ ${t('controls')}</h3>`;
    
    if (isOffline) {
        html += `<div class="text-center py-4" style="color: var(--text-secondary)">${t('controlsDisabled')}</div>`;
    }
    
    if (moduleName === 'damdari') {
        html += `
            <div class="control-grid">
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🌀 ${t('fanControl')}</h4>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'fan', 'on', 'STABLE')">${t('turnOn')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'fan', 'off', 'STABLE')">${t('turnOff')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">💡 ${t('lightControl')}</h4>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'light', 'on', 'STABLE')">${t('turnOn')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'light', 'off', 'STABLE')">${t('turnOff')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">💉 ${currentLang === 'fa' ? 'کنترل تزریق' : 'Injection Control'}</h4>
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg control-button w-full" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'injection', 'start', '')">${currentLang === 'fa' ? 'شروع تزریق' : 'Start Injection'}</button>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🚪 ${t('doorControl')}</h4>
                    <select id="damdariDoor" class="w-full border rounded-lg px-3 py-2 mb-3" ${isOffline ? 'disabled' : ''}>
                        <option value="ENTRANCE">${currentLang === 'fa' ? 'ورودی' : 'Entrance'}</option>
                        <option value="EXIT">${currentLang === 'fa' ? 'خروجی' : 'Exit'}</option>
                        <option value="INJECTION_MAIN">${currentLang === 'fa' ? 'اصلی تزریق' : 'Injection Main'}</option>
                        <option value="INJECTION_ENTRANCE">${currentLang === 'fa' ? 'ورودی تزریق' : 'Injection Entrance'}</option>
                        <option value="INJECTION_EXIT">${currentLang === 'fa' ? 'خروجی تزریق' : 'Injection Exit'}</option>
                    </select>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'door', 'open', document.getElementById('damdariDoor').value)">${t('openDoor')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'door', 'close', document.getElementById('damdariDoor').value)">${t('closeDoor')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🚨 ${currentLang === 'fa' ? 'اضطراری' : 'Emergency'}</h4>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button w-full" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'alarm', 'off', '')">${currentLang === 'fa' ? 'خاموش کردن آلارم' : 'Turn Alarm Off'}</button>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🔓 ${currentLang === 'fa' ? 'باز کردن سیستم' : 'System Unlock'}</h4>
                    <input id="damdariUnlockCode" type="text" placeholder="${currentLang === 'fa' ? 'کد باز کردن' : 'Unlock Code'}" class="w-full border rounded-lg px-3 py-2 mb-3" ${isOffline ? 'disabled' : ''}>
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg control-button w-full" ${isOffline ? 'disabled' : ''} onclick="sendControl('damdari', 'system', 'unlock', document.getElementById('damdariUnlockCode').value)">${currentLang === 'fa' ? 'باز کردن سیستم' : 'Unlock System'}</button>
                </div>
            </div>
        `;
    } else if (moduleName === 'golkhoneh') {
        html += `
            <div class="control-grid">
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🌀 ${t('fanControl')}</h4>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'fan', 'on', '')">${t('turnOn')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'fan', 'off', '')">${t('turnOff')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🏠 ${currentLang === 'fa' ? 'کنترل سقف' : 'Roof Control'}</h4>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'roof', 'open', '')">${currentLang === 'fa' ? 'باز کردن سقف' : 'Open Roof'}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'roof', 'close', '')">${currentLang === 'fa' ? 'بستن سقف' : 'Close Roof'}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">💡 ${currentLang === 'fa' ? 'کنترل چراغ سقف' : 'Roof Light Control'}</h4>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'light', 'on', 'ROOFLIGHT')">${t('turnOn')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'light', 'off', 'ROOFLIGHT')">${t('turnOff')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🚪 ${t('doorControl')}</h4>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'door', 'open', 'DOOR')">${t('openDoor')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'door', 'close', 'DOOR')">${t('closeDoor')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">💧 ${currentLang === 'fa' ? 'کنترل پمپ' : 'Pump Control'}</h4>
                    <select id="golkhonehPump" class="w-full border rounded-lg px-3 py-2 mb-3" ${isOffline ? 'disabled' : ''}>
                        ${Array.from({length: 8}, (_, i) => `<option value="LINE${i+1}">${currentLang === 'fa' ? `خط ${i+1}` : `Line ${i+1}`}</option>`).join('')}
                    </select>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'pump', 'on', document.getElementById('golkhonehPump').value)">${t('turnOn')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('golkhoneh', 'pump', 'off', document.getElementById('golkhonehPump').value)">${t('turnOff')}</button>
                    </div>
                </div>
            </div>
        `;
    } else if (moduleName === 'house') {
        html += `
            <div class="control-grid">
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🚪 ${t('doorControl')}</h4>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg control-button text-sm" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'door', 'open', 'DOOR')">${t('openDoor')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg control-button text-sm" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'door', 'close', 'DOOR')">${t('closeDoor')}</button>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg control-button text-sm" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'door', 'lock', 'DOOR')">${currentLang === 'fa' ? 'قفل درب' : 'Lock Door'}</button>
                        <button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg control-button text-sm" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'door', 'unlock', 'DOOR')">${currentLang === 'fa' ? 'باز کردن قفل' : 'Unlock Door'}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🪟 ${currentLang === 'fa' ? 'کنترل پنجره' : 'Window Control'}</h4>
                    <select id="houseWindow" class="w-full border rounded-lg px-3 py-2 mb-3" ${isOffline ? 'disabled' : ''}>
                        <option value="DINING">${currentLang === 'fa' ? 'نهارخوری' : 'Dining'}</option>
                        <option value="ROOM1">${currentLang === 'fa' ? 'اتاق ۱' : 'Room 1'}</option>
                        <option value="ROOM2">${currentLang === 'fa' ? 'اتاق ۲' : 'Room 2'}</option>
                    </select>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'window', 'open', document.getElementById('houseWindow').value)">${currentLang === 'fa' ? 'باز کردن پنجره' : 'Open Window'}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'window', 'close', document.getElementById('houseWindow').value)">${currentLang === 'fa' ? 'بستن پنجره' : 'Close Window'}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">💡 ${t('lightControl')}</h4>
                    <select id="houseLight" class="w-full border rounded-lg px-3 py-2 mb-3" ${isOffline ? 'disabled' : ''}>
                        <option value="DINING">${currentLang === 'fa' ? 'نهارخوری' : 'Dining'}</option>
                        <option value="ROOM1">${currentLang === 'fa' ? 'اتاق ۱' : 'Room 1'}</option>
                        <option value="ROOM2">${currentLang === 'fa' ? 'اتاق ۲' : 'Room 2'}</option>
                        <option value="HALLWAY">${currentLang === 'fa' ? 'راهرو' : 'Hallway'}</option>
                    </select>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'light', 'on', document.getElementById('houseLight').value)">${t('turnOn')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'light', 'off', document.getElementById('houseLight').value)">${t('turnOff')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🚨 ${t('alarmControl')}</h4>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button w-full" ${isOffline ? 'disabled' : ''} onclick="sendControl('house', 'alarm', 'stop', '')">${t('stopAlarm')}</button>
                </div>
            </div>
        `;
    } else if (moduleName === 'moocall') {
        html += `
            <div class="control-grid">
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">💡 ${currentLang === 'fa' ? 'کنترل LED' : 'LED Control'}</h4>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('moocall', 'light', 'on', 'LED')">${t('turnOn')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('moocall', 'light', 'off', 'LED')">${t('turnOff')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">📊 ${currentLang === 'fa' ? 'نظارت' : 'Monitoring'}</h4>
                    <div class="text-center" style="color: var(--text-secondary)">
                        ${currentLang === 'fa' ? 'سنسورهای نظارت فعال' : 'Monitoring sensors active'}
                    </div>
                </div>
            </div>
        `;
    } else if (moduleName === 'stash') {
        html += `
            <div class="control-grid">
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🚪 ${t('doorControl')}</h4>
                    <select id="stashDoor" class="w-full border rounded-lg px-3 py-2 mb-3" ${isOffline ? 'disabled' : ''}>
                        <option value="GREAT_DOOR">${currentLang === 'fa' ? 'درب بزرگ' : 'Great Door'}</option>
                        <option value="SMALL_DOOR">${currentLang === 'fa' ? 'درب کوچک' : 'Small Door'}</option>
                    </select>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('stash', 'door', 'open', document.getElementById('stashDoor').value)">${t('openDoor')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('stash', 'door', 'close', document.getElementById('stashDoor').value)">${t('closeDoor')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🌀 ${t('fanControl')}</h4>
                    <select id="stashFan" class="w-full border rounded-lg px-3 py-2 mb-3" ${isOffline ? 'disabled' : ''}>
                        ${Array.from({length: 5}, (_, i) => `<option value="FAN${i+1}">${currentLang === 'fa' ? `فن ${i+1}` : `Fan ${i+1}`}</option>`).join('')}
                    </select>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('stash', 'fan', 'on', document.getElementById('stashFan').value)">${t('turnOn')}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('stash', 'fan', 'off', document.getElementById('stashFan').value)">${t('turnOff')}</button>
                    </div>
                </div>
                <div class="control-section">
                    <h4 class="font-medium mb-3" style="color: var(--text-primary)">🚨 ${t('alarmControl')}</h4>
                    <div class="flex gap-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('stash', 'alarm', 'on', '')">${currentLang === 'fa' ? 'فعال کردن آلارم' : 'Turn Alarm On'}</button>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg control-button flex-1" ${isOffline ? 'disabled' : ''} onclick="sendControl('stash', 'alarm', 'off', '')">${currentLang === 'fa' ? 'غیرفعال کردن آلارم' : 'Turn Alarm Off'}</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

// Enhanced control function with better feedback
async function sendControl(module, controlType, action, value) {
    const loadingAlert = showAlert(`🔄 ${currentLang === 'fa' ? `در حال ارسال دستور ${action} به ${t(module)}...` : `Sending ${action} command to ${t(module)}...`}`, 'blue', 0);
    
    try {
        const formData = new URLSearchParams();
        formData.append('module', module);
        formData.append('action', action);
        if (value) {
            formData.append(controlType, value);
        }
        
        const response = await fetch(`${API_BASE}/control/${controlType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        const data = await response.json();
        
        // Remove loading alert
        if (loadingAlert) loadingAlert.remove();
        
        const icon = data.status === 'success' ? '✅' : '❌';
        const statusText = currentLang === 'fa' ? 
            (data.status === 'success' ? 'موفق' : 'ناموفق') : 
            data.status;
        
        showAlert(`${icon} ${t(module)} ${controlType}: ${statusText}${data.error ? ` - ${data.error}` : ''}`, 
                 data.status === 'success' ? 'green' : 'red');
        
        // Refresh data after successful control action
        if (data.status === 'success') {
            setTimeout(fetchModules, 1000);
        }
    } catch (error) {
        if (loadingAlert) loadingAlert.remove();
        showAlert(`❌ ${currentLang === 'fa' ? 'خطا در ارسال درخواست کنترل: ' : 'Error sending control request: '}${error.message}`, 'red');
    }
}

// Enhanced alert system
function showAlert(message, color, duration = 5000) {
    const alertsDiv = document.getElementById('alerts');
    const alert = document.createElement('div');
    
    const colorClasses = {
        'red': 'bg-red-100 border-red-400 text-red-700',
        'green': 'bg-green-100 border-green-400 text-green-700',
        'blue': 'bg-blue-100 border-blue-400 text-blue-700',
        'yellow': 'bg-yellow-100 border-yellow-400 text-yellow-700'
    };
    
    alert.className = `${colorClasses[color] || colorClasses.blue} px-4 py-3 rounded-xl border relative mb-2 alert shadow-lg`;
    alert.innerHTML = `
        <span class="block sm:inline">${message}</span>
        <button class="absolute top-0 bottom-0 ${currentLang === 'fa' ? 'left-0' : 'right-0'} px-4 py-3" onclick="this.parentElement.remove()">
            <span class="text-xl">&times;</span>
        </button>
    `;
    
    alertsDiv.appendChild(alert);
    
    if (duration > 0) {
        setTimeout(() => {
            if (alert.parentElement) {
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 500);
            }
        }, duration);
    }
    
    return alert;
}

// Toggle module section
function toggleSection(element) {
    element.classList.toggle('hidden');
}

// Weather settings toggle
function toggleWeatherSettings() {
    const settings = document.getElementById('weatherSettings');
    settings.classList.toggle('hidden');
}

// Toggle all modules
function toggleAllModules() {
    const modules = document.querySelectorAll('.module-content');
    const allHidden = Array.from(modules).every(module => module.classList.contains('hidden'));
    
    modules.forEach(module => {
        if (allHidden) {
            module.classList.remove('hidden');
        } else {
            module.classList.add('hidden');
        }
    });
}

// Weather functions (placeholder - you'll need to include weather.js)
function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value;
    if (apiKey) {
        localStorage.setItem('weatherApiKey', apiKey);
        showAlert(currentLang === 'fa' ? '✅ کلید API ذخیره شد' : '✅ API key saved', 'green', 3000);
    }
}

function getWeather() {
    showAlert(currentLang === 'fa' ? '🌤️ در حال دریافت اطلاعات آب و هوا...' : '🌤️ Getting weather data...', 'blue', 2000);
    // Weather functionality would be implemented here
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme first
    initializeTheme();
    
    // Set initial language
    updateUILanguage();
    
    // Load farm data
    fetchAllData();
    
    // Set up auto-refresh
    setInterval(fetchAllData, 30000); // Refresh every 30 seconds
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            fetchAllData();
        }
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            toggleLanguage();
        }
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
});

// Simple storage utility
window.storage = {
    get: (key, defaultValue) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage not available:', e);
        }
    }
};

// Translation functions for weather system
window.t = t;
window.showAlert = showAlert;

console.log('🚜 پنل کنترل مزرعه هوشمند با موفقیت راه‌اندازی شد');