const express = require('express');
const { spawn } = require('child_process');

const app = express();
const port = 3001;

app.use(express.json());

app.post('/webhook', (req, res) => {
	console.log(req);
	res.status(200).send('OK');
});

app.listen(port, () => {
	  console.log(`Webhook server listening at http://localhost:${port}`);
});

