# Mail Notification Service via SENDGRID mail server with failover 2nd mail server used as MAILGUN

[![Build Status](https://travis-ci.org/animuk/mail-notification.svg?branch=master)](https://travis-ci.org/animuk/mail-notification)


## Installation

* `Export the env variables`

    * `echo "export SENDGRID_API_KEY='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'" >> mailsend.env`
    * `echo "export SENDGRID_URL='https://api.sendgrid.com/v3/mail/send'" >> mailsend.env`
    * `echo "export MAILGUN_API_KEY='1a3c076b11eb8cdc68143ccf4af33c29-af6c0cec-ed3f85ba'" >> mailsend.env`
    * `echo "export MAILGUN_URL='https://api.mailgun.net/v3/sandbox2741367f90b2469d80c91d72be15861b.mailgun.org/messages'" >> mailsend.env`

    * `echo "mailsend.env" >> .gitignore`
    * `source ./mailsend.env`
* `git clone git@github.com:animuk/mail-notification.git`
* `cd mail-notification`
* `npm install`
* `npm start`
* optional: include *.env* in your *.gitignore*

### GET Routes

* visit http://localhost:3000
  * /send-mail

### Beyond GET Routes

#### CURL

* Create a message with:
  * `curl -X POST -H "Content-Type:application/json" http://localhost:3000/send-mail -d '{ "name": "Anindya M", "from": "sample1@gmail.com", "to": "sample2@gmail.com", "subject": "Test Mail", "content": "Hurray !! Welcome Siteminder"}'`

#### Postman

* Install [Postman](https://www.getpostman.com/apps) to interact with REST API
* Create a message with:
  * URL: http://localhost:3000/send-mail
  * Method: POST
  * Body: raw + JSON (application/json)
  * Body Content: `{ "name": "Anindya M", "from": "sample1@gmail.com", "to": "sample2@gmail.com", "subject": "Test Mail", "content": "Hurray !! Welcome Siteminder"}`