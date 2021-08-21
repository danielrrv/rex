const AWS = require("aws-sdk");
/*Implementation to DynamoDB connections*/
AWS.config.update({
	region: "us-east-1",
	accessKeyId:process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
  })
export const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
