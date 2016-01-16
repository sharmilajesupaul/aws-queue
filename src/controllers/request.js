import Request from '../models/request'
import AWS from '../../config/aws'

export default function(app) {
  app.get('/', function(req, res) {
    res.send('Hello World!');
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

  app.post('/requests', (req, res) => {
    Request(req.body).save((err, doc) => {
    	if(err) return res.status(500).send(err.message);

      var sqs = new AWS.SQS();
      var params = {
        MessageBody: req.body.url,
        DelaySeconds: 0,
        QueueUrl: process.env.QUEUE_URL
      };

      sqs.sendMessage(params, function(err, data) {
        if (err) {
        	return res.status(500).send(err.message);
        } else {
					return res.send(doc);
				}
      });
    });
  });
}
