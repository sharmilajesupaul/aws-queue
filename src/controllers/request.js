import Request from '../models/request'
import AWS from '../../config/aws'

export default (app) => {

  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  app.get('/requests/:id', (req, res) => {
    Request.findById(req.params.id, (err, doc) => {
      if (doc) {
        res.send(doc);
      } else {
        res.status(404).send(err.message);
      }
    });
  });

  // In params
  app.get('/requests', (req, res) => {
    if (req.query.url) {
      Request(req.query).save((err, doc) => {
        if (err) return res.status(500).send(err.message);

        var sqs = new AWS.SQS();
        var params = {
          MessageBody: JSON.stringify({
            id: doc._id,
            url: req.query.url
          }),
          DelaySeconds: 0,
          QueueUrl: process.env.QUEUE_URL
        };
        sqs.sendMessage(params, (err, data) => {
          if (err) {
            return res.status(500).send(err.message);
          } else {
            return res.send(doc);
          }
        });
      });
    }
  });

  // Curl with data 
  app.post('/requests', (req, res) => {
    if (req.body.url) {

      Request(req.body).save((err, doc) => {
        if (err) return res.status(500).send(err.message);

        var sqs = new AWS.SQS();
        var params = {
          MessageBody: JSON.stringify({
            id: doc._id,
            url: req.body.url
          }),
          DelaySeconds: 0,
          QueueUrl: process.env.QUEUE_URL
        };

        sqs.sendMessage(params, (err, data) => {
          if (err) {
            return res.status(500).send(err.message);
          } else {
            return res.send(doc);
          }
        });
      });
    }
  });
};
