'use client'
import config from '@/src/lib/config'
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

interface IKUploadResponse {
  fileId: string
  name: string
  size: number
  filePath: string
  url: string
  fileType: string
  height?: number
  width?: number
  thumbnailUrl: string
}

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiUrl}/api/auth/imagekit`, {})

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Response failed with status ${response.status}: ${errorText}`
      )
    }

    const data = await response.json()
    const { token, expire, signature } = data
    return { token, expire, signature }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to authenticate: ' + error.message)
    }
    throw new Error('Failed to authenticate: Unknown error')
  }
}

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void
}) => {
  const {
    env: {
      imagekit: { publicKey, urlEndpoint },
    },
  } = config

  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  const onError = () => {
    toast.error('Failed to upload file')
  }
  const onSuccess = (res: IKUploadResponse) => {
    setFile(res)
    onFileChange(res.filePath)
    toast.success('File uploaded successfully')
  }

  return (
    <ImageKitProvider
      authenticator={authenticator}
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        className="hidden"
        fileName="test-upload.png"
      />

      <button
        onClick={() => ikUploadRef.current?.click()}
        className="upload-btn"
      >
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          path={file.filePath}
          alt={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
