const express = require('express');
const app = express();
const port = 1212;
const path = require('path');

app.use(express.static('_work/europium-frontend/europium-frontend/dist/'));

app.get('*', function(req,res) {
	res.sendFile(path.resolve('_work/europium-frontend/europium-frontend/dist/europium-frontend/index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});
