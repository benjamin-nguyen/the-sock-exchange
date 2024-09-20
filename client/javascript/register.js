
    const form = document.getElementById('registerForm')

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        const data = {
            name: name,
            email: email
        };

        console.log(`Name: ${name}`)
        console.log(`Name: ${email}`)

        fetch('http://localhost:9000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            })
    })
