const http = require('http');
const jsonHandler = require('./jsonHandler.js');
const htmlHandler = require('./htmlHandler.js');
const { url } = require('inspector');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    notFound: jsonHandler.getNotFound,
};

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

    if (urlStruct[parsedURL.pathname])
        urlStruct[parsedURL.pathname](request, response);
    else 
        urlStruct.notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});