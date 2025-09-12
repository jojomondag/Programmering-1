// Enhanced Markdown Loader with React Component Support
class ReactMarkdownLoader extends MarkdownLoader {
    constructor() {
        super();
        this.componentMountPoints = new Map();
    }

    /**
     * Enhanced markdown to HTML conversion with React component support
     */
    markdownToHtml(markdown) {
        let html = markdown;
        const components = [];
        
        // Handle React code blocks with special syntax: ```react:component-type
        html = html.replace(/```react:freeflow(?:\s+(.+?))?\n([\s\S]*?)\n```/g, (match, options, code) => {
            const componentId = `freeflow-${components.length}`;
            const props = this.parseComponentOptions(options);
            components.push({
                id: componentId,
                type: 'FreeFlowSyntax',
                props: {
                    code: code.trim(),
                    language: props.language || 'java',
                    title: props.title || null,
                    showLineNumbers: props.lineNumbers === 'true'
                }
            });
            return `<div id="${componentId}" class="react-component-mount"></div>`;
        });

        // Handle interactive demos: ```react:demo
        html = html.replace(/```react:demo(?:\s+(.+?))?\n([\s\S]*?)\n---\n([\s\S]*?)\n```/g, (match, options, code, output) => {
            const componentId = `demo-${components.length}`;
            const props = this.parseComponentOptions(options);
            components.push({
                id: componentId,
                type: 'InteractiveCodeDemo',
                props: {
                    code: code.trim(),
                    language: props.language || 'java',
                    title: props.title || null,
                    expectedOutput: output.trim()
                }
            });
            return `<div id="${componentId}" class="react-component-mount"></div>`;
        });

        // Handle code examples with grouping: ```react:example
        html = html.replace(/```react:example(?:\s+(.+?))?\n([\s\S]*?)\n```/g, (match, options, content) => {
            const componentId = `example-${components.length}`;
            const props = this.parseComponentOptions(options);
            
            // Parse multiple code blocks within the example
            const codeBlocks = content.split(/\n---\s*(\w+)?\s*\n/).filter(block => block.trim());
            const exampleComponents = [];
            
            for (let i = 0; i < codeBlocks.length; i += 2) {
                if (codeBlocks[i] && codeBlocks[i + 1]) {
                    exampleComponents.push({
                        title: codeBlocks[i],
                        code: codeBlocks[i + 1].trim()
                    });
                }
            }
            
            components.push({
                id: componentId,
                type: 'CodeExampleContainer',
                props: {
                    title: props.title || 'Kodexempel',
                    examples: exampleComponents
                }
            });
            return `<div id="${componentId}" class="react-component-mount"></div>`;
        });

        // Enhanced inline code handling for InText components
        html = html.replace(/\[code\]([^[]+)\[\/code\]/g, (match, code) => {
            const componentId = `inline-${components.length}`;
            components.push({
                id: componentId,
                type: 'InTextSyntax',
                props: {
                    children: code,
                    language: 'java'
                }
            });
            return `<span id="${componentId}" class="react-component-mount inline"></span>`;
        });

        // Process regular markdown
        html = super.markdownToHtml(html);

        // Store components for mounting
        this.componentMountPoints.set('current', components);
        
        return html;
    }

    /**
     * Parse component options from markdown attributes
     */
    parseComponentOptions(optionsString) {
        const options = {};
        if (!optionsString) return options;
        
        // Parse key=value pairs
        const pairs = optionsString.match(/(\w+)=("[^"]*"|'[^']*'|\S+)/g) || [];
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            options[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
        });
        
        return options;
    }

    /**
     * Mount React components after HTML is rendered
     */
    async mountReactComponents() {
        const components = this.componentMountPoints.get('current');
        if (!components || !window.SyntaxComponents) return;

        components.forEach(component => {
            const mountPoint = document.getElementById(component.id);
            if (mountPoint && window.SyntaxComponents[component.type]) {
                const root = ReactDOM.createRoot(mountPoint);
                
                if (component.type === 'CodeExampleContainer' && component.props.examples) {
                    // Special handling for CodeExampleContainer with multiple examples
                    const exampleElements = component.props.examples.map((example, index) =>
                        window.h(window.SyntaxComponents.FreeFlowSyntax, {
                            key: index,
                            code: example.code,
                            language: 'java',
                            title: example.title
                        })
                    );
                    
                    root.render(
                        window.h(window.SyntaxComponents.CodeExampleContainer, {
                            title: component.props.title
                        }, exampleElements)
                    );
                } else {
                    root.render(
                        window.h(window.SyntaxComponents[component.type], component.props)
                    );
                }
            }
        });
    }

    /**
     * Enhanced content loading with React component mounting
     */
    async loadMarkdownContent(filename) {
        const html = await super.loadMarkdownContent(filename);
        
        // Mount React components after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.mountReactComponents();
        }, 100);
        
        return html;
    }

    /**
     * Render enhanced text with automatic inline code detection
     */
    renderEnhancedText(text, className = '') {
        const mountPoint = document.createElement('div');
        const root = ReactDOM.createRoot(mountPoint);
        
        root.render(
            window.h(window.SyntaxComponents.EnhancedText, {
                className
            }, text)
        );
        
        return mountPoint.innerHTML;
    }

    /**
     * Create a React-rendered code block programmatically
     */
    createCodeBlock(code, options = {}) {
        const {
            language = 'java',
            title = null,
            showLineNumbers = false,
            variant = 'freeflow'
        } = options;

        const mountPoint = document.createElement('div');
        const root = ReactDOM.createRoot(mountPoint);
        
        const Component = variant === 'inline' ? 
            window.SyntaxComponents.InTextSyntax : 
            window.SyntaxComponents.FreeFlowSyntax;
            
        const props = variant === 'inline' ? 
            { children: code, language } : 
            { code, language, title, showLineNumbers };
        
        root.render(window.h(Component, props));
        
        return mountPoint.innerHTML;
    }

    /**
     * Create an interactive demo programmatically
     */
    createInteractiveDemo(code, output, options = {}) {
        const {
            language = 'java',
            title = null
        } = options;

        const mountPoint = document.createElement('div');
        const root = ReactDOM.createRoot(mountPoint);
        
        root.render(
            window.h(window.SyntaxComponents.InteractiveCodeDemo, {
                code,
                language,
                title,
                expectedOutput: output
            })
        );
        
        return mountPoint.innerHTML;
    }
}

// Replace the global instance with the enhanced version
console.log('Creating enhanced ReactMarkdownLoader instance...');
window.markdownLoader = new ReactMarkdownLoader();
console.log('ReactMarkdownLoader instance created:', window.markdownLoader);

// Utility functions for easy component creation
window.createCodeBlock = (code, options = {}) => {
    return window.markdownLoader.createCodeBlock(code, options);
};

window.createInteractiveDemo = (code, output, options = {}) => {
    return window.markdownLoader.createInteractiveDemo(code, output, options);
};

// Helper function to render enhanced text
window.renderEnhancedText = (text, className = '') => {
    return window.markdownLoader.renderEnhancedText(text, className);
};