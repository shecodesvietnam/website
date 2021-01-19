function replaceLink(pattern, style) {
  return function replace(str) {
    return str.replace(pattern, function replace(url) {
      return `<a style="color: ${style.color}; font-size: ${style.fontSize}rem;" href="${url}">đây</a>`;
    });
  };
}

function replaceHashtag(pattern, style) {
  return function replace(str) {
    return str.replace(pattern, function hashtag(h) {
      return `<span style="color: ${style.color}; font-size: ${style.fontSize}rem;">${h}</span>`;
    });
  };
}

export { replaceLink, replaceHashtag };
