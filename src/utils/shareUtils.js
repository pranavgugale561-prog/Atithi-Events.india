export async function shareItem(item) {
  const title = `Atithi Events - ${item.title}`;
  const text = item.description || `Check out ${item.title} at Atithi Events!`;
  const url = window.location.href;
  
  const shareData = { title, text, url };

  try {
    if (item.images && item.images.length > 0) {
      const imgUrl = item.images[0];
      const isVideo = imgUrl.split('?')[0].toLowerCase().match(/\.(mp4|webm|mov)$/) || imgUrl.includes('video%2F');
      
      // Attempt to attach a compressed thumbnail if it's an image
      if (!isVideo && navigator.canShare) {
        try {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = imgUrl;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
          
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 500; // Compress width for quick thumbnail loading
          const scale = Math.min(MAX_WIDTH / img.width, 1);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.5));
          const file = new File([blob], 'preview.jpg', { type: 'image/jpeg' });
          
          if (navigator.canShare({ files: [file] })) {
            shareData.files = [file];
          }
        } catch (imgError) {
          console.warn('Could not compress image for sharing (CORS or loading issue), falling back to text share.', imgError);
        }
      }
    }

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback if Web Share API is not available
      await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
      alert('Link and details copied to clipboard!');
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Share failed:', error);
    }
  }
}
