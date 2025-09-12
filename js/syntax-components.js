// React Components for Syntax Highlighting
// Requires React 18+ and ReactDOM

// State management for copy functionality
const { useState, useEffect, useRef } = React;

/**
 * FreeFlow SyntaxHighlighting Component
 * A standalone code block with syntax highlighting and copy functionality
 */
function FreeFlowSyntax({ code, language = 'java', title = null, showLineNumbers = false }) {
    const [copyStatus, setCopyStatus] = useState('Kopiera');
    const codeRef = useRef(null);

    useEffect(() => {
        // Highlight code when component mounts or code changes
        if (window.Prism && codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopyStatus('Kopierat! ✓');
            setTimeout(() => setCopyStatus('Kopiera'), 2000);
        } catch (err) {
            console.error('Kunde inte kopiera kod:', err);
            setCopyStatus('Fel ✗');
            setTimeout(() => setCopyStatus('Kopiera'), 2000);
        }
    };

    const lineNumbers = showLineNumbers ? 
        code.split('\n').map((_, index) => index + 1).join('\n') : null;

    return React.createElement('div', {
        className: 'code-container relative mb-6 group'
    }, [
        // Optional title
        title && React.createElement('div', {
            key: 'title',
            className: 'bg-gray-800 text-gray-300 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-gray-700'
        }, title),
        
        // Copy button
        React.createElement('button', {
            key: 'copy-btn',
            onClick: handleCopy,
            className: `absolute top-3 right-3 z-10 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 ${copyStatus.includes('✓') ? 'bg-green-600 hover:bg-green-500' : ''} ${copyStatus.includes('✗') ? 'bg-red-600 hover:bg-red-500' : ''}`
        }, copyStatus),
        
        // Code block container
        React.createElement('div', {
            key: 'code-block',
            className: `${title ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden shadow-lg`
        }, [
            React.createElement('div', {
                key: 'code-wrapper',
                className: 'flex bg-gray-900'
            }, [
                // Line numbers (optional)
                showLineNumbers && React.createElement('div', {
                    key: 'line-numbers',
                    className: 'bg-gray-800 text-gray-500 px-3 py-4 text-sm font-mono select-none border-r border-gray-700',
                    style: { whiteSpace: 'pre' }
                }, lineNumbers),
                
                // Code content
                React.createElement('pre', {
                    key: 'pre',
                    className: 'flex-1 overflow-x-auto'
                }, [
                    React.createElement('code', {
                        key: 'code',
                        ref: codeRef,
                        className: `language-${language} text-sm leading-relaxed block p-4`,
                        style: { 
                            background: 'transparent',
                            fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace"
                        }
                    }, code)
                ])
            ])
        ])
    ]);
}

/**
 * InText SyntaxHighlighting Component
 * Inline code highlighting that fits within text flows
 */
function InTextSyntax({ children, language = 'java', variant = 'default' }) {
    const codeRef = useRef(null);

    useEffect(() => {
        // Highlight code when component mounts or code changes
        if (window.Prism && codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [children, language]);

    const getVariantStyles = () => {
        switch (variant) {
            case 'subtle':
                return 'bg-gray-50 text-gray-800 border border-gray-200';
            case 'emphasized':
                return 'bg-blue-50 text-blue-900 border border-blue-200';
            case 'dark':
                return 'bg-gray-800 text-gray-200 border border-gray-700';
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-300';
        }
    };

    return React.createElement('code', {
        ref: codeRef,
        className: `language-${language} inline-block px-2 py-1 rounded text-sm font-mono ${getVariantStyles()} transition-colors duration-200 hover:shadow-sm`,
        style: {
            fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
            fontSize: '0.875em',
            lineHeight: '1.2'
        }
    }, children);
}

/**
 * Enhanced Text Component that can contain InText syntax highlighting
 */
function EnhancedText({ children, className = '' }) {
    const processText = (text) => {
        if (typeof text !== 'string') return text;
        
        // Pattern to match code snippets like `public static void main(String[] args)`
        const codePattern = /`([^`]+)`/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codePattern.exec(text)) !== null) {
            // Add text before the code
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            
            // Add the code as InText syntax highlighting
            parts.push(React.createElement(InTextSyntax, {
                key: `code-${match.index}`,
                language: 'java'
            }, match[1]));
            
            lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }
        
        return parts.length > 1 ? parts : text;
    };

    const processChildren = (children) => {
        if (Array.isArray(children)) {
            return children.map((child, index) => {
                if (typeof child === 'string') {
                    return processText(child);
                }
                return child;
            });
        }
        return processText(children);
    };

    return React.createElement('p', {
        className: `mb-4 text-gray-700 leading-relaxed ${className}`
    }, processChildren(children));
}

/**
 * Code Example Container
 * Wrapper for multiple related code examples
 */
function CodeExampleContainer({ title, children, className = '' }) {
    return React.createElement('div', {
        className: `border border-gray-200 rounded-lg overflow-hidden mb-6 ${className}`
    }, [
        title && React.createElement('div', {
            key: 'header',
            className: 'bg-gray-50 px-4 py-3 border-b border-gray-200'
        }, [
            React.createElement('h4', {
                key: 'title',
                className: 'font-semibold text-gray-900 flex items-center gap-2'
            }, [
                React.createElement('span', { key: 'icon' }, '💻'),
                title
            ])
        ]),
        React.createElement('div', {
            key: 'content',
            className: 'p-4'
        }, children)
    ]);
}

/**
 * Interactive Code Demo
 * Shows code with live output preview
 */
function InteractiveCodeDemo({ code, language = 'java', expectedOutput = null, title = null }) {
    return React.createElement('div', {
        className: 'grid lg:grid-cols-2 gap-4 mb-6'
    }, [
        React.createElement('div', { key: 'code' }, [
            React.createElement(FreeFlowSyntax, {
                key: 'syntax',
                code,
                language,
                title: title || 'Kod',
                showLineNumbers: true
            })
        ]),
        expectedOutput && React.createElement('div', { key: 'output' }, [
            React.createElement('div', {
                key: 'output-container',
                className: 'bg-black text-green-400 p-4 rounded-lg font-mono text-sm'
            }, [
                React.createElement('div', {
                    key: 'header',
                    className: 'text-gray-400 mb-2 text-xs'
                }, '🖥️ Utdata:'),
                React.createElement('pre', {
                    key: 'content',
                    style: { whiteSpace: 'pre-wrap' }
                }, expectedOutput)
            ])
        ])
    ]);
}

// Export components for use
window.SyntaxComponents = {
    FreeFlowSyntax,
    InTextSyntax,
    EnhancedText,
    CodeExampleContainer,
    InteractiveCodeDemo
};

// Export React createElement for convenience
window.h = React.createElement;