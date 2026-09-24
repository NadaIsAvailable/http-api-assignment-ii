const utils = require('./utils.js');

const users = {};

const getUsers = (request, response) => {
    const responseJSON = { users };
    utils.respond(request, response, 200, 'application/json', JSON.stringify(responseJSON));
};

const addUser = (request, response) => {
    const responseJSON = {
        message: 'Created Successfully'
    };

    const { name, age } = request.body;

    if (!name || !age) {
        responseJSON.id = 'addUserMissingParams';
        responseJSON.message = 'Name and age are both required.'

        return utils.respond(request, response, 400, 'application/json', JSON.stringify(responseJSON));
    }

    let statusCode = 204;

    if (!users[name]) {
        statusCode = 201;
        users[name] = {
            "name": name,
            "age": age,
        };
    } else {
        users[name].age = age;
    }

    if (statusCode === 201) {
        return utils.respond(request, response, statusCode, 'application/json', JSON.stringify(responseJSON));
    }

    utils.respond(request, response, statusCode, 'application/json', JSON.stringify({}));
};

const getNotFound = (request, response) => {
    const responseJSON = {
        id: 'notFound',
        message: 'The page you are looking for was not found.',
    };

    utils.respond(request, response, 404, 'application/json', JSON.stringify(responseJSON));
};

module.exports = {
    getUsers,
    addUser,
    getNotFound,
};