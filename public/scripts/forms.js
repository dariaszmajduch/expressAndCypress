function expand_textarea(h) {
  h.style.height = (h.scrollHeight) + 2 + "px";
}

document.getElementById('addMessageForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const body = JSON.stringify({
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      subject: form.elements.subject.value,
      message: form.elements.message.value
  });
  const headers = { 'Content-Type': 'application/json' };
  fetch('/api/add-message', { method: 'post', body, headers })
      .then(resp => {
          if(resp.status < 200 || resp.status >= 300)
              throw new Error('Request failure');
          return resp.json()
      })
      .then(json => {
          console.log('Message added');
      })
      .catch(err => {
          console.log('Error occurs');
      });
});
