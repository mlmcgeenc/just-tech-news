async function signupFormHandler(e) {
	e.preventDefault();
	console.log('signup form submitted');

	const username = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (username && email && password) {
		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify({
				username,
				email,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		// check the response status
		if (response.ok) {
			console.log('success, user created');
		} else {
			alert(response.statusText);
		}
	}
}

async function loginFormHandler(e) {
	e.preventDefault();
	console.log('login form submitted');

	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
    console.log('email and password present')
		const response = await fetch('/api/users/login', {
			method: 'post',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler)
