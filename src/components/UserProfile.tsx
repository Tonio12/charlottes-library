import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { getUserInitial } from '../lib/utils'

interface User {
  fullName: string
  email: string
  universityId: number
}
const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col p-4 bg-gray-500 rounded-lg">
      <div className="flex gap-5 items-start">
        <Avatar>
          <AvatarFallback className="bg-amber-100 rounded-full p-2">
            {getUserInitial(user.fullName!)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-light-100 text-2xl font-bold">{user.fullName}</h3>
          <p className="text-light-100 text-sm">{user.email}</p>
        </div>
      </div>
      <div>
        <h4 className="text-light-100 text-sm font-bold">University</h4>
        <p className="text-light-100 text-sm">{user.universityId}</p>
      </div>
    </div>
  )
}

export default UserProfile
