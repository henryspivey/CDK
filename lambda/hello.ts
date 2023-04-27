import { EventWithPath } from "./helpers";

exports.handler = async function (event: EventWithPath) {
    console.log("request:", JSON.stringify(event, undefined, 2));
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/plain'
        },
        body: `Hello, CDK! You've hit ${event.target?.path}`
    }

}