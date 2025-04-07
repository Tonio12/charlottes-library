'use client'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { getUserInitial } from '../lib/utils'
import { IKImage } from 'imagekitio-next'
import config from '../lib/config'

interface User {
  id: string
  fullName: string
  email: string
  universityId: number
  universityCard: string
}
const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col p-4 gap-7 bg-gray-500 rounded-lg">
      <div className="flex gap-5 items-start">
        <Avatar>
          <AvatarFallback className="bg-amber-100 rounded-full p-2">
            {getUserInitial(user.fullName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-light-100 text-lg font-bold">{user.fullName}</h3>
          <p className="text-light-100 text-sm">{user.email}</p>
        </div>
      </div>
      <div>
        <h4 className="text-light-100 text-sm font-bold">University</h4>
        <p className="text-light-100 text-sm">{user.universityId}</p>
      </div>
      <div>
        <h4 className="text-light-100 text-sm font-bold">Student Id</h4>
        <p className="text-light-100 text-sm">{user.id}</p>
      </div>
      <IKImage
        alt="University Card"
        path={user.universityCard}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        width={500}
        height={300}
      />
    </div>
  )
}

export default UserProfile
