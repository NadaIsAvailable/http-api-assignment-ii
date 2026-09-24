const respond = (request, response, statusCode, contentType, content) => {
    response.writeHead(statusCode, { 'Content-Type': contentType });

    if(request.method !== 'HEAD') {
        response.write(content);
    }
    
    response.end();
};

module.exports = {
    respond,
};