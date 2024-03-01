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
    markdown = markdown.replace(/(#{1,6})\s+(.*?$)/gm, function(match, p1, p2) {
        var headerLevel = p1.length;
        return '<h' + headerLevel + '>' + p2 + '</h' + headerLevel + '>';
    });    
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
    markdown = markdown.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    markdown = markdown.replace(/---/g, '<hr>');
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>')
                   .replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    markdown = markdown.replace(/!\[([^\]]+)]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    markdown = markdown.replace(/~~(.*?)~~/g, '<del>$1</del>');
    markdown = markdown.replace(/^\s*\*\s+(.*?$)/gm, '<ul><li>$1</li></ul>');
    markdown = markdown.replace(/^\s*1\.\s+(.*?$)/gm, '<ol><li>$1</li></ol>');
    markdown = markdown.replace(/^\s*> (.+)$/gm, '<blockquote>$1</blockquote>');
    markdown = markdown.replace(/^\s*-\s{2,}$/gm, '<hr>');
    
    return markdown;
}