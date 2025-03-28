'use client'
import { IKVideo, ImageKitProvider } from 'imagekitio-next'
import React from 'react'
import config from '../lib/config'

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  console.log(videoUrl)
  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
    >
      <IKVideo path={videoUrl} controls={true} className="w-full round-xl" />
    </ImageKitProvider>
  )
}

export default BookVideo
