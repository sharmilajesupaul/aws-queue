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
```
*Once you add the job to your queue an `_id` variable will be returned.*

######  Retrieving/Checking Status of a Job
```shell
$ curl http://localhost:8080/_id
```

