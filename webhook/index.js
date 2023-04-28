const express = require('express');
const { spawn } = require('child_process');

const app = express();
const port = 3001;

app.use(express.json());

app.post('/webhook', (req, res) => {
	  const repository = req.body.repository.full_name;

	  console.log(`Received webhook for ${repository}`);

	  const pull = spawn('git', ['pull']);

	  pull.stdout.on('data', (data) => {
		      console.log(`stdout: ${data}`);
		    });

	  pull.stderr.on('data', (data) => {
		      console.error(`stderr: ${data}`);
		    });

	  pull.on('close', (code) => {
		      console.log(`git pull exited with code ${code}`);

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
		    });
});

app.listen(port, () => {
	  console.log(`Webhook server listening at http://localhost:${port}`);
});

