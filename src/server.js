const http = require('http');
const jsonHandler = require('./jsonHandler.js');
const htmlHandler = require('./htmlHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
    const body = [];

    request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const type = request.headers['content-type'];

        if (type === 'application/json') {
            request.body = JSON.parse(bodyString);
        } else {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ "message": "Invalid content type" }));
            response.end();
        }

        handler(request, response);
    });
};

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStyle,
    '/getUsers': jsonHandler.getUsers,
    '/addUser': jsonHandler.addUser,
    notFound: jsonHandler.getNotFound,
};

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

    if (request.method === 'POST')
        parseBody(request, response, urlStruct[parsedURL.pathname]);
    else if (urlStruct[parsedURL.pathname])
        urlStruct[parsedURL.pathname](request, response);
    else
        urlStruct.notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});