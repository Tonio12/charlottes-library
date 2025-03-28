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
