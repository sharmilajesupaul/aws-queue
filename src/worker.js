import request from 'request';
import AWS from '../config/aws';
import Request from './models/request'

var sqs = new AWS.SQS();
var params = {
  QueueUrl: process.env.QUEUE_URL
};

setInterval(() => {
  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      if (data.Messages) {
        let messageBody = '';

        try {
          messageBody = JSON.parse(data.Messages[0].Body);
        } catch (err) {
          console.error(err);
          return false;
        }

        Request.findById(messageBody.id, (err, doc) => {
          request(messageBody.url, (err, res, body) => {
            doc.htmlBody = body;
            doc.completed = true;

            const sqsDeleteParams = {
              QueueUrl: process.env.QUEUE_URL,
              ReceiptHandle: data.Messages[0].ReceiptHandle
            }

            sqs.deleteMessage(sqsDeleteParams, function(err, data) {
              if (err) console.error(err);
              else doc.save();
            });
          });
        });
      }
    }
  });

}, 1000);
