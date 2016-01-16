import AWS from 'aws-sdk';

const config = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  actions: ['SendMessage', 'ReceiveMessage', 'DeleteMessage']
};

AWS.config.update(config);

module.exports = AWS;
