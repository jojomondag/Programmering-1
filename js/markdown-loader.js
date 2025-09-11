// Markdown Content Loader for Programmering 1 website
// Loads content from Markdown files and renders them dynamically

window.markdownLoader = {
    // Navigation data for each page
    navigationData: {
        variabler: {
            current: "Variabler",
            links: [
                {"text": "← Hem", "href": "index.html"},
                {"text": "Utskrifter →", "href": "utskrifter.html"}
            ]
        },
        utskrifter: {
            current: "Utskrifter i Java",
            links: [
                {"text": "← Hem", "href": "index.html"},
                {"text": "Variabler", "href": "variabler.html"}
            ]
        },
        berattelse: {
            current: "Berättelse",
            links: [
                {"text": "← Hem", "href": "index.html"},
                {"text": "Variabler", "href": "variabler.html"},
                {"text": "Utskrifter", "href": "utskrifter.html"}
            ]
        }
    },

    // Page metadata
    pageMetadata: {
        variabler: {
            title: "Programmering 1 - Variabler och Minnesplatser",
            subtitle: "Variabler / Minnesplatser",
            description: "Används för att lagra data. Beroende på form av data skapas minnesplatser med anpassning för tänkt datainnehåll."
        },
        utskrifter: {
            title: "Programmering 1 - Utskrifter i Java", 
            subtitle: "Utskrifter i Java",
            description: "Grund-syntaxen som används för att \"skriva ut data på skärmen\" från ett program som exekveras"
        },
        berattelse: {
            title: "Programmering 1 - Inlämningsuppgift 3: Berättelse",
            subtitle: "Inlämningsuppgift 3: Berättelse", 
            description: "Skapa en personlig berättelse baserad på användarens svar"
        }
    },

    // Simple markdown parser with better code handling
    parseMarkdown(markdown) {
        // Convert markdown to HTML
        let html = markdown;

        // First, extract and protect code blocks to avoid interference
        const codeBlocks = [];
        let codeBlockIndex = 0;
        
        // Extract code blocks and replace with placeholders (more robust regex)
        html = html.replace(/```(\w+)?\s*\n([\s\S]*?)\n```/g, (match, language, code) => {
            const lang = language || 'java';
            const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
            codeBlocks[codeBlockIndex] = {
                language: lang,
                code: code.trim()
            };
            codeBlockIndex++;
            return placeholder;
        });

        // Extract inline code and replace with placeholders
        const inlineCodes = [];
        let inlineCodeIndex = 0;
        html = html.replace(/`([^`\n]+)`/g, (match, code) => {
            const placeholder = `__INLINE_CODE_${inlineCodeIndex}__`;
            inlineCodes[inlineCodeIndex] = code;
            inlineCodeIndex++;
            return placeholder;
        });

        // Headers
        html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-800 mb-4">$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-gray-900 mb-6">$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-8">$1</h1>');

        // Bold and italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Images - Handle markdown images with proper responsive styling
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<div class="image-container my-6"><img src="$2" alt="$1" class="w-full h-auto rounded-lg shadow-lg" loading="lazy"></div>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

        // Blockquotes (for warnings and notes) with better styling
        html = html.replace(/^> ⚠️ \*\*(.*?)\*\* (.*$)/gm, '<div class="alert-box alert-warning"><p><strong>⚠️ $1</strong> $2</p></div>');
        html = html.replace(/^> \*\*(.*?)\*\* (.*$)/gm, '<div class="alert-box alert-warning"><p><strong>$1</strong> $2</p></div>');
        html = html.replace(/^> 💡 (.*$)/gm, '<div class="alert-box alert-info"><p><strong>💡 Tips:</strong> $1</p></div>');
        html = html.replace(/^> (.*$)/gm, '<div class="alert-box alert-info"><p>$1</p></div>');

        // Lists
        html = html.replace(/^\- (.*$)/gm, '<li class="mb-2">• $1</li>');
        html = html.replace(/^(\d+)\. (.*$)/gm, '<li class="mb-2">$1. $2</li>');

        // Wrap consecutive list items in ul/ol
        html = html.replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => {
            if (match.includes('•')) {
                return `<ul class="list-none space-y-2 mb-6">${match}</ul>`;
            } else {
                return `<ol class="list-none space-y-2 mb-6">${match}</ol>`;
            }
        });

        // Tables with improved responsive design
        html = html.replace(/\|(.+)\|\n\|(.+)\|\n((?:\|.+\|\n)*)/g, (match, headers, separator, rows) => {
            const headerCells = headers.split('|').map(h => h.trim()).filter(h => h).map(h => `<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-50">${h}</th>`).join('');
            const rowData = rows.trim().split('\n').map(row => {
                const cells = row.split('|').map(c => c.trim()).filter(c => c).map(c => {
                    // Handle inline code in table cells after restoring placeholders
                    return `<td class="px-6 py-4 text-sm text-gray-700">${c}</td>`;
                }).join('');
                return `<tr class="hover:bg-gray-50">${cells}</tr>`;
            }).join('');
            
            return `<div class="overflow-x-auto bg-white rounded-lg shadow-sm border mb-8">
                <table class="w-full table-auto">
                    <thead>
                        <tr>${headerCells}</tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${rowData}
                    </tbody>
                </table>
            </div>`;
        });

        // Paragraphs - be more careful about where to add paragraph tags
        html = html.replace(/\n\s*\n/g, '</p>\n<p class="text-gray-700 mb-4">');
        html = '<p class="text-gray-700 mb-4">' + html + '</p>';

        // Clean up empty paragraphs and fix paragraph wrapping
        html = html.replace(/<p class="text-gray-700 mb-4">\s*<\/p>/g, '');
        html = html.replace(/<p class="text-gray-700 mb-4">(\s*<h[1-6])/g, '$1');
        html = html.replace(/(<\/h[1-6]>)\s*<\/p>/g, '$1');
        html = html.replace(/<p class="text-gray-700 mb-4">(\s*<div)/g, '$1');
        html = html.replace(/(<\/div>)\s*<\/p>/g, '$1');
        html = html.replace(/<p class="text-gray-700 mb-4">(\s*<ul|\s*<ol)/g, '$1');
        html = html.replace(/(<\/ul>|<\/ol>)\s*<\/p>/g, '$1');
        html = html.replace(/<p class="text-gray-700 mb-4">(\s*__CODE_BLOCK_)/g, '$1');
        html = html.replace(/(__CODE_BLOCK_\d+__)\s*<\/p>/g, '$1');

        // Restore inline code with proper styling (no HTML escaping needed for display)
        for (let i = 0; i < inlineCodes.length; i++) {
            const placeholder = `__INLINE_CODE_${i}__`;
            // Check if this inline code is in a table cell and apply appropriate styling
            html = html.replace(placeholder, `<code class="bg-gray-200 px-2 py-1 rounded text-xs font-mono">${inlineCodes[i]}</code>`);
        }

        // Restore code blocks with proper syntax highlighting (minimal escaping for HTML safety)
        for (let i = 0; i < codeBlocks.length; i++) {
            const placeholder = `__CODE_BLOCK_${i}__`;
            const block = codeBlocks[i];
            // Only escape HTML entities that could break the HTML structure
            const safeCode = block.code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            
            html = html.replace(placeholder, `<div class="code-container relative mb-6 w-full">
                <button class="copy-button" onclick="copyCode(this)">Kopiera</button>
                <div class="overflow-x-auto">
                    <pre class="w-full m-0"><code class="language-${block.language}">${safeCode}</code></pre>
                </div>
            </div>`);
        }

        return html;
    },

    // Load markdown content from file
    async loadMarkdownContent(pageType) {
        try {
            const response = await fetch(`content/${pageType}.md`);
            if (!response.ok) {
                throw new Error(`Failed to load ${pageType}.md`);
            }
            const markdown = await response.text();
            return this.parseMarkdown(markdown);
        } catch (error) {
            console.error(`Error loading ${pageType} content:`, error);
            return `<p class="text-red-600">Kunde inte ladda innehåll för ${pageType}</p>`;
        }
    },

    // Update page meta information
    updatePageMeta(pageType) {
        const meta = this.pageMetadata[pageType];
        if (!meta) return;
        
        document.title = meta.title;
        
        // Update meta description if it exists
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', meta.description);
        }
    },

    // Render navigation
    renderNavigation(pageType) {
        const nav = this.navigationData[pageType];
        if (!nav) return '';
        
        const links = nav.links.map(link => 
            `<a href="${link.href}" class="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-50 transition-colors">${link.text}</a>`
        ).join('\n                    ');
        
        return `
            <div class="bg-white rounded-lg shadow-sm border p-4">
                <div class="flex flex-wrap gap-4 justify-center">
                    ${links}
                    <span class="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold border">${nav.current}</span>
                </div>
            </div>
        `;
    },

    // Render page header
    renderPageHeader(pageType) {
        const meta = this.pageMetadata[pageType];
        if (!meta) return '';
        
        return `
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Programmering 1</h1>
            <h2 class="text-2xl text-gray-700 font-semibold">${meta.subtitle}</h2>
            <p class="text-gray-600 mt-4 text-lg">${meta.description}</p>
        `;
    },

    // Render video panel (keeping the existing structure)
    renderVideoPanel(pageType) {
        // This would need to be updated based on how you want to handle videos
        // For now, returning empty string
        return '';
    },

    // Render footer links
    renderFooterLinks(pageType) {
        const nav = this.navigationData[pageType];
        if (!nav) return '';
        
        const links = nav.links.map(link => 
            `<a href="${link.href}" class="text-blue-600 hover:underline">${link.text}</a>`
        ).join('\n                ');
        
        return links;
    }
};

// Function to copy code blocks with proper text extraction
function copyCode(button) {
    const codeBlock = button.nextElementSibling.querySelector('code');
    if (codeBlock) {
        // Get the text content and clean up any HTML entities
        let text = codeBlock.textContent || codeBlock.innerText;
        
        // Ensure we have clean Java/code text (unescape HTML entities if needed)
        text = text
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
        
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Kopierat! ✓';
            button.classList.add('bg-green-500');
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('bg-green-500');
            }, 2000);
        }).catch(() => {
            const originalText = button.textContent;
            button.textContent = 'Fel ✗';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    }
}