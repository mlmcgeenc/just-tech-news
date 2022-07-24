async function editFormHandler(event) {
	event.preventDefault();
  const title = document.querySelector('.title').value.trim()
  id = window.location.toString().split('/')[5].split('?')[0];

  await fetch(`/api/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			title,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

  if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert(response.statusText);
	}

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
