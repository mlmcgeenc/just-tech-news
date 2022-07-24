async function deleteFormHandler(event) {
	event.preventDefault();
	id = window.location.toString().split('/')[5].split('?')[0];
	const response = await fetch(`/api/posts/${id}`, {
		method: 'delete',
		body: JSON.stringify({
			id,
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
