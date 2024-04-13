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

// export const GetAllVideos = async () => {
//   const command = new GetCommand({
//     TableName: "pixel-play-videos",
//     Key: {
//       // CommonName: "Shoebill",
//     },
//   });

//   const response = await DocumentClient.scan;
//   console.log(response);
//   return response;
// };