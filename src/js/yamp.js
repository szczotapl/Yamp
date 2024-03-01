// YAMP - Yet Another Markdown Parser
// Author - riviox

window.onload = function () {
    var mdElements = document.getElementsByClassName('md');

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.jsdelivr.net/gh/riviox/yamp@master/src/css/yamp.min.css';
    document.head.appendChild(link);

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
    markdown = markdown.replace(/!\[([^\]]+)]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    markdown = markdown.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    markdown = markdown.replace(/---/g, '<hr>');
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>')
                   .replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    markdown = markdown.replace(/~~(.*?)~~/g, '<del>$1</del>');
    markdown = markdown.replace(/^\s*[-+*]\s+(.*?$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/^\s*> (.+)$/gm, '<blockquote>$1</blockquote>');
    markdown = markdown.replace(/^\s*-\s{2,}$/gm, '<hr>');
    markdown = markdown.replace(/\\n/g, '<br>');

    return markdown;
}
