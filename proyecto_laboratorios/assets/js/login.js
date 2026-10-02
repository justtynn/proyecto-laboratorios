const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const userInfo = document.getElementById('userInfo');
const userEmail = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

// Verificar si ya hay sesión activa
auth.onAuthStateChanged(user => {
    if (user) {
        showUserInfo(user);
    } else {
        showLoginForm();
    }
});

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showUserInfo(userCredential.user);
        loginMessage.textContent = '✅ Sesión iniciada correctamente';
        loginMessage.style.color = 'green';
    } catch (error) {
        loginMessage.textContent = '❌ ' + error.message;
        loginMessage.style.color = 'red';
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    await auth.signOut();
    showLoginForm();
});

function showUserInfo(user) {
    userEmail.textContent = user.email;
    userInfo.style.display = 'block';
    loginForm.style.display = 'none';
}

function showLoginForm() {
    loginForm.style.display = 'block';
    userInfo.style.display = 'none';
}