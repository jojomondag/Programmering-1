// Simplified Markdown Loader - Browser Compatible (React removed)
class MarkdownLoader {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Load and render markdown content from a file
     * @param {string} filename - The name of the markdown file (without extension)
     * @returns {Promise<string>} - The rendered HTML content
     */
    async loadMarkdownContent(filename) {
        try {
            console.log(`Loading markdown content for: ${filename}`);
            
            // Check cache first
            if (this.cache.has(filename)) {
                console.log(`Using cached content for: ${filename}`);
                return this.cache.get(filename);
            }

            // Load markdown file
            const response = await fetch(`content/${filename}.md`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}.md: ${response.status}`);
            }
            
            let markdownText = await response.text();
            console.log(`Loaded ${markdownText.length} characters from ${filename}.md`);

            // Preprocess: strip sections that should no longer be rendered
            markdownText = this.filterSections(markdownText, filename);
            
            // Render using built-in function
            const htmlContent = this.markdownToHtml(markdownText);
            
            // Cache the result
            this.cache.set(filename, htmlContent);
            console.log(`Cached and returning content for: ${filename}`);
            
            return htmlContent;
        } catch (error) {
            console.error('Error loading markdown content:', error);
            return `<div class="theme-alert-error p-4">
                <p class="theme-alert-error-title">Kunde inte ladda innehåll från ${filename}.md</p>
                <p class="theme-alert-error-desc text-sm mt-1">Fel: ${error.message}</p>
            </div>`;
        }
    }

    /**
     * Convert markdown to HTML with Tailwind styling
     */
    markdownToHtml(markdown) {
        let html = markdown;
        
        // Handle code blocks first (to avoid processing content inside them)
        const codeBlocks = [];
        // Accept any info string after the ``` (handles "react:..." tokens and normal languages)
        html = html.replace(/```([^\n]*)\n([\s\S]*?)\n```/g, (match, info, code) => {
            const index = codeBlocks.length;
            let langClass = '';

            if (info) {
                // Extract the first token (e.g. "java", "react:freeflow", "react:demo language=java")
                const token = info.trim().split(/\s+/)[0];
                if (token.includes(':')) {
                    // For react:<type> fences, default to java to keep examples highlighted
                    langClass = 'language-java';
                } else {
                    langClass = `language-${token}`;
                }
            }

            // Check if this is a react:demo block with terminal output
            if (info && info.includes('react:demo')) {
                const parts = code.split('---');
                if (parts.length === 2) {
                    // Clean up the Java code by normalizing indentation
                    let javaCode = this.stripBoundaryNewlines(parts[0]);
                    
                    // Normalize indentation - find minimum indentation and adjust all lines
                    const lines = javaCode.split('\n');
                    const nonEmptyLines = lines.filter(line => line.trim().length > 0);
                    
                    if (nonEmptyLines.length > 0) {
                        // Find minimum indentation
                        const minIndent = Math.min(...nonEmptyLines.map(line => {
                            const match = line.match(/^(\s*)/);
                            return match ? match[1].length : 0;
                        }));
                        
                        // Remove minimum indentation from all lines
                        const normalizedLines = lines.map(line => {
                            if (line.trim().length === 0) return line; // Keep empty lines as is
                            return line.substring(minIndent);
                        });
                        
                        javaCode = normalizedLines.join('\n').replace(/^\n+|\n+$/g, '');
                    }
                    
                    const terminalOutput = this.stripBoundaryNewlines(parts[1]);
                    
                    codeBlocks.push(`<div class="demo-grid mb-8">
<div class="code-container relative">
<button onclick="copyCode(this)" class="copy-button">Kopiera</button>
<pre class="theme-codeblock p-4 rounded-lg overflow-x-auto h-full">
<code class="${langClass} font-mono">${this.escapeHtml(javaCode)}</code>
</pre>
</div>
<div class="terminal-container">
<div class="terminal-header">
<div class="terminal-buttons">
<span class="terminal-button close"></span>
<span class="terminal-button minimize"></span>
<span class="terminal-button maximize"></span>
</div>
<span class="terminal-title">Terminal</span>
</div>
<div class="terminal-body">
<pre class="terminal-output">${this.escapeHtml(terminalOutput)}</pre>
</div>
</div>
</div>`);
                } else {
                    // Fallback for react:demo without terminal output
                    let cleanCode = this.stripBoundaryNewlines(code);
                    const lines = cleanCode.split('\n');
                    const nonEmptyLines = lines.filter(line => line.trim().length > 0);
                    
                    if (nonEmptyLines.length > 0) {
                        const minIndent = Math.min(...nonEmptyLines.map(line => {
                            const match = line.match(/^(\s*)/);
                            return match ? match[1].length : 0;
                        }));
                        
                        const normalizedLines = lines.map(line => {
                            if (line.trim().length === 0) return line;
                            return line.substring(minIndent);
                        });
                        
                        cleanCode = normalizedLines.join('\n').replace(/^\n+|\n+$/g, '');
                    }
                    codeBlocks.push(`<div class="code-container relative mb-6">
<button onclick="copyCode(this)" class="copy-button">Kopiera</button>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code class="${langClass} font-mono">${this.escapeHtml(cleanCode)}</code>
</pre>
</div>`);
                }
            } else {
                // Regular code block
                let cleanCode = this.stripBoundaryNewlines(code);
                const lines = cleanCode.split('\n');
                const nonEmptyLines = lines.filter(line => line.trim().length > 0);
                
                if (nonEmptyLines.length > 0) {
                    const minIndent = Math.min(...nonEmptyLines.map(line => {
                        const match = line.match(/^(\s*)/);
                        return match ? match[1].length : 0;
                    }));
                    
                    const normalizedLines = lines.map(line => {
                        if (line.trim().length === 0) return line;
                        return line.substring(minIndent);
                    });
                    
                    cleanCode = normalizedLines.join('\n').replace(/^\n+|\n+$/g, '');
                }
                codeBlocks.push(`<div class="code-container relative mb-6">
<button onclick="copyCode(this)" class="copy-button">Kopiera</button>
<pre class="theme-codeblock p-4 rounded-lg overflow-x-auto">
<code class="${langClass} font-mono">${this.escapeHtml(cleanCode)}</code>
</pre>
</div>`);
            }
            return `___CODE_BLOCK_${index}___`;
        });

        // Headers (process from most specific to least specific)
    html = html.replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold theme-text-heading mb-3 mt-5">$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold theme-text-heading mb-4 mt-6">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold theme-text-heading mb-6 mt-8">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold theme-text-heading mb-8 mt-8">$1</h1>');

        // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

        // Images - ![alt text](image path)
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
            // Handle relative image paths
            const imagePath = src.startsWith('http') ? src : src;
            return `<div class="text-center my-6">
                <img src="${imagePath}" alt="${alt}" 
                     class="max-w-full h-auto rounded-lg shadow-md border theme-image-border mx-auto hover:shadow-lg transition-shadow duration-300">
                ${alt ? `<p class="text-sm caption mt-2 italic">${alt}</p>` : ''}
            </div>`;
        });

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="theme-link">$1</a>');

        // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="theme-inline-code px-2 py-1 rounded text-sm font-mono">$1</code>');

        // Tables - more robust approach using line-by-line processing
        const lines = html.split('\n');
        const processedLines = [];
        let i = 0;
        
        while (i < lines.length) {
            const line = lines[i];
            
            // Check if this line starts a table (contains | characters)
            if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
                const tableLines = [];
                let j = i;
                
                // Collect all table lines
                while (j < lines.length && lines[j].trim().startsWith('|') && lines[j].trim().endsWith('|')) {
                    tableLines.push(lines[j]);
                    j++;
                }
                
                // Check if we have at least 3 lines (header, separator, data)
                if (tableLines.length >= 3) {
                    // Check if second line is a separator (contains dashes)
                    const separatorLine = tableLines[1];
                    if (separatorLine.includes('-') && separatorLine.includes('|')) {
                        // Process the table - handle escaped pipes
                        const headerCells = tableLines[0].replace(/\\\|/g, '&#124;').split('|').map(cell => cell.trim()).filter(cell => cell);
                        const dataRows = tableLines.slice(2).map(row => 
                            row.replace(/\\\|/g, '&#124;').split('|').map(cell => cell.trim()).filter(cell => cell)
                        );
                        
                        let tableHtml = '<div class="overflow-x-auto mb-6"><table class="w-full border-collapse theme-table">';
                        tableHtml += '<thead class="theme-table-head"><tr>';
                        headerCells.forEach(cell => {
                            tableHtml += `<th class="theme-table-th">${cell}</th>`;
                        });
                        tableHtml += '</tr></thead><tbody>';
                        
                        dataRows.forEach(row => {
                            if (row.length > 0) {
                                tableHtml += '<tr>';
                                row.forEach((cell, index) => {
                                    if (index < headerCells.length) {
                                        tableHtml += `<td class="theme-table-td">${cell}</td>`;
                                    }
                                });
                                tableHtml += '</tr>';
                            }
                        });
                        
                        tableHtml += '</tbody></table></div>';
                        processedLines.push(tableHtml);
                        i = j; // Skip the processed table lines
                        continue;
                    }
                }
            }
            
