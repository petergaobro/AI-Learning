import { NextResponse } from "next/server";
// import cos from '../../../server/models/audios/audioItems'
import { cos } from "~/server/models/audios/audioItems";

export async function GET(res: any, req: any) {
  const { bucketName } = req.params;
  /**Get file contents of particular item */
  cos.putBucketProtectionConfiguration({
    Bucket: bucketName,
    // Key: itemName
    ProtectionConfiguration: {
      'Status': 'Retention',
      'MinimumRetention': { 'Days': 10 },
      'DefaultRetention': { 'Days': 100 },
      'MaximumRetention': { 'Days': 1000 }
    }
  }).promise()
    .then((data: any) => {
      if (data != null) {
        res.send(data.Body);
      }
      // else {
      //   console.log(err)
      //   res.send(err)
      // }
    }).catch((e: any) => {
      // console.log(`ERROR: ${e.code} - ${e.message}: ${itemName}\n`);
      console.log(`Protection added to bucket ${bucketName}!`);
      res.send(e)
    });
  return NextResponse.json({ success: true })
}