'use client'
import config from '@/src/lib/config'
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { cn } from '../lib/utils'

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

interface FileUploadProps {
  onFileChange: (filePath: string) => void
  type: 'image' | 'video'
  accept: string
  placeholder: string
  folder: string
  variant?: 'light' | 'dark'
  value?: string
}

const FileUpload = ({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
}: FileUploadProps) => {
  const {
    env: {
      imagekit: { publicKey, urlEndpoint },
    },
  } = config

  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ filePath: string } | null>({
    filePath: value ?? '',
  })
  const [progress, setProgress] = useState(0)

  const styles = {
    button:
      variant === 'dark'
        ? 'bg-dark-300'
        : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
  }
  const onError = () => {
    toast.error('Failed to upload file')
  }
  const onSuccess = (res: IKUploadResponse) => {
    setFile(res)
    onFileChange(res.filePath)
    toast.success('File uploaded successfully')
  }

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 1024 * 1024 * 20) {
        toast.error('Image size must be less than 20MB')
        return false
      }
    } else if (type === 'video') {
      if (file.size > 1024 * 1024 * 50) {
        toast.error('Video size must be less than 100MB')
        return false
      }
    }
    return true
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
        validateFile={onValidate}
        useUniqueFileName={true}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percentageProgress = Math.round((loaded / total) * 100)
          setProgress(percentageProgress)
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        onClick={(e) => {
          e.preventDefault()
          if (ikUploadRef.current) {
            ikUploadRef.current?.click()
          }
        }}
        className={cn('upload-btn', styles.button)}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>
        )}
      </button>
      {progress > 0 && progress < 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      {file &&
        (type === 'image' ? (
          <IKImage
            path={file.filePath}
            alt={file.filePath}
            width={500}
            height={300}
          />
        ) : type === 'video' ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  )
}

export default FileUpload
