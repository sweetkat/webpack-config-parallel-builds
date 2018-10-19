const express = require('express');
const app = express();
const rootPath = './dist';
const fs = require('fs');

app.use(express.static(rootPath));

app.get(/.*$/, function (req, res) {
    res.sendFile('index.html', { root: rootPath });
});

app.listen(8000, function () {
    fs.access(rootPath, fs.constants.F_OK | fs.constants.R_OK, (error) => {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log('App listening on port 8000');
        }
    });
});
