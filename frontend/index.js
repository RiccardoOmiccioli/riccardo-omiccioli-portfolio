const express = require('express');

const HOST = '0.0.0.0';
const PORT = 3000;

const app = express();
app.get('/', (req, res) => {
	res.send('Hello world, this is riccardo.omiccioli.it fwhoiwfhofjoi3');
});

app.listen(PORT, HOST, () => {
	  console.log(`Server running at http://${HOST}:${PORT}/`);
});
