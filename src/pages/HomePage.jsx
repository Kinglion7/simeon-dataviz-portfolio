import AboutSection from "@/components/sections/AboutSection"
import LearningGoalsSection from "@/components/sections/LearningGoalsSection"
import PortfolioProjectsSection from "@/components/sections/PortfolioProjectsSection"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Simeon Apanpa - Data Visualization Portfolio
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-7">
          Welcome to my portfolio for <strong>Telling Stories with Data</strong> at Carnegie Mellon University. This site showcases my work in data visualization, from exploratory analyses to interactive visualizations and comprehensive data stories.
        </p>
      </div>

      <Separator />

      <AboutSection />
      <LearningGoalsSection />
      <PortfolioProjectsSection />
    </div>
  )
}

