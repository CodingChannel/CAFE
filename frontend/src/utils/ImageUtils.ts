class ImageUtils {
  // Static method to convert base64 string to Blob
  static base64ToBlob(base64: string): Blob {
    if (!base64 || typeof base64 !== "string") {
      throw new Error("Invalid base64 string");
    }

    // Check if the base64 string is correctly formatted
    if (!/^data:(.*?);base64,(.*)$/.test(base64)) {
      throw new Error("Invalid base64 string format");
    }

    // Extract content type from base64 string
    const [metadata, base64Data] = base64.split(',');
    const contentType = metadata.match(/:(.*?);/)?.[1] || '';

    if (!contentType) {
      throw new Error("Unable to extract content type from base64 string");
    }

    try {
      const byteCharacters = atob(base64Data);
      const byteArrays: Uint8Array[] = [];
  
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
  
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
  
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
  
      return new Blob(byteArrays, { type: contentType });
    } catch (error) {
      throw new Error("Failed to decode base64 string");
    }
  }
}

export default ImageUtils;