import { writeFile } from 'fs/promises'
import { type NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  // const file = new File([data], `${crypto.randomBytes(8).toString("hex")}.wav`, { type: 'audio/wav', lastModified: Date.now() })

  if (!file) {
    return NextResponse.json({ success: false })
  }

  console.log(file, 'The file was stored');

  // const reader = new FileReader();

  // reader.onloadend = async function () {
  //   const wavBlob: any = new Blob([reader.result as any], { type: 'audio/wav' })
  //   const filePath = path.join(__dirname, file.name)
  //   // console.log(file.name, "filename");
  //   const buffer = Buffer.from(new Uint8Array(wavBlob))
  //   await writeFile(filePath, buffer)
  // }
  // reader.readAsArrayBuffer(file);


  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(new Uint8Array(bytes))
  // const buffer = Buffer.from(new Uint8Array(file))


  /** todo embed cos config */
  /** ready to save voice into COS */
  /**
   * 
   * @returns {
      "apikey": "agJqH1o_2HC59UfC8ikPOnTFnyOP9obib3lgl45ZQ7ig",
      "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
      "iam_apikey_description": "Auto-generated for key crn:v1:bluemix:public:cloud-object-storage:global:a/3e00657a97c0454888f8b4f61f0646ff:940578f9-782e-49bc-9428-2f8565908340:resource-key:2f232de1-c286-42c1-aa39-069f31d31cbb",
      "iam_apikey_name": "IdentityFS",
      "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
      "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/3e00657a97c0454888f8b4f61f0646ff::serviceid:ServiceId-f6697648-a8d5-4dac-996b-2b4543bf093f",
      "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/3e00657a97c0454888f8b4f61f0646ff:940578f9-782e-49bc-9428-2f8565908340::"
  }
   */





  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // const filePath = path.join('/', 'tmp', file.name)
  /** save it into .next tmp file */
  // const filePath = path.resolve(__dirname, `${file.name}`)
  const filePath = path.resolve(`./audios/${file.name}`)
  // console.log(file.name, "filename");

  await writeFile(filePath, buffer)
  console.log(`open ${filePath} to see the uploaded file`)

  return NextResponse.json({ success: true })
}
