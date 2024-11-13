import type { MockConfiguration } from '@moneko/core';

const conf: MockConfiguration = {
  'POST /api/upload_file': (req, res) => {
    res.status(200).send({
      status: 200,
      success: true,
      result: `data:image/jpeg;base64,${Buffer.from(req.files[0].buffer).toString('base64')}`,
    });
  },
  'POST /api/login_by_username': (req, res) => {
    res.status(200).send({
      status: 200,
      success: true,
      result: req.body,
    });
  },
  'POST /api/login_by_email': (req, res) => {
    res.status(200).send({
      status: 200,
      success: true,
      result: req.body,
    });
  },
};

export default conf;