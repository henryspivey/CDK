import * as cdk from 'aws-cdk-lib';

import { aws_lambda as lambda, aws_apigateway as apigw } from 'aws-cdk-lib';
import { HitCounter } from './hitcounter';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, "lambdaId", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: "hello.handler",
    })

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    })

    new apigw.LambdaRestApi(this, "helloRoute", {
      handler: helloWithCounter.handler
    })


  }
}