            processedLines.push(line);
            i++;
        }
        
        html = processedLines.join('\n');

        // Blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote class="theme-blockquote italic mb-4">$1<\/blockquote>');

        // Lists - handle unordered (-, *) and ordered (1., 2.) items
        // Unordered list items
    html = html.replace(/^\s*[-*] (.+)$/gm, '<li data-ul="1" class="theme-list-item mb-2">$1<\/li>');

        // Ordered list items (supports 1. item or 1) item)
    html = html.replace(/^\s*\d+[\.)] (.+)$/gm, '<li data-ol="1" class="theme-list-item mb-2">$1<\/li>');

        // Wrap consecutive unordered list items in <ul>
        html = html.replace(/(<li[^>]*data-ul="1"[^>]*>[\s\S]*?<\/li>(?:\s*<li[^>]*data-ul="1"[^>]*>[\s\S]*?<\/li>)*)/g, (match) => {
            return `<ul class="theme-ul space-y-2 mb-6 ml-4">${match}<\/ul>`;
        });

        // Wrap consecutive ordered list items in <ol>
        html = html.replace(/(<li[^>]*data-ol="1"[^>]*>[\s\S]*?<\/li>(?:\s*<li[^>]*data-ol="1"[^>]*>[\s\S]*?<\/li>)*)/g, (match) => {
            return `<ol class="theme-ol space-y-2 mb-6 ml-4">${match}<\/ol>`;
        });

    // Ensure content after a list starts a new paragraph
    html = html.replace(/(<\/ul>|<\/ol>)(\s*)(?=\S)/g, '$1\n\n');

    // Handle emoji and special formatting
           html = html.replace(/^(\*.*?\*)$/gm, '<p class="theme-caption italic mb-4">$1</p>');

        // Convert line breaks to paragraphs
        html = html.split('\n\n').map(paragraph => {
            paragraph = paragraph.trim();
            if (paragraph && 
                !paragraph.includes('<h') && 
                !paragraph.includes('<div') && 
                !paragraph.includes('<ul') && 
                !paragraph.includes('<ol') && 
                !paragraph.includes('<blockquote') &&
                !paragraph.includes('___CODE_BLOCK_')) {
                return `<p class="theme-paragraph mb-4 leading-relaxed">${paragraph}</p>`;
            }
            return paragraph;
        }).join('\n');

        // Restore code blocks
        codeBlocks.forEach((codeBlock, index) => {
            html = html.replace(`___CODE_BLOCK_${index}___`, codeBlock);
        });

        return html;
    }

    /**
     * Remove specific sections from markdown before rendering
     * Currently: For variabler.md, remove the section starting at
     * H2 'Inlämningsuppgift: Berättelse' until the next H2/H1 or EOF
     */
    filterSections(markdown, pageName) {
        try {
            if (pageName === 'variabler') {
                const startRegex = /^##\s*Inlämningsuppgift:\s*Berättelse.*$/im; // find the H2 line
                const startMatch = startRegex.exec(markdown);
                if (startMatch) {
                    const startIdx = startMatch.index;
                    // Find next top-level heading (## or #) after the match end
                    const searchFrom = startIdx + startMatch[0].length;
                    const rest = markdown.slice(searchFrom);
                    const nextHeadingRegex = /^##\s+|^#\s+/m;
                    const nextIdxInRest = rest.search(nextHeadingRegex);
                    const endIdx = nextIdxInRest === -1 ? markdown.length : searchFrom + nextIdxInRest;
                    const removedLen = endIdx - startIdx;
                    markdown = markdown.slice(0, startIdx) + markdown.slice(endIdx);
                    console.log(`Stripped 'Inlämningsuppgift: Berättelse' section (${removedLen} chars).`);
                }
            }
        } catch (e) {
            console.warn('filterSections failed:', e);
        }
        return markdown;
    }

    /**
     * Escape HTML characters
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Strip only leading and trailing newlines, preserving leading spaces
     * inside the first/last lines. This prevents wiping first-line indentation
     * before we run common-indent normalization.
     */
    stripBoundaryNewlines(text) {
        if (typeof text !== 'string') return text;
        return text.replace(/^\n+|\n+$/g, '');
    }

    /**
     * Basic markdown to HTML conversion (fallback)
     */
    basicMarkdownToHtml(markdown) {
        let html = markdown
            // Headers (process from most specific to least specific)
            .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold theme-text-heading mb-3 mt-5">$1</h4>')
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold theme-text-heading mb-4 mt-6">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold theme-text-heading mb-6 mt-8">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold theme-text-heading mb-8">$1</h1>')
            
            // Code blocks
            .replace(/```java\n([\s\S]*?)\n```/g, '<div class="code-container relative mb-6"><button onclick="copyCode(this)" class="copy-button">Kopiera</button><pre class="theme-codeblock p-4 rounded-lg overflow-x-auto"><code class="language-java">$1</code></pre></div>')
            .replace(/```(.*?)\n([\s\S]*?)\n```/g, '<div class="code-container relative mb-6"><button onclick="copyCode(this)" class="copy-button">Kopiera</button><pre class="theme-codeblock p-4 rounded-lg overflow-x-auto"><code class="language-$1">$2</code></pre></div>')
            .replace(/```\n([\s\S]*?)\n```/g, '<div class="code-container relative mb-6"><button onclick="copyCode(this)" class="copy-button">Kopiera</button><pre class="theme-codeblock p-4 rounded-lg overflow-x-auto"><code>$1</code></pre></div>')
            
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="theme-inline-code">$1</code>')
            
            // Bold and italic
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            
            // Tables
            .replace(/\|(.+)\|\n\|[-\s|]+\|\n((?:\|.+\|\n?)*)/g, (match, header, rows) => {
                const headerCells = header.split('|').map(cell => cell.trim()).filter(cell => cell);
                const rowsArray = rows.trim().split('\n').map(row => 
                    row.split('|').map(cell => cell.trim()).filter(cell => cell)
                );
                
                let tableHtml = '<div class="overflow-x-auto mb-6"><table class="w-full border-collapse theme-table">';
                tableHtml += '<thead class="theme-table-head"><tr>';
                headerCells.forEach(cell => {
                    tableHtml += `<th class="theme-table-th">${cell}</th>`;
                });
                tableHtml += '</tr></thead><tbody>';
                
                rowsArray.forEach(row => {
                    tableHtml += '<tr>';
                    row.forEach(cell => {
                        tableHtml += `<td class="theme-table-td">${cell}</td>`;
                    });
                    tableHtml += '</tr>';
                });
                
                tableHtml += '</tbody></table></div>';
                return tableHtml;
            })
            
            // Lists
            .replace(/^\* (.+)$/gm, '<li class="mb-2">$1</li>')
            .replace(/^- (.+)$/gm, '<li class="mb-2">$1</li>')
            
            // Blockquotes
            .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 p-4 italic mb-4">$1</blockquote>')
            
            // Paragraphs
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/^\*(.+?)\*$/gm, '<p class="caption italic mb-4">$1</p>');

        // Wrap in paragraphs and handle lists
        html = '<p class="mb-4">' + html + '</p>';
        html = html.replace(/(<li class="mb-2">.*?<\/li>)/gs, '<ul class="list-disc list-inside space-y-2 mb-6">$1</ul>');
        html = html.replace(/<\/li><li class="mb-2">/g, '</li><li class="mb-2">');

        return html;
    }

    /**
     * Add copy buttons to code blocks
     */
    addCopyButtons(html) {
        // Replace code blocks with copy button containers
        return html.replace(/<div class="code-container relative mb-6"><pre([^>]*)><code([^>]*)>/g, 
            '<div class="code-container relative mb-6"><button onclick="copyCode(this)" class="copy-button">Kopiera</button><pre$1><code$2>');
    }

    /**
     * Update page meta information
     */
    updatePageMeta(pageName) {
        const titles = {
            'variabler': 'Programmering 1 - Variabler',
            'utskrifter': 'Programmering 1 - Utskrifter',
            'ifsatser': 'Programmering 1 - If-satser',
            'loopar': 'Programmering 1 - Loopar',
            'arrays': 'Programmering 1 - Arrays'
        };

        if (titles[pageName]) {
            document.title = titles[pageName];
        }
    }

    /**
     * Render page header
     */
    renderPageHeader(pageName) {
        const headers = {
            'variabler': `
                <div class="hero-gradient rounded-2xl p-12 mb-12">
                    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div class="text-center lg:text-left lg:flex-1">
                            <h1 class="text-4xl font-bold mb-4">🧠 Variabler </h1>
                            <p class="text-xl mb-6">Lär dig lagra och manipulera data i Java</p>
                            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <span class="badge">int, String, double</span>
                                <span class="badge">Scanner</span>
                                <span class="badge">Datalagring</span>
                            </div>
                        </div>
                        <div class="lg:flex-shrink-0">
                            <div class="w-64 h-48 hero-box rounded-lg flex items-center justify-center">
                                <span class="text-6xl">🧠</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'utskrifter': `
                <div class="hero-gradient rounded-2xl p-12 mb-12">
                    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div class="text-center lg:text-left lg:flex-1">
                            <h1 class="text-4xl font-bold mb-4">📺 Utskrifter i Java</h1>
                            <p class="text-xl mb-6">Kommunicera med användaren genom text och grafik</p>
                            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <span class="badge">System.out.println()</span>
                                <span class="badge">Unicode</span>
                                <span class="badge">Formatering</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            `,
            'ifsatser': `
                <div class="hero-gradient rounded-2xl p-12 mb-12">
                    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div class="text-center lg:text-left lg:flex-1">
                            <h1 class="text-4xl font-bold mb-4">🔀 If-satser</h1>
                            <p class="text-xl mb-6">Lär dig få programmet att välja mellan olika alternativ</p>
                            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <span class="badge">if-else</span>
                                <span class="badge">Villkor</span>
                                <span class="badge">Relationsoperatorer</span>
                            </div>
                        </div>
                        <div class="lg:flex-shrink-0">
                            <div class="w-64 h-48 hero-box rounded-lg flex items-center justify-center">
                                <span class="text-6xl" aria-hidden="true">🔀</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'loopar': `
                <div class="hero-gradient rounded-2xl p-12 mb-12">
                    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div class="text-center lg:text-left lg:flex-1">
                            <h1 class="text-4xl font-bold mb-4">🔄 Loopar</h1>
                            <p class="text-xl mb-6">Upprepa kod effektivt med for, while och do-while</p>
                            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <span class="badge">for-loop</span>
                                <span class="badge">while & do-while</span>
                                <span class="badge">Nästlade loopar</span>
                            </div>
                        </div>
                        <div class="lg:flex-shrink-0">
                            <div class="w-64 h-48 hero-box rounded-lg flex items-center justify-center">
                                <span class="text-6xl">🔄</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'arrays': `
                <div class="hero-gradient rounded-2xl p-12 mb-12">
                    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div class="text-center lg:text-left lg:flex-1">
                            <h1 class="text-4xl font-bold mb-4">📊 Arrays</h1>
                            <p class="text-xl mb-6">Lagra och hantera samlingar av data effektivt</p>
                            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <span class="badge">Array-deklaration</span>
                                <span class="badge">Index & length</span>
                                <span class="badge">Sortering</span>
                            </div>
                        </div>
                        <div class="lg:flex-shrink-0">
                            <div class="w-64 h-48 hero-box rounded-lg flex items-center justify-center">
                                <span class="text-6xl">📊</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };

        return headers[pageName] || '';
    }

    /**
     * Render navigation
     */
    renderNavigation(currentPage) {
        const pages = [
            { name: 'utskrifter', title: 'Utskrifter', emoji: '📺', color: 'green' },
            { name: 'variabler', title: 'Variabler', emoji: '🧠', color: 'orange' },
            { name: 'ifsatser', title: 'If-satser', emoji: '🔀', color: 'orange' },
            { name: 'loopar', title: 'Loopar', emoji: '🔄', color: 'indigo' },
            { name: 'arrays', title: 'Arrays', emoji: '📊', color: 'teal' }
        ];

        let nav = '<nav class="flex flex-wrap justify-center gap-4 mb-8">';
        pages.forEach(page => {
            const isActive = page.name === currentPage;
            const classes = isActive ? 'nav-link nav-link--active' : 'nav-link';
            nav += `
                <a href="${page.name}.html" 
                   class="${classes} px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                    <span>${page.emoji}</span>
                    <span>${page.title}</span>
                </a>`;
        });
        nav += '</nav>';
        return nav;
    }

    /**
     * Render footer links
     */
    renderFooterLinks(currentPage) {
        const pages = [
            { name: 'utskrifter', title: 'Utskrifter', color: 'green' },
            { name: 'variabler', title: 'Variabler', color: 'orange' },
            { name: 'ifsatser', title: 'If-satser', color: 'orange' },
            { name: 'loopar', title: 'Loopar', color: 'indigo' },
            { name: 'arrays', title: 'Arrays', color: 'teal' }
        ];

        let links = [];
        pages.forEach(page => {
            if (page.name !== currentPage) {
                links.push(`<a href="${page.name}.html" class="theme-link">${page.title}</a>`);
            }
        });

    return links.join('<span class="caption mx-2">•</span>');
    }

    /**
     * Render video panel content
     */
    renderVideoPanel(pageName) {
        const videoContent = {
            'variabler': `
                <div class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 8 - Variabler som koncept</h4>
                            <button onclick="toggleDescription('desc8')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow8" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc8" class="hidden text-gray-800 text-sm mb-3">I denna video pratar jag och visar exempel på programmeringens kanske viktigaste byggsten. Förhoppningen med denna video är att det skall bli lättare att förstå varför vi använder oss av Variablar inom programmering.</div>
                        <a href="https://www.youtube.com/watch?v=4VXf87Xi7Wc&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=8" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/4VXf87Xi7Wc/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2">
                                        <span class="text-xl">🎬</span>
                                        <span>Titta på videon</span>
                                    </div>
                                    <div class="text-xs opacity-75">YouTube - Variabler del 8</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 9 - Variabler och hur man skapar och använder dem</h4>
                            <button onclick="toggleDescription('desc9')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow9" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc9" class="hidden text-gray-800 text-sm mb-3">I denna video bygger jag vidare på konceptet Variabler och visar hur man skapar dessa med kod, och sedan använder sig av dem.</div>
                        <a href="https://www.youtube.com/watch?v=wwhqgfw_gYE&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=9" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/wwhqgfw_gYE/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Variabler del 9</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 10 - Variabler och Scanner</h4>
                            <button onclick="toggleDescription('desc10')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow10" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc10" class="hidden text-gray-800 text-sm mb-3">I denna video försöker jag knyta ihop 3 koncept som jag har gått igenom i videorna innan och visar hur allt hänger ihop. Variabler, Scanner, och System.out.Println</div>
                        <a href="https://www.youtube.com/watch?v=ReIa3r_b2z4&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=10" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/ReIa3r_b2z4/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Variabler del 10</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 11 - Projekt 1 Berättelsen</h4>
                            <button onclick="toggleDescription('desc11')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow11" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc11" class="hidden text-gray-800 text-sm mb-3">I denna video summerar jag videorna 1 - 10 i detta projektet och visar hur alla bitar samarbetar och hur man med denna kunskap kan skapa något mindre program som faktiskt gör något.</div>
                        <a href="https://www.youtube.com/watch?v=2Pse_BAay04&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=11" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/2Pse_BAay04/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Berättelse del 11</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `,
            'ifsatser': `
                <div class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 12 - Operatörer</h4>
                            <button onclick="toggleDescription('desc12')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow12" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc12" class="hidden text-gray-800 text-sm mb-3">I denna går jag igenom vad Operatörer inom programmering är för något. Operatörer finns i så gott som alla programmeringsspråk och tecknen vi använder oss av skiljer sig ofta inte så mycket. Så har man förstått dessa i ett språk kan man använda samma koncept i andra programmeringsspråk.</div>
                        <a href="https://www.youtube.com/watch?v=P4-O5PUDsPA&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=12&t=4s" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/P4-O5PUDsPA/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Operatörer del 12</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 13 - IfSatser</h4>
                            <button onclick="toggleDescription('desc13')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow13" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc13" class="hidden text-gray-800 text-sm mb-3">Ibland behöver våran kod kunna ta olika vägar för att kunna avgöra vad den skall eller inte skall göra. För detta använder vi If-Satser. I denna videon går jag igenom vad If-Satser är för något och hur vi skriver dessa i Java.</div>
                        <a href="https://www.youtube.com/watch?v=FQ5pAWibG7w&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=13" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/FQ5pAWibG7w/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - IfSatser del 13</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 14 - Projekt Frågesport</h4>
                            <button onclick="toggleDescription('desc14')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow14" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc14" class="hidden text-gray-800 text-sm mb-3">Efter att vi har lärt oss om If-Satser kan vi skapa ett frågesports spel till oss själv eller till någon annan. I denna video visar jag hur man skulle kunna skapa ett sådant i Java.</div>
                        <a href="https://www.youtube.com/watch?v=jDcItHE5ABE&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=14" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/jDcItHE5ABE/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Projekt Frågesport del 14</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 15 - Filstruktur Studieteknik och Backup</h4>
                            <button onclick="toggleDescription('desc15')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow15" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc15" class="hidden text-gray-800 text-sm mb-3">Att ha koll på sina filer när man jobbar med datorer är oerhört viktigt. För oss som programmerar är det extra viktigt då vi inte har råd med att ha det stökigt vi måste ha ordning och struktur på våra filer och våran kod. I denna videon går jag igenom hur man bör tänka när man arbetar med kod/filer på sin dator.</div>
                        <a href="https://www.youtube.com/watch?v=Nxk_6SbF5HE&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=15" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/Nxk_6SbF5HE/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Filstruktur Studieteknik och Backup del 15</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `,
            'utskrifter': `
                <div class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 1 - Introduktion</h4>
                            <button onclick="toggleDescription('desc1')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow1" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc1" class="hidden text-gray-800 text-sm mb-3">I denna video presenterar jag mig själv och vad tanken med dessa videos är. Om ni ser något i någon av de videos som jag skapat som är konstigt eller fel får ni gärna kommentera videon. </div>
                        <a href="https://www.youtube.com/watch?v=2KLolyXLdVk&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=1" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/2KLolyXLdVk/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 1</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 2 - Installation av IntelliJ</h4>
                            <button onclick="toggleDescription('desc2')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow2" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc2" class="hidden text-gray-800 text-sm mb-3">I denna video går jag igenom Intellij som är en IDE för att skriva Java kod. Jag visar hur man installerar Intellij och pratar lite om programmet.</div>
                        <a href="https://www.youtube.com/watch?v=oV_fPt2FXcg&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=2" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/oV_fPt2FXcg/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 2</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 3 - Genomgång av IntelliJ</h4>
                            <button onclick="toggleDescription('desc3')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow3" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc3" class="hidden text-gray-800 text-sm mb-3">I denna Video går jag igenom de olika fönstren man kan hitta i IntelliJ och förklarar deras användningsområden.</div>
                        <a href="https://www.youtube.com/watch?v=RcYz60rj5Q4&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=3" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/RcYz60rj5Q4/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 3</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 4 - Genomgång av Koden i startprojektet</h4>
                            <button onclick="toggleDescription('desc4')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow4" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc4" class="hidden text-gray-800 text-sm mb-3">I denna video går jag igenom den kod vi ser framför oss i IntelliJ när vi har bett IntelliJ generera lite samplekod.</div>
                        <a href="https://www.youtube.com/watch?v=3Po3tLIP1o4&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=4" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/3Po3tLIP1o4/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 4</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 5 - Att Skriva ut text i Consolen</h4>
                            <button onclick="toggleDescription('desc5')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow5" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc5" class="hidden text-gray-800 text-sm mb-3">I denna Video går jag igenom olika sätt att skriva ut Nummer och text i terminal fönstret i IntelliJ.</div>
                        <a href="https://www.youtube.com/watch?v=CN8L23L3_Wk&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=5" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/CN8L23L3_Wk/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 5</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 6 - Att Skriva in text till Consolen</h4>
                            <button onclick="toggleDescription('desc6')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow6" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc6" class="hidden text-gray-800 text-sm mb-3">Om man vill kunna mata in text till terminalen i Java måste man använda sig av något som heter Scanner. I denna video går jag igenom vad Scanner är för något och hur man använder sig av denna.</div>
                        <a href="https://www.youtube.com/watch?v=lC70-P36NNE&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=6" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/lC70-P36NNE/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 6</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 7 - Kommentarer i kod</h4>
                            <button onclick="toggleDescription('desc7')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow7" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc7" class="hidden text-gray-800 text-sm mb-3">Att kommentera den kod man skriver kan ofta vara en bra sak. I denna video går jag igenom hur man skriver kommentarer och deras vanligaste syfte.</div>
                        <a href="https://www.youtube.com/watch?v=n7hRQ3qT92Q&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=7" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/n7hRQ3qT92Q/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 7</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `,
            'loopar': `
                <div class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 16 - While Loopen</h4>
                            <button onclick="toggleDescription('desc16')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow16" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc16" class="hidden text-gray-800 text-sm mb-3">Det som är det fina med datorer är att de är oerhört duktiga på att göra saker flera gånger. För att få en datorer att göra något flera gånger med kod använder vi olika loopar! I denna videon går jag igenom While loopen.</div>
                        <a href="https://www.youtube.com/watch?v=oA_3B3dt98U&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=16" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/oA_3B3dt98U/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - While Loopen del 16</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 17 - ForLoopen</h4>
                            <button onclick="toggleDescription('desc17')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow17" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc17" class="hidden text-gray-800 text-sm mb-3">Om man vill göra något ett visst antal gånger fungerar For-Loopen väldigt bra i denna video går jag igenom denna.</div>
                        <a href="https://www.youtube.com/watch?v=oTTjI2QyOxo&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=17" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/oTTjI2QyOxo/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - ForLoopen del 17</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 18 - Nästlade IfSatser och Loopar</h4>
                            <button onclick="toggleDescription('desc18')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow18" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc18" class="hidden text-gray-800 text-sm mb-3">Loopar inuti Loopar, If satser inuti Ifsatser, Kod inuti kod osv, detta är lite som filmen Matrix eller filmen inception. I denna video går jag igenom konceptet saker inuti saker inom programmering.</div>
                        <a href="https://www.youtube.com/watch?v=ED7G1VK9CUc&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=18" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/ED7G1VK9CUc/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Nästlade IfSatser och Loopar del 18</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 19 - Random</h4>
                            <button onclick="toggleDescription('desc19')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow19" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc19" class="hidden text-gray-800 text-sm mb-3">Det finn en del intressanta saker man kan göra med Slumpen, Casino och spel har använt sig av detta under lång tid. I denna video visar jag hur ni kan använda er av detta i er egen kod.</div>
                        <a href="https://www.youtube.com/watch?v=5bpNAb0Ki9o&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=19" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/5bpNAb0Ki9o/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Random del 19</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `,
            'arrays': `
                <div class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-gray-900">Vid 20 - Arrays</h4>
                            <button onclick="toggleDescription('desc20')" class="text-gray-600 hover:text-gray-800 transition-colors">
                                <svg id="arrow20" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc20" class="hidden text-gray-800 text-sm mb-3">Om en Variabel är en Låda. Då är Arrays Flera lådor. I denna video går jag igenom Arrays och vad dessa kan vara bra för.</div>
                        <a href="https://www.youtube.com/watch?v=tBhKaD2lGHQ&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=20" 
                           target="_blank" 
                           class="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/tBhKaD2lGHQ/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-20 h-15 rounded object-cover video-thumbnail">
                                <div>
                                    <div class="font-medium text-base flex items-center gap-2"><span class="text-xl">🎬</span><span>Titta på videon</span></div>
                                    <div class="text-xs opacity-75">YouTube - Arrays del 20</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `
        };

    return videoContent[pageName] || '<p class="caption">Inget videoinnehåll tillgängligt.</p>';
    }
}

