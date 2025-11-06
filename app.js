const API_BASE = 'https://randomuser.me/api/';
const resultsContainer = document.getElementById('results');
const loadingElement = document.getElementById('loading');
const btnUser = document.getElementById('btnUser');
const btnUsers = document.getElementById('btnUsers');
const btnUserGender = document.getElementById('btnUserGender');

// Variables para almacenar datos
let userData = null;
let usersData = null;
let femaleUsersData = null;

// Consulta 1: Obtener un usuario aleatorio
async function getRandomUser() {
    showLoading();
    try {
        const response = await fetch(API_BASE);
        const data = await response.json();
        userData = data.results[0];
        displayUsers([userData]);
    } catch (error) {
        showError('Error al cargar el usuario');
    }
}

// Consulta 2: Obtener 5 usuarios aleatorios
async function getMultipleUsers() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE}?results=5`);
        const data = await response.json();
        usersData = data.results;
        displayUsers(usersData);
    } catch (error) {
        showError('Error al cargar los usuarios');
    }
}

// Consulta 3: Obtener usuarios femeninos
async function getFemaleUsers() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE}?results=5&gender=female`);
        const data = await response.json();
        femaleUsersData = data.results;
        displayUsers(femaleUsersData);
    } catch (error) {
        showError('Error al cargar usuarios femeninos');
    }
}

function displayUsers(users) {
    hideLoading();
    resultsContainer.innerHTML = '';
    
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const fullName = `${user.name.first} ${user.name.last}`;
        const age = user.dob.age;
        const gender = user.gender;
        const picture = user.picture.large;
        
        card.innerHTML = `
            <img src="${picture}" alt="${fullName}">
            <h2>${fullName}</h2>
            <b><p><span>Género:</span> ${gender}</p>
            <b><p><span>Edad:</span> ${age} años</p>
        `;
        
        resultsContainer.appendChild(card);
    });
}

function showLoading() {
    loadingElement.style.display = 'block';
    resultsContainer.innerHTML = '';
}

function hideLoading() {
    loadingElement.style.display = 'none';
}

function showError(message) {
    hideLoading();
    resultsContainer.innerHTML = `<p style="color: #fff; text-align: center;">${message}</p>`;
}

btnUser.addEventListener('click', getRandomUser);
btnUsers.addEventListener('click', getMultipleUsers);
btnUserGender.addEventListener('click', getFemaleUsers);