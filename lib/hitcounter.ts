import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda, aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface HitCounterProps {
    /** the function for which we want to count url hits **/
    downstream: lambda.IFunction;
}

export class HitCounter extends Construct {

    public readonly handler: lambda.Function; 
    public readonly table: dynamodb.Table   

    constructor(scope: Construct, id: string, props: HitCounterProps) {
        super(scope, id);

        const table = new dynamodb.Table(this, "Hits", {
            tableName: "Hits",
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING },
        })

        this.table = table;

        this.handler = new lambda.Function(this, "HitCounterHandler", {
            runtime: lambda.Runtime.NODEJS_16_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: "hitcounter.handler",
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        })
        //give the handler ability to write to the DB
        table.grantReadWriteData(this.handler)
        //give our hit counter permissions to invoke the downstream lambda function.
        props.downstream.grantInvoke(this.handler)

    }
}