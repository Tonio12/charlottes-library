import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import React from 'react'
import { Badge } from '../ui/badge'
import { getNumOfBurrowedBook } from '@/src/lib/actions/users'
import Link from 'next/link'
import config from '@/src/lib/config'
import { Trash2 } from 'lucide-react'

const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <Table>
      <TableHeader className="admin-table_header">
        <TableRow className="admin-table_row">
          <TableHead className="w-[100px] text-center text-dark-200 dark:text-200">
            Name
          </TableHead>
          <TableHead className="text-center text-dark-200 dark:text-200">
            Date Join
          </TableHead>
          <TableHead className="text-center text-dark-200 dark:text-dark-200">
            Role
          </TableHead>
          <TableHead className=" text-center text-dark-200 dark:text-dark-200">
            Books Borrowed
          </TableHead>
          <TableHead className=" text-center text-dark-200 dark:text-dark-200">
            University ID No
          </TableHead>
          <TableHead className=" text-center text-dark-200 dark:text-dark-200">
            University Card No
          </TableHead>
          <TableHead className=" text-center text-dark-200 dark:text-dark-200">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          return (
            <TableRow key={user.id} className="admin-table_row text-center">
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge>{user.role}</Badge>
              </TableCell>
              <TableCell>{getNumOfBurrowedBook(user.id) || 0}</TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <Link
                  href={config.env.imagekit.urlEndpoint + user.universityCard}
                  className="text-blue-600 hover:underline"
                >
                  View Id Card
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  className="bg-transparent hover:bg-transparent"
                  size="sm"
                >
                  <Trash2 color="red" className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default UsersTable
