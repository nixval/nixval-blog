export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// NEW: Calculate reading time
export function getReadingTime(content: string): string {
  if (!content) return '1 min read';
  
  const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
  const numberOfWords = clean.split(/\s/g).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  
  return `${minutes} min read`;
}
