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
      // Get the mailbox name
      currentMailboxName = document.querySelector('#mailbox-title').textContent;

      // Show all mail details
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#email-full-view').style.display = 'block';

      document.querySelector('#email-full-view').innerHTML = `
        <div class="card shadow m-3 p-3" style="height: 570px">
            <div class="card-body" id="email-container">
                <ul class="list-group">
                  <li class="list-group-item border-0"><strong>From: </strong>${email.sender}</li>
                  <li class="list-group-item border-0"><strong>To: </strong>${email.recipients}</li>
                  <li class="list-group-item border-0"><strong>Subject: </strong>${email.subject}</li>
                  <li class="list-group-item border-0"><strong>Timestamp: </strong>${email.timestamp}</li>
                  <li class="list-group-item border-0"><hr></li>
                  <textarea class="list-group-item border-0">${email.body}</textarea>
                </ul>
            </div>
        </div>
      `;

      // Change mail status
      if(!email.read){

        newCount = document.querySelector('#unread-emails').innerHTML-1;
        document.querySelector('#unread-emails').innerHTML = newCount;

        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              read: true
          })
        })
      }

      // Reply email
      const btn_replay = document.createElement('button');
      btn_replay.innerHTML = "Replay";
      btn_replay.className = "btn btn-sm btn-primary mt-2 mx-2";
      btn_replay.addEventListener('click', function() {
        
        compose_email()
        
        // Fill in composition fields
        document.querySelector('#compose-sender').value = email.recipients;
        document.querySelector('#compose-recipients').value = email.sender;
        let mailSubject = email.subject
        document.querySelector('#compose-subject').value = mailSubject.startsWith("Re:") ? mailSubject: `Re: ${mailSubject}`;
        document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: \r\n${email.body}`;
      })
      document.querySelector('#email-container').append(btn_replay);

      // Email archive/unarchive button
      if (currentMailboxName != 'Sent') {
        const btn_archive = document.createElement('button');
        btn_archive.innerHTML = email.archived ? 'Unarchive': "Archive";
        btn_archive.className = email.archived ? "btn btn-sm btn-warning mt-2": "btn btn-sm btn-warning mt-2";
        btn_archive.addEventListener('click', function() {
          fetch(`/emails/${email.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archived: !email.archived
            })
          })
          .then(() => {load_mailbox('inbox')})
        });
        document.querySelector('#email-container').append(btn_archive);
      }

  });
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-full-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'block';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `
    <p class="h3 m-3" id="mailbox-title">${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</p>
    <hr class="mt-0">
    <div class="card overflow-auto shadow p-3" style="height: 500px" id="email-list"></div>
  `;

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Create a div for each email in the mailbox
      emails.forEach(currentMail => {
        const newEmail = document.createElement('div');
        newEmail.setAttribute("role", "button");

        // Set current email background-color and border style
        newEmail.className = currentMail.read ? 'read border-bottom p-2': 'unread border-bottom p-2';

        let readStatusIcon = currentMail.read ? "fa-envelope-open": "fa-envelope";
        // Show basic email data
        newEmail.innerHTML = `
          <spam class = "d-inline-block text-truncate fw-bolder pe-2">${currentMail.sender}</spam>
          <spam class = "d-inline-block text-truncate w-50">${currentMail.subject}</spam>
          <spam class = "d-inline-block text-muted float-end">${currentMail.timestamp}<i class="d-inline-block fa ${readStatusIcon} mx-2"></i></spam>
          
        `;
        
        // Show email details
        newEmail.addEventListener('click', function() {
            view_email(currentMail.id);
        });
        document.querySelector('#email-list').append(newEmail);
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