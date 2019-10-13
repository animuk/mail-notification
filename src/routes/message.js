import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  let Request = require("request");
  let bodyStr = {'personalizations':[{}],'content':[{}],'from':{}}
  bodyStr.personalizations[0].to = [{}];
  bodyStr.personalizations[0].to[0].email = req.body.to;
  bodyStr.personalizations[0].to[0].name = req.body.name;
  bodyStr.personalizations[0].subject = req.body.subject;
  bodyStr.content[0].type = 'text/plain';
  bodyStr.content[0].value = req.body.content;
  bodyStr.from.email = req.body.from;

  console.log(bodyStr);

  Request.post({
    headers: {'Content-type': 'application/json','authorization': 'Bearer '+ process.env.SENDGRID_API_KEY},
    url: process.env.SENDGRID_URL,
    body: JSON.stringify(bodyStr)
  }, (error, response, body) => {
      if(error) {
          // if the 1st service is responding as error, that means the
		      // service is down or not accepting the client request.
          // So, the handle will go to the 2nd service as a failover.
          Request.post({
            headers: {'Content-type': 'application/json'},
            url: process.env.MAILGUN_URL,
            auth: {
              user: 'api',
              pass: process.env.MAILGUN_API_KEY,
              sendImmediately: false
            },
            form: {from:req.body.from,to:req.body.to,subject:req.body.subject,text:req.body.content}
          }, (error, response, body) => {
              if(error) {
                  return console.dir(error);
              }
              console.log('HTTP Status received--->'+response.statusCode)
        
              return res.sendStatus(response.statusCode);
          });

          return console.dir(error);
      }
      console.log('HTTP Status received--->'+response.statusCode)

      return res.sendStatus(response.statusCode);
  });

  
});

export default router;

