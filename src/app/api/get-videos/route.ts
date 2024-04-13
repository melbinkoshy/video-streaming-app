import {NextResponse,NextRequest} from "next/server"
import { docClient } from "@/utils/dynamoDB";

// export async function GET(req, res) {
//   try{
//     const params = {
//       TableName: 'pixel-play-videos'
//     };
//     const items = await docClient.scan(params).promise();
//   }
//   catch(error){

//   }
// }