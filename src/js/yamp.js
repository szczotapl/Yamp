// YAMP - Yet Another Markdown Parser
// Author - riviox

window.onload = function () {
    var mdElements = document.getElementsByClassName('md');

    var style = document.createElement('style');
    style.innerHTML = '.md pre { white-space: pre-line; margin: 0; }';
    document.head.appendChild(style);

    for (var i = 0; i < mdElements.length; i++) {
        var mdContent = mdElements[i].innerHTML;

        var parsedContent = parseMarkdown(mdContent);
        mdElements[i].innerHTML = '<pre>' + parsedContent + '</pre>';
    }
};

function parseMarkdown(markdown) {
    markdown = markdown.replace(/(#)\s+(.*?$)/gm, '<h1>$2</h1>');
    markdown = markdown.replace(/(##)\s+(.*?$)/gm, '<h2>$2</h2>');
    markdown = markdown.replace(/(###)\s+(.*?$)/gm, '<h3>$2</h3>');
    markdown = markdown.replace(/(####)\s+(.*?$)/gm, '<h4>$2</h4>');
    markdown = markdown.replace(/(#####)\s+(.*?$)/gm, '<h5>$2</h5>');
    markdown = markdown.replace(/(######)\s+(.*?$)/gm, '<h6>$2</h6>');
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
    markdown = markdown.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    markdown = markdown.replace(/---/g, '<hr>');
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');
    markdown = markdown.replace(/!\[([^\]]+)]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    markdown = markdown.replace(/~~(.*?)~~/g, '<del>$1</del>');
    markdown = markdown.replace(/^\s*\*\s+(.*?$)/gm, '<ul><li>$1</li></ul>');
    markdown = markdown.replace(/^\s*1\.\s+(.*?$)/gm, '<ol><li>$1</li></ol>');
    markdown = markdown.replace(/^\s*> (.*)$/gm, '<blockquote>$1</blockquote>');
    
    return markdown;
}
