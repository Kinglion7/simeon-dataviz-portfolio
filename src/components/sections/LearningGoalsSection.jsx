import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LearningGoalsSection() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>What I Hope to Learn</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Through this course, I aim to develop:</p>
        <ul className="list-disc list-inside space-y-2 text-base">
          <li>New data visualization techniques</li>
          <li>Design principles when visualizing data</li>
          <li>Designer mentality when organizing data and what to present</li>
        </ul>
      </CardContent>
    </Card>
  )
}


