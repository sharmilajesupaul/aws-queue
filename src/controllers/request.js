import Request from '../models/request'
import AWS from '../../config/aws'
const sqs = new AWS.SQS();

let sendToSqs = (res, doc, url) => {
  var params = {
    MessageBody: JSON.stringify({
      id: doc._id,
      url: url
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
}

export default (app) => {

  app.get('/', (req, res) => {
    res.send('<a href=\' https://github.com/sharmilajesupaul/aws-queue \'>View Readme</a>');
  });

  // Retrieves request by id
  app.get('/requests/:id', (req, res) => {
    Request.findById(req.params.id, (err, doc) => {
      if (doc) {
        res.send(doc);
      } else {
        res.status(404).send(err.message);
      }
    });
  });

  // Both routes below post job data to database and adds the job to sqs queue
  // The get route is reads params in the address
  app.get('/requests', (req, res) => {
    if (req.query.url) {
      Request(req.query).save((err, doc) => {
        if (err) return res.status(500).send(err.message);
        sendToSqs(res, doc, req.query.url);
      });
    }
  });
  // The post route reads body of the request 
  app.post('/requests', (req, res) => {
    if (req.body.url) {
      Request(req.body).save((err, doc) => {
        if (err) return res.status(500).send(err.message);
        sendToSqs(res, doc, req.body.url);
      });
    }
  });
};
