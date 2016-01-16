import httpRequest from 'request';
import AWS from '../config/aws';
import Request from './models/request'
const sqs = new AWS.SQS();
const params = {
  QueueUrl: process.env.QUEUE_URL
};

// This worker currently retrieves data from SQS every 1.0 seconds
setInterval(() => {
  // Retrieves a completed job from SQS and deletes it from the queue
  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      // If the message exists
      if (data.Messages) {
        let messageBody = '';
        const sqsDeleteParams = {
          QueueUrl: process.env.QUEUE_URL,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        }
        // Parse message body and store it in a variable
        try {
          messageBody = JSON.parse(data.Messages[0].Body);
        } catch (err) {
          console.error(err);
          return false;
        }
        // If message url and id are found
        if (messageBody.id && messageBody.url) {
          // Find the collection in the database by id
          Request.findById(messageBody.id, (err, doc) => {
            // Make a httpRequest to the url and retrieve the body html
            httpRequest(messageBody.url, (err, res, body) => {
              doc.htmlBody = body;
              doc.completed = true;
              // Deletes the message from queue and saves updated data
              sqs.deleteMessage(sqsDeleteParams, (err, data) => {
                if (err) console.error(err);
                else doc.save();
              });
            });
          });
        }
      }
    }
  });

}, 1000);
