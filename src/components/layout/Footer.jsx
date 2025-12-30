export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Simeon Apanpa - Data Visualization Portfolio</p>
          <div className="flex gap-4">
            <a
              href="https://kinglion7.github.io/simeon-dataviz-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Portfolio URL
            </a>
            <a
              href="https://github.com/kinglion7/simeon-dataviz-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

