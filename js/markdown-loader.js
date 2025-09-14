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

            codeBlocks.push(`<div class="code-container relative mb-6">
                <button onclick="copyCode(this)" class="copy-button">Kopiera</button>
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code class="${langClass} font-mono">${this.escapeHtml(code.trim())}</code>
                </pre>
            </div>`);
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

        // Tables
        html = html.replace(/\|(.+)\|\n\|[-\s|:]+\|\n((?:\|.+\|\n?)*)/g, (match, header, rows) => {
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
            return tableHtml;
        });

        // Blockquotes
        html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-yellow-400 bg-yellow-50 p-4 italic mb-4 text-gray-700">$1</blockquote>');

        // Lists - handle bullet points
        html = html.replace(/^[-*] (.+)$/gm, '<li class="text-gray-700 mb-2">$1</li>');
        
        // Wrap consecutive list items in ul tags
        html = html.replace(/(<li class="text-gray-700 mb-2">.*?<\/li>\s*)+/gs, (match) => {
            return `<ul class="list-disc list-inside space-y-2 mb-6 ml-4">${match}</ul>`;
        });

        // Handle emoji and special formatting
        html = html.replace(/^(\*.*?\*)$/gm, '<p class="text-gray-600 italic mb-4">$1</p>');

        // Convert line breaks to paragraphs
        html = html.split('\n\n').map(paragraph => {
            paragraph = paragraph.trim();
            if (paragraph && 
                !paragraph.includes('<h') && 
                !paragraph.includes('<div') && 
                !paragraph.includes('<ul') && 
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
                        <h4 class="font-semibold text-purple-900 mb-2">📹 System.out.println()</h4>
                        <p class="text-purple-800 text-sm mb-3">Grundläggande utskrifter</p>
                        <div class="bg-purple-100 p-2 rounded text-purple-700 text-xs">
                            Videolektion kommer snart...
                        </div>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-purple-900 mb-2">🎨 Specialtecken</h4>
                        <p class="text-purple-800 text-sm mb-3">Unicode och formatering</p>
                        <div class="bg-purple-100 p-2 rounded text-purple-700 text-xs">
                            Videolektion kommer snart...
                        </div>
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

// Add CSS for gradients (kept small and local)
const style = document.createElement('style');
style.textContent = `
    .hero-gradient-blue {
        background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    }
    .hero-gradient-purple {
        background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
    }
    .hero-gradient-green {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
`;
document.head.appendChild(style);