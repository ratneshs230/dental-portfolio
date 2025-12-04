/**
 * File Handling Library
 */

export const fileHandler = {
  // Validate file
  validateFile(file, options = {}) {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB
      allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
    } = options

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported' }
    }

    if (file.size > maxSize) {
      return { valid: false, error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit` }
    }

    return { valid: true }
  },

  // Upload file to server
  async uploadFile(file, options = {}) {
    const { onProgress, category = 'general' } = options

    // Create FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)

    // In production, this would upload to actual server
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        if (onProgress) onProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)
          resolve({
            success: true,
            fileId: 'file_' + Date.now(),
            url: '/uploads/' + file.name
          })
        }
      }, 200)
    })
  },

  // Get file preview URL
  getPreviewUrl(file) {
    return URL.createObjectURL(file)
  },

  // Format file size
  formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  },

  // Get file icon based on type
  getFileIcon(mimeType) {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType === 'application/pdf') return 'pdf'
    return 'document'
  }
}

export default fileHandler
