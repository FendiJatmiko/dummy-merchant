const request = require("request");
const config  = require('../../config');
const auth    = require('../../auth');

function doRequest(req, callback) {
    let reqString = JSON.stringify(req);

    request({
        headers: {
            'Authorization': auth.generate(reqString),
        },
        uri: config.server_url,
        method: 'POST',
        body: reqString,
    }, function(err, response, body) {
        if (err) {
            callback(err, null);
            return;
        }

        if (response.statusCode != 200) {
            callback(body, null);
            return;
        }

        let result = JSON.parse(body);
        callback(null, result.data);
    });
}

module.exports = {
    doRequest: doRequest,
};
