import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  
} from "@aws-sdk/lib-dynamodb";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId:process.env.NEXT_PUBLIC_ACCESS_KEY as string,
    secretAccessKey:process.env.NEXT_PUBLIC_SECRET_KEY as string,
  },
  region: process.env.NEXT_PUBLIC_REGION,
   apiVersion: "2012-08-10" 
});

export const docClient = DynamoDBDocumentClient.from(dbClient);


function generateVideoId() {
  return require("uuid").v4();
}

export const createVideoEntry = async (video:any) => {
  const videoId = generateVideoId();
  const command = new PutCommand({
    TableName: "pixel-play-videos",
    Item: {
      pk: videoId,
      sk:videoId,
      title:video.title,
      uploadedBy:video.author,
      description:video.description,
      url:video.url,
      thumbnailUrl:video.thumbnailUrl,
      createdAt: Date.now(),
    },
    // ReturnValues: 'ALL_OLD',
  });
  try {
    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};



export const Getuser = async (userId:string) => {
  const params = {
    TableName: "users",
    Key: {
      userid: userId // Assuming UserId is the primary key of your table
    }
  };
  try {
   
    const command = new GetCommand(params);
    const response = await docClient.send(command);
    console.log('Scan succeeded:', response.Item);
    return response.Item;
  
  } catch (error) {
    console.error('Unable to scan the table. Error JSON:', JSON.stringify(error, null, 2));
    throw error;
  }
}