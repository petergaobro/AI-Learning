import IBMCOS from "ibm-cos-sdk"
import { env } from "~/env"

// const cos = new myCOS.S3({
//   apiKeyId: cosApiKeyId,
//   endpoint: cosEndPoint,
//   ibmAuthEndpoint: cosIbmAuthEndpoint,
//   serviceInstanceId: cosServiceInstanceId,
//   // apiKeyId: process.env.IBM_COS_APIKEY,
//   // serviceInstanceId: process.env.IBM_COS_RSC_SERV_INST_ID,
//   // ibmAuthEndpoint: process.env.IBM_COS_AUTH_ENDPOINT,
//   // endpoint: process.env.IBM_COS_ENDPOINT,
// })

// module.exports = cos

const config = {
  cosApiKeyId: `${env.NEXT_PUBLIC_IBM_COS_APIKEY}`,
  cosServiceInstanceId: `${env.NEXT_PUBLIC_IBM_COS_RSC_SERV_INST_ID}`,
  cosIbmAuthEndpoint: `${env.NEXT_PUBLIC_IBM_COS_AUTH_ENDPOINT}`,
  cosEndPoint: `${env.NEXT_PUBLIC_IBM_COS_ENDPOINT}`,
}
export const AudioItemCos = new IBMCOS.S3(config as any)