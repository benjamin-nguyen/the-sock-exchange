document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    console.log('Username: ' + username);
    console.log('Password: ' + password);

    if (username === 'wasadmin@test.com' && password === 'red') {
        messageElement.textContent = 'Logged in';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'Not authorized';
        messageElement.style.color = 'red';
    }
});
