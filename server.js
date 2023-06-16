const express = require('express');
const app = express();
const port = 1212;
const path = require('path');

app.use(express.static('dist/'));

app.get('*', function(req,res) {
	console.log('get ' + req);
	res.sendFile(path.resolve('dist/europium-frontend/index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});
