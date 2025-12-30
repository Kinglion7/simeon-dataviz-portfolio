import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import HomePage from "@/pages/HomePage"
import FencingVisualizationPage from "@/pages/FencingVisualizationPage"
import FinalProjectPartOnePage from "@/pages/FinalProjectPartOnePage"
import FinalProjectPartTwoPage from "@/pages/FinalProjectPartTwoPage"
import FinalProjectPartThreePage from "@/pages/FinalProjectPartThreePage"

function App() {
  return (
    <BrowserRouter basename="/simeon-dataviz-portfolio">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fencing-visualization" element={<FencingVisualizationPage />} />
          <Route path="/final-project-part-one" element={<FinalProjectPartOnePage />} />
          <Route path="/final-project-part-two" element={<FinalProjectPartTwoPage />} />
          <Route path="/final-project-part-three" element={<FinalProjectPartThreePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

