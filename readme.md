# Project: Mail

**Objective**
>_Design a front-end for an email client that makes API calls to send and receive emails._   

<br>
  
**Requirements**
>- [x] _**Send Mail**: When a user submits the email composition form, add JavaScript code to actually send the email._
>   - [x] _You’ll likely want to make a POST request to /emails, passing in values for recipients, subject, and body._
>   - [x] _Once the email has been sent, load the user’s sent mailbox._
>
>- [ ] _**Mailbox**: When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox._
>   - [x] _You’ll likely want to make a GET request to /emails/<mailbox> to request the emails for a particular mailbox._
>   - [X] _When a mailbox is visited, the application should first query the API for the latest emails in that mailbox._
>   - [x] _When a mailbox is visited, the name of the mailbox should appear at the top of the page (this part is done for you)._
>   - [x] _Each email should then be rendered in its own box (e.g. as a `div` with a border) that displays who the email is from, what the subject line is, and the timestamp of the email._
>
>   - [x] _If the email is unread, it should appear with a white background. If the email has been read, it should appear with a gray background._
>- [x] _**Archive and Unarchive**: Allow users to archive and unarchive emails that they have received._
>   - [x] _When viewing an Inbox email, the user should be presented with a button that lets them archive the email.When viewing an Archive email, the user should be presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox._
>   - [x] _Recall that you can send a PUT request to /emails/<email_id> to mark an email as archived or unarchived._
>   - [x] _Once an email has been archived or unarchived, load the user’s inbox._
>
>- [ ] _**Reply**: Allow users to reply to an email._
>   - [ ] _When viewing an email, the user should be presented with a “Reply” button that lets them reply to the email._
>   - [ ] _When the user clicks the “Reply” button, they should be taken to the email composition form._
>   - [ ] _Pre-fill the composition form with the recipient field set to whoever sent the original email._
>   - [ ] _Pre-fill the subject line. If the original email had a subject line of foo, the new subject line should be Re: foo. (If the subject line already begins with Re: , no need to add it again.)_
>   - [ ] _Pre-fill the body of the email with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email._

<br>
   
**Documentation**   
  

<br>

**Progress**   
![](https://geps.dev/progress/50)   
  
<br>
<br>

_According to HarvardX - Web Programming with Python and JavaScript Course_

<br>

![screenshot](img/preview.png?raw=true "screenshot")

<br>

<a href="https://www.youtube.com/channel/UCBnFL0ElYDlA_EYy6FhDmDQ" target="_blank"><img border="0" width="3%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png" alt="Watch it on youtube"/> _Watch it on youtube_</a>
