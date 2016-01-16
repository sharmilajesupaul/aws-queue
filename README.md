# Queue
A simple job queue built on AWS SQS and NodeJS using ES6/2015.

#### Dependencies: 
  1. NodeJs/ExpressJS
  2. MongoDB 
  3. AWS SQS

--------------------

#### Installation: 

###### Install dependencies 
```shell
  $ npm i
```

###### Add .env file to the root directory with the following variables:
```
QUEUE_URL=https://sqs.us-west-2.amazonaws.com/path/to/queue
ACCESS_KEY=[AWS AccessKey]
SECRET_KEY=[AWS SecretKey]
REGION=[AWS Region] e.g. 'us-west-2'
```

--------------------

#### Startup 

###### Run mongodb locally
```shell
  $ mongod
```

###### In a separate tab, run the server
```shell
  $ npm start
```

-----------------------

#### Usage 

###### Adding a Job to The Queue:
```shell
  $ curl --data "url=https://www.example.com" http://localhost:8080/requests 
  {"__v":0,"url":"http://www.myspace.com","_id":"569ad80225b59d7b5c81b003","createdAt":"2016-01-16T23:53:22.563Z","completed":false}
```



######  Retrieving/Checking Status of a Job
```shell
$ curl http://localhost:8080/_id
# If Job completed - 
{"__v":0,"url":"http://www.example.com","_id":"1234","createdAt":"2016-01-16T23:53:22.563Z","completed":true, "htmlBody":"<html>...</html>"}

# Otherwise: 
#{"__v":0,"url":"http://www.example.com","_id":"12345","createdAt":"2016-01-16T23:53:22.563Z","completed":false}
```

