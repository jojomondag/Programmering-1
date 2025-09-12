# React Syntax Highlighting Components - Usage Guide

This document explains how to use the new React-based syntax highlighting components in your markdown content.

## Available Components

### 1. FreeFlow SyntaxHighlighting (`react:freeflow`)

A standalone code block with syntax highlighting, copy functionality, and optional features.

**Basic Usage:**
```markdown
```react:freeflow
public static void main(String[] args) {
    System.out.println("Hello World!");
}
```
```

**With Options:**
```markdown
```react:freeflow title="Main Method Example" lineNumbers=true language=java
public static void main(String[] args) {
    System.out.println("Hello World!");
}
```
```

**Available Options:**
- `title="Title Text"` - Adds a title bar to the code block
- `lineNumbers=true` - Shows line numbers on the left
- `language=java` - Specifies the syntax highlighting language (default: java)

### 2. Interactive Code Demo (`react:demo`)

Shows code alongside its expected output in a side-by-side layout.

**Usage:**
```markdown
```react:demo title="Variables Example"
String name = "Anna";
int age = 25;
System.out.println("Name: " + name);
System.out.println("Age: " + age);
---
Name: Anna
Age: 25
```
```

The `---` separator divides the code from the expected output.

### 3. InText SyntaxHighlighting (`[code]...[/code]`)

Inline code highlighting that fits within text flows.

**Usage:**
```markdown
After [code]public static void main(String[] args)[/code] you should create three String variables.
```

This renders as: After `public static void main(String[] args)` you should create three String variables.

### 4. Code Example Container (`react:example`)

Groups multiple related code examples with titles.

**Usage:**
```markdown
```react:example title="Variable Declaration Examples"
Creating an Integer
int number = 42;
---
Creating a String
String message = "Hello World";
---
Creating a Double
double price = 29.99;
```
```

## Enhanced Markdown Features

### Automatic Inline Code Processing

The `EnhancedText` component automatically processes backtick-wrapped code:

```markdown
Use `Scanner scanner = new Scanner(System.in)` to read user input.
```

### Mixed Content Example

You can mix regular markdown with React components:

```markdown
# Variables in Java

Variables are like labeled boxes in memory. Here's how to create them:

```react:freeflow title="Basic Variable Declaration"
int age = 25;
String name = "Anna";
double height = 1.75;
```

After declaring variables with [code]int age = 25[/code], you can use them in your program.

```react:demo title="Using Variables"
int age = 25;
String name = "Anna";
System.out.println(name + " is " + age + " years old");
---
Anna is 25 years old
```

## Implementation Details

### In Your HTML File

Make sure to include these scripts in order:

```html
<!-- React -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

<!-- Your components and loaders -->
<script defer src="js/markdown-loader.js"></script>
<script defer src="js/syntax-components.js"></script>
<script defer src="js/react-markdown-loader.js"></script>
```

### Markdown File Structure

Place your markdown files in the `content/` directory:
- `content/variabler.md`
- `content/utskrifter.md`
- `content/berattelse.md`

### Component Loading

The system automatically:
1. Parses the markdown
2. Identifies React component markers
3. Renders the HTML with placeholder divs
4. Mounts React components to the placeholders
5. Applies syntax highlighting with Prism.js

## Styling and Customization

### CSS Classes

The components use Tailwind CSS classes. You can customize them by modifying:

- `.code-container` - Main code block wrapper
- `.copy-button` - Copy to clipboard button
- `.react-component-mount` - Component mounting points
- `.inline-syntax` - Inline code styling

### Color Variants for InText Components

```javascript
// Available variants for InTextSyntax
<InTextSyntax variant="default">code</InTextSyntax>
<InTextSyntax variant="subtle">code</InTextSyntax>
<InTextSyntax variant="emphasized">code</InTextSyntax>
<InTextSyntax variant="dark">code</InTextSyntax>
```

## Best Practices

### 1. Use Appropriate Components
- **FreeFlow** for standalone code examples
- **Demo** for code that produces output
- **InText** for code within sentences
- **Example Container** for grouped, related examples

### 2. Provide Context
Always add titles and explanations to help students understand the purpose of each code example.

### 3. Test Output
When using `react:demo`, make sure the expected output matches what the code actually produces.

### 4. Keep It Simple
Don't overuse inline syntax highlighting - reserve it for important keywords and method names.

## Troubleshooting

### Components Not Rendering
1. Check browser console for JavaScript errors
2. Ensure React scripts load before component scripts
3. Verify markdown syntax is correct

### Syntax Highlighting Not Working
1. Ensure Prism.js is loaded
2. Check that the language is supported
3. Verify component mounting completed

### Copy Function Not Working
1. Check if the site is served over HTTPS (clipboard API requirement)
2. Verify the copy button is properly attached to the code block

## Future Enhancements

Planned improvements include:
- Live code execution (when possible)
- More interactive examples
- Code comparison tools
- Student submission integration