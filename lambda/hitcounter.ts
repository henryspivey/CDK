const { DynamoDB, Lambda } = require('aws-sdk');
import { EventWithPath } from "./helpers";

exports.handler = async function (event: EventWithPath) {
    console.log("request", JSON.stringify(event, undefined, 2));

    // create AWS SDK clients
    const dynamo = new DynamoDB();
    const lambda = new Lambda()

    await dynamo.updateItem({
        TableName: process.env.HITS_TABLE_NAME,
        Key: { path: { S: event.target.path } },
        UpdateExpression: 'Add hits :incr',
        ExpressionAttributeValues: { ':incr': { N: '1' } }
    }).promise();

    const resp = await lambda.invoke({
        FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
        Payload: JSON.stringify(event)
    }).promise();

    console.log('downstream response:', JSON.stringify(resp, undefined, 2));
    return JSON.parse(resp.Payload)

}