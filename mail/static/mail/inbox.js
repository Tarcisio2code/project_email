document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Submit handler
  document.querySelector("#compose-form").addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-full-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function view_email(id){
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
      // Show email body
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#email-full-view').style.display = 'block';

      document.querySelector('#email-full-view').innerHTML = `
        <ul class="list-group">
          <li class="list-group-item border-0"><strong>From: </strong>${email.sender}</li>
          <li class="list-group-item border-0"><strong>To: </strong>${email.email}</li>
          <li class="list-group-item border-0"><strong>Subject: </strong>${email.subject}</li>
          <li class="list-group-item border-0"><strong>Timestamp: </strong>${email.timestamp}</li>
          <button class="btn btn-sm btn-outline-primary" id="replay">Replay</button>
          <li class="list-group-item border-0"><hr></li>
          <textarea class="list-group-item border-0">${email.body}</textarea>
        </ul>
      `;
      // Change mail status
      if(!email.read){
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              read: true
          })
        })
      }
  });
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-full-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'block';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Create a div for each email in the mailbox
      emails.forEach(currentMail => {
        const newEmail = document.createElement('div');
        newEmail.className = "list-group-item";
        newEmail.innerHTML = `
          <h5>Sender: ${currentMail.sender}</h6>
          <h6>Subject: ${currentMail.subject}</h5>
          <p class = "text-muted">${currentMail.timestamp}</p>
        `;
        // Change current email background-color
        newEmail.className = currentMail.read ? 'read': 'unread';
        // Show email details
        newEmail.addEventListener('click', function() {
            view_email(currentMail.id);
        });
        document.querySelector('#emails-view').append(newEmail);
      });

      // ... do something else with email ...
  });
}

function send_email(event){
  // Get form fields values
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // Send values to backend
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      // Redirect to sent mailbox
      load_mailbox('sent');
  });
}