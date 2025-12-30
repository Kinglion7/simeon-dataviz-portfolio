import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-7">
          I'm <strong>Simeon Apanpa</strong>, a Carnegie Mellon 2nd year graduate student pursuing a degree in the Management of Information Systems from Heinz College. I enjoy exploring data from acquisition, to processing, and most importantly being able to tell a story from the data given.
        </p>
      </CardContent>
    </Card>
  )
}

