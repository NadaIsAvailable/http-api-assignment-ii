const fs = require('fs');
const utils = require('./utils.js');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
    utils.respond(request, response, 200, 'text/html', index);
};

const getStyle = (request, response) => {
    utils.respond(request, response, 200, 'text/css', style);
};

module.exports = {
    getIndex,
    getStyle,
};