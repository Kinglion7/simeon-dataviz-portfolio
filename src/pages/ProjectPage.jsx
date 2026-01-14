import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ProjectPage({ content }) {
  return (
    <Card className="prose prose-slate max-w-none animate-fade-in prose-headings:font-bold prose-headings:tracking-tight prose-p:text-foreground prose-a:text-primary prose-strong:font-semibold prose-code:text-foreground">
      <CardContent className="pt-6 pb-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold mb-6 mt-8 first:mt-0 border-b border-border pb-3" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-semibold mb-4 mt-10 first:mt-0" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl font-semibold mb-3 mt-8" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-xl font-semibold mb-2 mt-6" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-4 text-base leading-7 text-foreground" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc mb-5 space-y-1.5 ml-6" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal mb-5 space-y-1.5 ml-6" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="mb-0.5 leading-7" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            img: ({ node, ...props }) => {
              // Handle image src paths - ensure they work with the base path
              let src = props.src || ""
              
              // URL-encode the path to handle spaces and special characters in filenames
              // This is important for filenames like "Solution Workflow Diagram.png"
              if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                // Split path into directory and filename parts
                const pathParts = src.split('/')
                const encodedParts = pathParts.map(part => {
                  // Only encode parts that contain spaces or special characters
                  // This preserves the path structure while encoding the filename
                  if (part && (part.includes(' ') || /[^a-zA-Z0-9._-]/.test(part))) {
                    return encodeURIComponent(part)
                  }
                  return part
                })
                src = encodedParts.join('/')
              }
              
              return (
                <img 
                  className="rounded-lg my-6 max-w-full h-auto" 
                  src={src}
                  alt={props.alt || ""}
                  loading="lazy"
                />
              )
            },
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-primary pl-4 italic my-5 text-muted-foreground bg-muted/30 py-2"
                {...props}
              />
            ),
            em: ({ node, ...props }) => (
              <em className="italic text-foreground" {...props} />
            ),
            code: ({ node, inline, ...props }) =>
              inline ? (
                <code
                  className="relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground border border-border"
                  {...props}
                />
              ) : (
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 my-4 border border-border">
                  <code className="font-mono text-sm text-foreground" {...props} />
                </pre>
              ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-6 w-full">
                <table className="w-full border-collapse border border-border text-sm" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-muted/80" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="border border-border px-4 py-3 text-left font-semibold bg-muted/60 align-middle" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-border px-4 py-3 align-middle text-foreground text-left" {...props} />
            ),
            tbody: ({ node, ...props }) => (
              <tbody className="[&>tr:nth-child(even)]:bg-muted/10" {...props} />
            ),
            tr: ({ node, ...props }) => (
              <tr {...props} />
            ),
            hr: ({ node, ...props }) => <Separator className="my-8" {...props} />,
            div: ({ node, ...props }) => {
              // Handle all props including style
              const allProps = { ...props }
              // Parse style if it's a string
              if (typeof allProps.style === 'string') {
                const styleObj = {}
                allProps.style.split(';').forEach(decl => {
                  const [key, value] = decl.split(':').map(s => s.trim())
                  if (key && value) {
                    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
                    styleObj[camelKey] = value
                  }
                })
                allProps.style = styleObj
              }
              return <div {...allProps} />
            },
            iframe: ({ node, ...props }) => {
              // Handle all props - rehype-raw passes props differently
              const src = props.src || props.href
              const width = props.width || "100%"
              const height = props.height || "800px"
              const title = props.title || "Embedded content"
              
              // Parse style if it's a string
              let styleObj = { border: 'none' }
              if (typeof props.style === 'string') {
                props.style.split(';').forEach(decl => {
                  const [key, value] = decl.split(':').map(s => s.trim())
                  if (key && value) {
                    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
                    styleObj[camelKey] = value
                  }
                })
              } else if (props.style && typeof props.style === 'object') {
                styleObj = { ...styleObj, ...props.style }
              }
              
              return (
                <iframe 
                  src={src}
                  width={width}
                  height={height}
                  title={title}
                  frameBorder="0"
                  style={styleObj}
                  className="w-full border-0 rounded-lg"
                  allow="fullscreen"
                  loading="lazy"
                  allowFullScreen
                />
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </CardContent>
    </Card>
  )
}

