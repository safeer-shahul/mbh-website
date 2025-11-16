export function stripHtml(html: string) {
    if (!html) return "";
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }
  
  export function truncate(text: string, max = 150) {
    if (!text) return "";
    if (text.length <= max) return text;
    return text.slice(0, max).trim() + "...";
  }
  