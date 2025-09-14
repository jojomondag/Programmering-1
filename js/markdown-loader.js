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
            
            const markdownText = await response.text();
            console.log(`Loaded ${markdownText.length} characters from ${filename}.md`);
            
            // Render using built-in function
            const htmlContent = this.markdownToHtml(markdownText);
            
            // Cache the result
            this.cache.set(filename, htmlContent);
            console.log(`Cached and returning content for: ${filename}`);
            
            return htmlContent;
        } catch (error) {
            console.error('Error loading markdown content:', error);
            return `<div class="bg-red-50 border-l-4 border-red-500 p-4">
                <p class="text-red-800">Kunde inte ladda innehåll från ${filename}.md</p>
                <p class="text-red-600 text-sm mt-1">Fel: ${error.message}</p>
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
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto h-full">
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
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code class="${langClass} font-mono">${this.escapeHtml(cleanCode)}</code>
</pre>
</div>`);
            }
            return `___CODE_BLOCK_${index}___`;
        });

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mb-4 mt-6">$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-6 mt-8">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-8 mt-8">$1</h1>');

        // Bold and italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>');

        // Images - ![alt text](image path)
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
            // Handle relative image paths
            const imagePath = src.startsWith('http') ? src : src;
            return `<div class="text-center my-6">
                <img src="${imagePath}" alt="${alt}" 
                     class="max-w-full h-auto rounded-lg shadow-md border border-gray-200 mx-auto hover:shadow-lg transition-shadow duration-300">
                ${alt ? `<p class="text-sm text-gray-600 mt-2 italic">${alt}</p>` : ''}
            </div>`;
        });

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>');

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
                        // Process the table
                        const headerCells = tableLines[0].split('|').map(cell => cell.trim()).filter(cell => cell);
                        const dataRows = tableLines.slice(2).map(row => 
                            row.split('|').map(cell => cell.trim()).filter(cell => cell)
                        );
                        
                        let tableHtml = '<div class="overflow-x-auto mb-6"><table class="w-full border-collapse border border-gray-300">';
                        tableHtml += '<thead class="bg-gray-50"><tr>';
                        headerCells.forEach(cell => {
                            tableHtml += `<th class="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">${cell}</th>`;
                        });
                        tableHtml += '</tr></thead><tbody>';
                        
                        dataRows.forEach(row => {
                            if (row.length > 0) {
                                tableHtml += '<tr>';
                                row.forEach((cell, index) => {
                                    if (index < headerCells.length) {
                                        tableHtml += `<td class="border border-gray-300 px-4 py-2 text-gray-700">${cell}</td>`;
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
        html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-yellow-400 bg-yellow-50 p-4 italic mb-4 text-gray-700">$1</blockquote>');

        // Lists - handle unordered (-, *) and ordered (1., 2.) items
        // Unordered list items
        html = html.replace(/^\s*[-*] (.+)$/gm, '<li data-ul="1" class="text-gray-700 mb-2">$1<\/li>');

        // Ordered list items (supports 1. item or 1) item)
        html = html.replace(/^\s*\d+[\.)] (.+)$/gm, '<li data-ol="1" class="text-gray-700 mb-2">$1<\/li>');

        // Wrap consecutive unordered list items in <ul>
        html = html.replace(/(<li[^>]*data-ul="1"[^>]*>[\s\S]*?<\/li>(?:\s*<li[^>]*data-ul="1"[^>]*>[\s\S]*?<\/li>)*)/g, (match) => {
            return `<ul class="list-disc list-inside space-y-2 mb-6 ml-4">${match}<\/ul>`;
        });

        // Wrap consecutive ordered list items in <ol>
        html = html.replace(/(<li[^>]*data-ol="1"[^>]*>[\s\S]*?<\/li>(?:\s*<li[^>]*data-ol="1"[^>]*>[\s\S]*?<\/li>)*)/g, (match) => {
            return `<ol class="list-decimal list-inside space-y-2 mb-6 ml-4">${match}<\/ol>`;
        });

    // Ensure content after a list starts a new paragraph
    html = html.replace(/(<\/ul>|<\/ol>)(\s*)(?=\S)/g, '$1\n\n');

    // Handle emoji and special formatting
        html = html.replace(/^(\*.*?\*)$/gm, '<p class="text-gray-600 italic mb-4">$1</p>');

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
                return `<p class="mb-4 text-gray-700 leading-relaxed">${paragraph}</p>`;
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
            // Headers
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mb-4 mt-6">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-6 mt-8">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-8">$1</h1>')
            
            // Code blocks
            .replace(/```java\n([\s\S]*?)\n```/g, '<div class="code-container relative mb-6"><button onclick="copyCode(this)" class="copy-button">Kopiera</button><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code class="language-java">$1</code></pre></div>')
            .replace(/```(.*?)\n([\s\S]*?)\n```/g, '<div class="code-container relative mb-6"><button onclick="copyCode(this)" class="copy-button">Kopiera</button><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code class="language-$1">$2</code></pre></div>')
            .replace(/```\n([\s\S]*?)\n```/g, '<div class="code-container relative mb-6"><button onclick="copyCode(this)" class="copy-button">Kopiera</button><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre></div>')
            
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">$1</code>')
            
            // Bold and italic
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            
            // Tables
            .replace(/\|(.+)\|\n\|[-\s|]+\|\n((?:\|.+\|\n?)*)/g, (match, header, rows) => {
                const headerCells = header.split('|').map(cell => cell.trim()).filter(cell => cell);
                const rowsArray = rows.trim().split('\n').map(row => 
                    row.split('|').map(cell => cell.trim()).filter(cell => cell)
                );
                
                let tableHtml = '<div class="overflow-x-auto mb-6"><table class="w-full border-collapse border border-gray-300">';
                tableHtml += '<thead class="bg-gray-50"><tr>';
                headerCells.forEach(cell => {
                    tableHtml += `<th class="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">${cell}</th>`;
                });
                tableHtml += '</tr></thead><tbody>';
                
                rowsArray.forEach(row => {
                    tableHtml += '<tr>';
                    row.forEach(cell => {
                        tableHtml += `<td class="border border-gray-300 px-4 py-2">${cell}</td>`;
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
            .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-yellow-400 bg-yellow-50 p-4 italic mb-4">$1</blockquote>')
            
            // Paragraphs
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/^\*(.+?)\*$/gm, '<p class="text-gray-600 italic mb-4">$1</p>');

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
            'variabler': 'Programmering 1 - Variabler / Minnesplatser',
            'utskrifter': 'Programmering 1 - Utskrifter i Java',
            'berattelse': 'Programmering 1 - Inlämningsuppgift 3: Berättelse'
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
                <div class="hero-gradient-blue text-white rounded-2xl p-12 mb-12">
                    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div class="text-center lg:text-left lg:flex-1">
                            <h1 class="text-4xl font-bold text-white mb-4">🧠 Variabler / Minnesplatser</h1>
                            <p class="text-xl text-blue-100 mb-6">Lär dig lagra och manipulera data i Java</p>
                            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <span class="bg-blue-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">int, String, double</span>
                                <span class="bg-blue-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">Scanner</span>
                                <span class="bg-blue-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">Datalagring</span>
                            </div>
                        </div>
                        <div class="lg:flex-shrink-0">
                            <div class="w-64 h-32 bg-blue-600 bg-opacity-30 rounded-lg border-4 border-white border-opacity-20 flex items-center justify-center">
                                <span class="text-6xl">🧠</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'utskrifter': `
                <div class="hero-gradient-purple text-white rounded-2xl p-12 mb-12">
                    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div class="text-center lg:text-left lg:flex-1">
                            <h1 class="text-4xl font-bold text-white mb-4">📺 Utskrifter i Java</h1>
                            <p class="text-xl text-purple-100 mb-6">Kommunicera med användaren genom text och grafik</p>
                            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <span class="bg-purple-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">System.out.println()</span>
                                <span class="bg-purple-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">Unicode</span>
                                <span class="bg-purple-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">Formatering</span>
                            </div>
                        </div>
                        <div class="lg:flex-shrink-0">
                            <img src="Images/Teckenuppsättning.png" alt="Teckenuppsättning Illustration" 
                                 class="w-64 h-auto rounded-lg shadow-lg border-4 border-white border-opacity-20 hover:scale-105 transition-transform duration-300">
                        </div>
                    </div>
                </div>
            `,
            'berattelse': `
                <div class="hero-gradient-green text-white rounded-2xl p-12 mb-12">
                    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div class="text-center lg:text-left lg:flex-1">
                            <h1 class="text-4xl font-bold text-white mb-4">📖 Inlämningsuppgift 3: Berättelse</h1>
                            <p class="text-xl text-green-100 mb-6">Skapa personliga berättelser med Scanner och variabler</p>
                            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <span class="bg-green-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">Scanner</span>
                                <span class="bg-green-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">Variabler</span>
                                <span class="bg-green-600 bg-opacity-50 px-3 py-1 rounded-full text-sm">Kreativitet</span>
                            </div>
                        </div>
                        <div class="lg:flex-shrink-0">
                            <img src="Images/Berättelse.png" alt="Berättelse Illustration" 
                                 class="w-64 h-auto rounded-lg shadow-lg border-4 border-white border-opacity-20 hover:scale-105 transition-transform duration-300">
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
            { name: 'variabler', title: 'Variabler', emoji: '🧠', color: 'blue' },
            { name: 'utskrifter', title: 'Utskrifter', emoji: '📺', color: 'purple' },
            { name: 'berattelse', title: 'Berättelse', emoji: '📖', color: 'green' }
        ];

        let nav = '<nav class="flex flex-wrap justify-center gap-4 mb-8">';
        
        pages.forEach(page => {
            const isActive = page.name === currentPage;
            const activeClass = isActive ? `bg-${page.color}-600 text-white` : `bg-white text-${page.color}-600 hover:bg-${page.color}-50`;
            nav += `
                <a href="${page.name}.html" 
                   class="${activeClass} px-6 py-3 rounded-lg font-semibold border-2 border-${page.color}-600 transition-colors flex items-center space-x-2">
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
            { name: 'variabler', title: 'Variabler', color: 'blue' },
            { name: 'utskrifter', title: 'Utskrifter', color: 'purple' },
            { name: 'berattelse', title: 'Berättelse', color: 'green' }
        ];

        let links = [];
        pages.forEach(page => {
            if (page.name !== currentPage) {
                links.push(`<a href="${page.name}.html" class="text-${page.color}-600 hover:underline">${page.title}</a>`);
            }
        });

        return links.join('<span class="text-gray-300 mx-2">•</span>');
    }

    /**
     * Render video panel content
     */
    renderVideoPanel(pageName) {
        const videoContent = {
            'variabler': `
                <div class="space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">📹 Introduktion till Variabler</h4>
                        <p class="text-blue-800 text-sm mb-3">Grundläggande koncept och syntax</p>
                        <div class="bg-blue-100 p-2 rounded text-blue-700 text-xs">
                            Videolektion kommer snart...
                        </div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">🎯 Scanner och Input</h4>
                        <p class="text-blue-800 text-sm mb-3">Läsa data från användaren</p>
                        <div class="bg-blue-100 p-2 rounded text-blue-700 text-xs">
                            Videolektion kommer snart...
                        </div>
                    </div>
                </div>
            `,
            'utskrifter': `
                <div class="space-y-4">
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-purple-900">Vid 1 - Introduktion</h4>
                            <button onclick="toggleDescription('desc1')" class="text-purple-600 hover:text-purple-800 transition-colors">
                                <svg id="arrow1" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc1" class="hidden text-purple-800 text-sm mb-3">I denna video presenterar jag mig själv och vad tanken med dessa videos är. Om ni ser något i någon av de videos som jag skapat som är konstigt eller fel får ni gärna kommentera videon. </div>
                        <a href="https://www.youtube.com/watch?v=2KLolyXLdVk&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=1" 
                           target="_blank" 
                           class="block bg-purple-100 hover:bg-purple-200 p-3 rounded text-purple-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/2KLolyXLdVk/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-16 h-12 rounded object-cover">
                                <div>
                                    <div class="font-medium">▶️ Titta på videon</div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 1</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-purple-900">Vid 2 - Installation av IntelliJ</h4>
                            <button onclick="toggleDescription('desc2')" class="text-purple-600 hover:text-purple-800 transition-colors">
                                <svg id="arrow2" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc2" class="hidden text-purple-800 text-sm mb-3">I denna video går jag igenom Intellij som är en IDE för att skriva Java kod. Jag visar hur man installerar Intellij och pratar lite om programmet.</div>
                        <a href="https://www.youtube.com/watch?v=oV_fPt2FXcg&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=2" 
                           target="_blank" 
                           class="block bg-purple-100 hover:bg-purple-200 p-3 rounded text-purple-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/oV_fPt2FXcg/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-16 h-12 rounded object-cover">
                                <div>
                                    <div class="font-medium">▶️ Titta på videon</div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 2</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-purple-900">Vid 3 - Genomgång av IntelliJ</h4>
                            <button onclick="toggleDescription('desc3')" class="text-purple-600 hover:text-purple-800 transition-colors">
                                <svg id="arrow3" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc3" class="hidden text-purple-800 text-sm mb-3">I denna Video går jag igenom de olika fönstren man kan hitta i IntelliJ och förklarar deras användningsområden.</div>
                        <a href="https://www.youtube.com/watch?v=RcYz60rj5Q4&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=3" 
                           target="_blank" 
                           class="block bg-purple-100 hover:bg-purple-200 p-3 rounded text-purple-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/RcYz60rj5Q4/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-16 h-12 rounded object-cover">
                                <div>
                                    <div class="font-medium">▶️ Titta på videon</div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 3</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-purple-900">Vid 4 - Genomgång av Koden i startprojektet</h4>
                            <button onclick="toggleDescription('desc4')" class="text-purple-600 hover:text-purple-800 transition-colors">
                                <svg id="arrow4" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc4" class="hidden text-purple-800 text-sm mb-3">I denna video går jag igenom den kod vi ser framför oss i IntelliJ när vi har bett IntelliJ generera lite samplekod.</div>
                        <a href="https://www.youtube.com/watch?v=3Po3tLIP1o4&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=4" 
                           target="_blank" 
                           class="block bg-purple-100 hover:bg-purple-200 p-3 rounded text-purple-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/3Po3tLIP1o4/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-16 h-12 rounded object-cover">
                                <div>
                                    <div class="font-medium">▶️ Titta på videon</div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 4</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-purple-900">Vid 5 - Att Skriva ut text i Consolen</h4>
                            <button onclick="toggleDescription('desc5')" class="text-purple-600 hover:text-purple-800 transition-colors">
                                <svg id="arrow5" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc5" class="hidden text-purple-800 text-sm mb-3">I denna Video går jag igenom olika sätt att skriva ut Nummer och text i terminal fönstret i IntelliJ.</div>
                        <a href="https://www.youtube.com/watch?v=CN8L23L3_Wk&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=5" 
                           target="_blank" 
                           class="block bg-purple-100 hover:bg-purple-200 p-3 rounded text-purple-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/CN8L23L3_Wk/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-16 h-12 rounded object-cover">
                                <div>
                                    <div class="font-medium">▶️ Titta på videon</div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 5</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-purple-900">Vid 6 - Att Skriva in text till Consolen</h4>
                            <button onclick="toggleDescription('desc6')" class="text-purple-600 hover:text-purple-800 transition-colors">
                                <svg id="arrow6" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc6" class="hidden text-purple-800 text-sm mb-3">Om man vill kunna mata in text till terminalen i Java måste man använda sig av något som heter Scanner. I denna video går jag igenom vad Scanner är för något och hur man använder sig av denna.</div>
                        <a href="https://www.youtube.com/watch?v=lC70-P36NNE&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=6" 
                           target="_blank" 
                           class="block bg-purple-100 hover:bg-purple-200 p-3 rounded text-purple-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/lC70-P36NNE/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-16 h-12 rounded object-cover">
                                <div>
                                    <div class="font-medium">▶️ Titta på videon</div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 6</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-purple-900">Vid 7 - Kommentarer i kod</h4>
                            <button onclick="toggleDescription('desc7')" class="text-purple-600 hover:text-purple-800 transition-colors">
                                <svg id="arrow7" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                        <div id="desc7" class="hidden text-purple-800 text-sm mb-3">Att kommentera den kod man skriver kan ofta vara en bra sak. I denna video går jag igenom hur man skriver kommentarer och deras vanligaste syfte.</div>
                        <a href="https://www.youtube.com/watch?v=n7hRQ3qT92Q&list=PLXzzre03aIAcDVKlWEwUX-WWWGSj9zRln&index=7" 
                           target="_blank" 
                           class="block bg-purple-100 hover:bg-purple-200 p-3 rounded text-purple-700 text-xs transition-colors">
                            <div class="flex items-center space-x-2">
                                <img src="https://img.youtube.com/vi/n7hRQ3qT92Q/mqdefault.jpg" 
                                     alt="Video thumbnail" 
                                     class="w-16 h-12 rounded object-cover">
                                <div>
                                    <div class="font-medium">▶️ Titta på videon</div>
                                    <div class="text-xs opacity-75">YouTube - Utskrifter del 7</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `,
            'berattelse': `
                <div class="space-y-4">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">📹 Planera din berättelse</h4>
                        <p class="text-green-800 text-sm mb-3">Strukturera uppgiften</p>
                        <div class="bg-green-100 p-2 rounded text-green-700 text-xs">
                            Videolektion kommer snart...
                        </div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">🎯 Implementering</h4>
                        <p class="text-green-800 text-sm mb-3">Kodning steg för steg</p>
                        <div class="bg-green-100 p-2 rounded text-green-700 text-xs">
                            Videolektion kommer snart...
                        </div>
                    </div>
                </div>
            `
        };

        return videoContent[pageName] || '<p class="text-gray-500">Inget videoinnehåll tillgängligt.</p>';
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
    .hero-gradient-blue, .hero-gradient-purple, .hero-gradient-green {
        padding: 2rem 1rem;
    }
    
    @media (min-width: 640px) {
        .hero-gradient-blue, .hero-gradient-purple, .hero-gradient-green {
            padding: 3rem 2rem;
        }
    }
    
    @media (min-width: 768px) {
        .hero-gradient-blue, .hero-gradient-purple, .hero-gradient-green {
            padding: 4rem 3rem;
        }
    }
    
    @media (min-width: 1024px) {
        .hero-gradient-blue, .hero-gradient-purple, .hero-gradient-green {
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
    
    .hero-gradient-blue {
        background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    }
    .hero-gradient-purple {
        background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
    }
    .hero-gradient-green {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
    
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
    
    .terminal-container {
        background: #1a1a1a;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid #333;
    }
    
    .terminal-header {
        background: #2d2d2d;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #333;
    }
    
    .terminal-buttons {
        display: flex;
        gap: 6px;
    }
    
    .terminal-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
    }
    
    .terminal-button.close {
        background: #ff5f56;
    }
    
    .terminal-button.minimize {
        background: #ffbd2e;
    }
    
    .terminal-button.maximize {
        background: #27ca3f;
    }
    
    .terminal-title {
        color: #ccc;
        font-size: 12px;
        font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
    }
    
    .terminal-body {
        padding: 16px;
        background: #1a1a1a;
        min-height: 120px;
    }
    
    .terminal-output {
        color: #00ff00;
        font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        font-size: 14px;
        line-height: 1.5;
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    
    .terminal-output::before {
        content: "> ";
        color: #00ff00;
    }
    
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