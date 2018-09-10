let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    let report = JSON.stringify(event.body);

    ddb.put({
        TableName: 'TestSigmaTable',
        Item: { 'id': report.id, 'name': report.name }
    }).promise().then(function (data) {
        let response = {
            "isBase64Encoded": true,
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": "Report: " + report + " successfully added."
        };
        callback(null, response);
    }).catch(function (err) {
        let response = {
            "isBase64Encoded": false,
            "statusCode": err.statusCode,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "Code": err.code,
                "Message": err.message
            })
        };
        callback(null, response);
    });
}