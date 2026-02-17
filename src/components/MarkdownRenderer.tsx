import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // or dracula, vscDarkPlus, etc.

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert prose-purple max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom code block renderer with syntax highlighting
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}           // ← choose your favorite theme
                language={match[1]}
                PreTag="div"
                className="rounded bg-[#0d1117] p-4 my-4 overflow-x-auto text-sm"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              // Inline code: `like this`
              <code
                className="bg-purple-950/50 px-1.5 py-0.5 rounded text-purple-300 font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Optional: nicer paragraphs, lists, etc. to match your dark theme
          p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1.5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1.5">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="text-purple-300 font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic text-purple-200">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}