// Create global instance
window.markdownLoader = new MarkdownLoader();

// Function to toggle video descriptions
function toggleDescription(descId) {
    const description = document.getElementById(descId);
    const arrowId = descId.replace('desc', 'arrow');
    const arrow = document.getElementById(arrowId);
    
    if (description.classList.contains('hidden')) {
        description.classList.remove('hidden');
        arrow.style.transform = 'rotate(180deg)';
    } else {
        description.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Add CSS for gradients and terminal styling (kept small and local)
const style = document.createElement('style');
style.textContent = `
    /* Responsive container improvements */
    .container {
        max-width: 100% !important;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    @media (min-width: 640px) {
        .container {
            padding-left: 2rem;
            padding-right: 2rem;
        }
    }
    
    @media (min-width: 768px) {
        .container {
            padding-left: 3rem;
            padding-right: 3rem;
        }
    }
    
    @media (min-width: 1024px) {
        .container {
            padding-left: 4rem;
            padding-right: 4rem;
        }
    }
    
    @media (min-width: 1280px) {
        .container {
            padding-left: 6rem;
            padding-right: 6rem;
        }
    }
    
    @media (min-width: 1536px) {
        .container {
            padding-left: 8rem;
            padding-right: 8rem;
        }
    }
    
    /* Responsive video panel */
    #videoPanel {
        width: 100%;
        max-width: 400px;
    }
    
    @media (min-width: 640px) {
        #videoPanel {
            width: 320px;
        }
    }
    
    @media (min-width: 768px) {
        #videoPanel {
            width: 360px;
        }
    }
    
    @media (min-width: 1024px) {
        #videoPanel {
            width: 400px;
        }
    }
    
    /* Responsive hero sections */
    .hero-gradient-blue, .hero-gradient-purple, .hero-gradient-green, .hero-gradient-orange, .hero-gradient-indigo, .hero-gradient-teal {
        padding: 2rem 1rem;
    }
    
    @media (min-width: 640px) {
        .hero-gradient-blue, .hero-gradient-purple, .hero-gradient-green, .hero-gradient-orange, .hero-gradient-indigo, .hero-gradient-teal {
            padding: 3rem 2rem;
        }
    }
    
    @media (min-width: 768px) {
        .hero-gradient-blue, .hero-gradient-purple, .hero-gradient-green, .hero-gradient-orange, .hero-gradient-indigo, .hero-gradient-teal {
            padding: 4rem 3rem;
        }
    }
    
    @media (min-width: 1024px) {
        .hero-gradient-blue, .hero-gradient-purple, .hero-gradient-green, .hero-gradient-orange, .hero-gradient-indigo, .hero-gradient-teal {
            padding: 6rem 4rem;
        }
    }
    
    /* Responsive text sizes */
    h1 {
        font-size: 1.875rem;
        line-height: 2.25rem;
    }
    
    @media (min-width: 640px) {
        h1 {
            font-size: 2.25rem;
            line-height: 2.5rem;
        }
    }
    
    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
            line-height: 1;
        }
    }
    
    h2 {
        font-size: 1.5rem;
        line-height: 2rem;
    }
    
    @media (min-width: 640px) {
        h2 {
            font-size: 1.875rem;
            line-height: 2.25rem;
        }
    }
    
    @media (min-width: 768px) {
        h2 {
            font-size: 2.25rem;
            line-height: 2.5rem;
        }
    }
    
    h3 {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
    
    @media (min-width: 640px) {
        h3 {
            font-size: 1.5rem;
            line-height: 2rem;
        }
    }
    
    h4 {
        font-size: 1.125rem;
        line-height: 1.5rem;
    }
    
    @media (min-width: 640px) {
        h4 {
            font-size: 1.25rem;
            line-height: 1.75rem;
        }
    }
    
    /* Responsive code blocks */
    pre {
        font-size: 0.75rem;
        padding: 0.75rem;
    }
    
    @media (min-width: 640px) {
        pre {
            font-size: 0.875rem;
            padding: 1rem;
        }
    }
    
    @media (min-width: 768px) {
        pre {
            font-size: 0.875rem;
            padding: 1.25rem;
        }
    }
    
    /* Responsive tables */
    .overflow-x-auto {
        margin-left: -1rem;
        margin-right: -1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    @media (min-width: 640px) {
        .overflow-x-auto {
            margin-left: 0;
            margin-right: 0;
            padding-left: 0;
            padding-right: 0;
        }
    }
    
    /* Responsive demo grid */
    .demo-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    @media (min-width: 1024px) {
        .demo-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
    }
    
    /* Responsive images */
    img {
        max-width: 100%;
        height: auto;
    }
    
    /* Responsive navigation */
    nav {
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    @media (min-width: 640px) {
        nav {
            gap: 1rem;
        }
    }
    
    /* Responsive spacing */
    .space-y-8 > * + * {
        margin-top: 1.5rem;
    }
    
    @media (min-width: 640px) {
        .space-y-8 > * + * {
            margin-top: 2rem;
        }
    }
    
    @media (min-width: 768px) {
        .space-y-8 > * + * {
            margin-top: 2.5rem;
        }
    }
    
    @media (min-width: 1024px) {
        .space-y-8 > * + * {
            margin-top: 3rem;
        }
    }
    
    .hero-gradient-blue { background: linear-gradient(135deg, var(--c1-10), var(--c2-10)); }
    .hero-gradient-purple { background: linear-gradient(135deg, var(--c2-10), var(--c3-10)); }
    .hero-gradient-green { background: linear-gradient(135deg, var(--c2-10), var(--c3-10)); }
    .hero-gradient-orange { background: linear-gradient(135deg, var(--c4-10), var(--c5-10)); }
    .hero-gradient-indigo { background: linear-gradient(135deg, var(--c1-10), var(--c5-10)); }
    .hero-gradient-teal { background: linear-gradient(135deg, var(--c1-10), var(--c2-10)); }
    
    /* Terminal styling */
    .demo-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        align-items: stretch;
    }
    
    @media (max-width: 1024px) {
        .demo-grid {
            grid-template-columns: 1fr;
        }
    }
    
    .terminal-container { background: var(--c1-10); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid var(--c1); }
    .terminal-header { background: var(--c1-20); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--c1); }
    .terminal-buttons { display: flex; gap: 6px; }
    .terminal-button { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .terminal-button.close { background: var(--c5); }
    .terminal-button.minimize { background: var(--c4); }
    .terminal-button.maximize { background: var(--c3); }
    .terminal-title { color: #000; font-size: 12px; font-family: 'SF Mono', 'Monaco', 'Consolas', monospace; }
    .terminal-body { padding: 16px; background: var(--c1-10); min-height: 120px; }
    .terminal-output { color: #000; font-family: 'SF Mono', 'Monaco', 'Consolas', monospace; font-size: 14px; line-height: 1.5; margin: 0; white-space: pre-wrap; word-wrap: break-word; }
    .terminal-output::before { content: "> "; color: #000; }
    
    /* Ensure code blocks have no unwanted indentation */
    .code-container pre {
        margin: 0;
        padding: 1rem;
    }
    
    .code-container code {
        display: block;
        white-space: pre;
        font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
    }
`;
document.head.appendChild(style);
