import {
  Button,
  Column,
  Container,
  Hr,
  Html,
  Img,
  Row,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

export default function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Tailwind>
        <Container align="left" className="bg-[#111624] p-4">
          <Row>
            <Column>
              <Img
                className="inline-block"
                alt="Logo"
                height="20"
                src="/static/logo.png"
              />
            </Column>
            <Column align="right">
              <Text className="font-bold font-bebas-neue text-base text-white">
                BookWise
              </Text>
            </Column>
          </Row>
          <Hr />
          <Container align="left">
            <Text className="text-white text-xl">
              Welcome to BookWise, Your Reading Companion!
            </Text>
            <Text className="mt-4 text-white">Hi {name},</Text>
            <Text className="mt-3 text-white">
              Welcome to BookWise! We are excited to have you join our community
              of book enthusiasts. Explore a wide range of books burrow with
              ease, and manage your reading list effortlessly.
            </Text>

            <Button className="bg-[#e7c9a5] p-2 rounded-sm text-sm font-bold">
              Login To BookWise
            </Button>

            <Text className="mt-5 text-white pb-0 mb-0">Happy reading,</Text>
            <Text className="text-white mt-0">The BookWise Team</Text>
          </Container>
        </Container>
      </Tailwind>
    </Html>
  )
}
