#!/usr/bin/env node
/* 
This code loads and instantiates the CdkWorkshopStack class from the lib/cdk-workshop-stack.ts file. We won’t need to look at this file anymore.
*/
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshopStack } from '../lib/cdk-stack';

const app = new cdk.App();
new CdkWorkshopStack(app, 'CdkStack');
