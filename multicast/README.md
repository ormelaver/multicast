This is a backend multicast service. Receives an event, stores it in a database and broadcasts it to a list of subscribers. No GUI.
Uses the following AWS services: Lambda, Dynamodb and SNS.
THIS WILL NOT WORK WITHOUT THE CORRECT IAM ROLES.
Supports the following REST commands:
1. POST - receives the event and sends it to the appropriate subscribers. 
          Communication is done via HTTP, HTTPS, Email, Email-JSON, Amazon SQS, AWS lambda, Application, SMS.
2. GET - fetches the event according to a given id.
3. DELETE - delets an event according to a given id.
4. PUT - finds an event according to a given id and updates the data.
