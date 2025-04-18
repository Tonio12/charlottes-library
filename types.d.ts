interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  availableCopies: number
  description: string
  coverUrl: string
  coverColor: string
  videoUrl: string
  summary: string
  createdAt: Date
}

interface AuthCredentials {
  fullName: string
  email: string
  password: string
  universityId: number
  universityCard: string
}

interface BookParams {
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  description: string
  coverUrl: string
  coverColor: string
  videoUrl: string
  summary: string
}

interface BurrowBookParams {
  bookId: string
  userId: string
}

interface User {
  fullName: string
  email: string
  universityId: number
  universityCard: string
  id: string
  createdAt: Date
  status: USER_STATUS_ENUM
  role: USER_ROLE_ENUM
}
