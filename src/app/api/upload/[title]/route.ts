import {NextResponse,NextRequest} from "next/server"
import S3 from "aws-sdk/clients/s3"
import { randomUUID } from "crypto"

const s3 = new S3({
  apiVersion:'2006-03-01',
  accessKeyId:process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey:process.env.NEXT_PUBLIC_SECRET_KEY,
  region:process.env.NEXT_PUBLIC_REGION,
  signatureVersion:'v4'
})
export async function GET(req:NextRequest,context:any) {
  const {params} = context;
  console.log(params.title)
  const title = params.title.replace(/\s+/g, '-');
  const Key = `${title}-${randomUUID()}.mp4`
  const thumbnailKey=`${randomUUID()}.jpg`
  const s3Params = {
    Bucket:process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key,
    Expires:60,
    ContentType:'video/mp4'
  }
  const s3ThumbnailParams = {
    Bucket:'thumbnail-video-storage',
    Key:thumbnailKey,
    Expires:60,
    ContentType:'image/jpg',
  }


  const uploadUrl = await s3.getSignedUrl('putObject',s3Params)
  const thumbnailUrl = await s3.getSignedUrl('putObject',s3ThumbnailParams)
  console.log(thumbnailUrl)
   // Append user ID to the upload URL
   const uploadUrlWithUserId = `${uploadUrl}`;

  return NextResponse.json({
    uploadUrl:uploadUrlWithUserId,
    thumbnailUrl,
    key:Key,
    thumbnailKey
  })
}