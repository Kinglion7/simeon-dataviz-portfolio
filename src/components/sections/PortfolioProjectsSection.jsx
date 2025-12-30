import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export default function PortfolioProjectsSection() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Portfolio Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Critique by Design */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <Link to="/fencing-visualization" className="group">
              <h3 className="text-xl font-semibold text-primary group-hover:underline transition-colors">
                Critique by Design
              </h3>
            </Link>
            <Badge variant="secondary">Interactive</Badge>
          </div>
          <p className="text-base text-muted-foreground">
            An interactive map-based redesign of the US Fencing divisions data visualization. This project transforms a static bar chart into an engaging, interactive map where users can explore membership and rated-fencer distributions across divisions. Features include metric toggling, clickable divisions, and dynamic Top 5 rankings.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium">Key Features:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
              <li>Interactive map interface using React Leaflet</li>
              <li>Toggle between different metrics (total members, foilists, epeeists, saberists)</li>
              <li>Clickable division markers with detailed breakdowns</li>
              <li>Dynamic Top 5 rankings based on selected metric</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6" />

        {/* Final Project */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <Link to="/final-project-part-one" className="group">
              <h3 className="text-xl font-semibold text-primary group-hover:underline transition-colors">
                Final Project: The Cost of Fencing Ratings
              </h3>
            </Link>
            <Badge variant="secondary">Multi-part</Badge>
          </div>
          <p className="text-base text-muted-foreground">
            A comprehensive data story exploring the hidden financial and time investment required to achieve different fencing ratings across the three weapons (Foil, Epee, and Saber). This multi-part project reveals the number of tournaments fencers must compete in, calculates average tournament entry fees, and shows the total cost required to achieve each rating level.
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Project Components:</p>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/final-project-part-one">Part I</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/final-project-part-two">Part II</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/final-project-part-three">Part III</Link>
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Live Visualization:</p>
              <Button asChild variant="link" size="sm" className="p-0 h-auto">
                <a
                  href="https://kinglion7.github.io/fencing_final_visualization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  View Live Visualization
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Key Insights:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Analysis of tournament requirements for each rating level (U → E → D → C → B → A)</li>
                <li>Cost breakdowns by weapon type and rating progression</li>
                <li>Comparison of time and financial investment across Foil, Epee, and Saber</li>
                <li>Real fencer case studies and progression timelines</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

