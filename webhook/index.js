const express = require('express');
const crypto = require('crypto');
const { spawn } = require('child_process');

const secret = 'test';

const sigHeaderName = 'x-hub-signature-256'
const sigHashAlg = 'sha256'
const sigPrefix = 'sha256='

const app = express();
const port = 3001;

app.use(express.json());

app.post('/webhook', (req, res) => {
	const digest = sigPrefix + crypto.createHmac(sigHashAlg, secret).update(JSON.stringify(req.body)).digest('hex');
	console.log('dig: ' + digest);
	const signature = req.headers[sigHeaderName];
	console.log('sig: ' + signature);
	if (!crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) {
		console.log('----- SIGNATURE MATCH FAILURE -----');
		res.status(403).end
	} else {
		console.log('----- SIGNATURE MATCH OK -----');
		
		const restart = spawn('docker-compose', ['restart']);
		
		restart.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		restart.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
		});

		restart.on('close', (code) => {
			console.log(`docker-compose restart exited with code ${code}`);
		        res.status(200).send('OK');
		});
	}
});

app.listen(port, () => {
	console.log(`Webhook server listening at http://localhost:${port}`);
});

