const version = require('../config').version

module.exports = {
 '^/apis/v[0-9]+/accounts.*' : ['admin'], //  /apis/v1/accounts/*
}