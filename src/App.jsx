import React, { useState, useEffect } from 'react';

const App = () => {
  const [markdown, setMarkdown] = useState('');

  // Function to convert markdown to HTML
  const handleMarkDown = (text) => {
    const header1 = /^# (.*)$/gm;
    const header2 = /^## (.*)$/gm;
    const header3 = /^### (.*)$/gm;
    const orderList = /^\s*\d+\. (.*)$/gm;
    const unOrderList = /^\s*[-*+] (.*)$/gm;
    const bold = /\*\*(.*?)\*\*/g;
    const italic = /\*(.*?)\*/g;
    const link = /\[(.*?)\]\((.*?)\)/g;
    let markdown = text
      .replace(header1, '<h1 class="text-4xl font-bold mb-4">$1</h1>')
      .replace(header2, '<h2 class="text-3xl font-semibold mb-3">$1</h2>')
      .replace(header3, '<h3 class="text-2xl font-medium mb-2">$1</h3>')
      .replace(bold, '<b>$1</b>')
      .replace(italic, '<i>$1</i>')
      .replace(link, '<a href="$2" class="text-blue-500 underline">$1</a>')
      .replace(orderList,'<ol><li>$1</li></ol>')
      .replace(orderList,'<ul><li>$1</li></ul>')
    
    return markdown;
  };
  
  // Save the markdown to localStorage whenever it changes
  const handleChange = (e) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    localStorage.setItem('markdown', newMarkdown);  // Save to localStorage
  };
  // Load the markdown from localStorage on initial render
  useEffect(() => {
    const storedMarkdown = localStorage.getItem('markdown');
    if (storedMarkdown) {
      setMarkdown(storedMarkdown);
    } else {
      // Default value if nothing is stored
      setMarkdown('# Markdown-Previewer');
    }
  }, []);


  return (
    <div className="markdown-previewer min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row">
        {/* Markdown Input Section */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Markdown Input</h2>
          <textarea
            className="w-full h-96 p-4 border rounded-md shadow-sm"
            value={markdown}
            onChange={handleChange}
            placeholder="Enter Markdown here..."
            rows={10}
            cols={50}
          />
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-1/2 p-4 bg-white border-l border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: handleMarkDown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
