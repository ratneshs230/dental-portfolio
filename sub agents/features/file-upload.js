/**
 * File Upload for Reports/X-rays Feature
 */

import fs from 'fs-extra';
import path from 'path';

export class FileUploadFeature {
  async integrate(outputPath, clinicInfo) {
    const featuresDir = path.join(outputPath, 'components', 'features');
    const libDir = path.join(outputPath, 'lib');
    const portalDir = path.join(outputPath, 'app', 'patient-portal');

    await fs.ensureDir(featuresDir);
    await fs.ensureDir(libDir);
    await fs.ensureDir(portalDir);

    await fs.writeFile(path.join(featuresDir, 'FileUpload.jsx'), `'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileText, Image, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const allowedTypes = {
  'image/jpeg': { icon: Image, label: 'JPEG Image' },
  'image/png': { icon: Image, label: 'PNG Image' },
  'image/webp': { icon: Image, label: 'WebP Image' },
  'application/pdf': { icon: FileText, label: 'PDF Document' },
  'application/dicom': { icon: FileText, label: 'DICOM File' }
}

const maxFileSize = 10 * 1024 * 1024 // 10MB

export function FileUpload({ onUpload, category = 'general' }) {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const validateFile = (file) => {
    if (!allowedTypes[file.type]) {
      return { valid: false, error: 'File type not supported' }
    }
    if (file.size > maxFileSize) {
      return { valid: false, error: 'File size exceeds 10MB limit' }
    }
    return { valid: true }
  }

  const handleFiles = (newFiles) => {
    const processedFiles = Array.from(newFiles).map(file => {
      const validation = validateFile(file)
      return {
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: validation.valid ? 'ready' : 'error',
        error: validation.error,
        progress: 0
      }
    })
    setFiles(prev => [...prev, ...processedFiles])
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id))
  }

  const uploadFiles = async () => {
    setUploading(true)
    const readyFiles = files.filter(f => f.status === 'ready')

    for (const fileData of readyFiles) {
      // Update status to uploading
      setFiles(prev => prev.map(f =>
        f.id === fileData.id ? { ...f, status: 'uploading' } : f
      ))

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setFiles(prev => prev.map(f =>
          f.id === fileData.id ? { ...f, progress } : f
        ))
      }

      // Mark as complete
      setFiles(prev => prev.map(f =>
        f.id === fileData.id ? { ...f, status: 'complete', progress: 100 } : f
      ))
    }

    setUploading(false)
    if (onUpload) {
      onUpload(readyFiles)
    }
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="w-full">
      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={\`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all \${
          dragActive
            ? 'border-dental-primary bg-dental-primary/5'
            : 'border-gray-300 hover:border-gray-400'
        }\`}
      >
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf,.dcm"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <Upload className={\`w-12 h-12 mx-auto mb-4 \${dragActive ? 'text-dental-primary' : 'text-gray-400'}\`} />

        <h3 className="text-lg font-semibold text-dental-foreground mb-2">
          {dragActive ? 'Drop files here' : 'Upload X-rays & Reports'}
        </h3>

        <p className="text-gray-500 text-sm mb-4">
          Drag & drop files here, or click to browse
        </p>

        <p className="text-xs text-gray-400">
          Supported: JPEG, PNG, PDF, DICOM • Max 10MB per file
        </p>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-3"
          >
            {files.map((fileData) => {
              const FileIcon = allowedTypes[fileData.type]?.icon || FileText

              return (
                <motion.div
                  key={fileData.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={\`flex items-center gap-4 p-4 rounded-xl border \${
                    fileData.status === 'error'
                      ? 'border-red-200 bg-red-50'
                      : 'border-gray-200 bg-white'
                  }\`}
                >
                  <div className={\`p-2 rounded-lg \${
                    fileData.status === 'error'
                      ? 'bg-red-100'
                      : fileData.status === 'complete'
                      ? 'bg-green-100'
                      : 'bg-dental-primary/10'
                  }\`}>
                    <FileIcon className={\`w-6 h-6 \${
                      fileData.status === 'error'
                        ? 'text-red-500'
                        : fileData.status === 'complete'
                        ? 'text-green-500'
                        : 'text-dental-primary'
                    }\`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-dental-foreground truncate">
                        {fileData.name}
                      </span>
                      {fileData.status === 'complete' && (
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      )}
                      {fileData.status === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {fileData.error || formatSize(fileData.size)}
                    </div>

                    {fileData.status === 'uploading' && (
                      <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-dental-primary transition-all duration-300"
                          style={{ width: fileData.progress + '%' }}
                        />
                      </div>
                    )}
                  </div>

                  {fileData.status !== 'uploading' && (
                    <button
                      onClick={() => removeFile(fileData.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              )
            })}

            {/* Upload Button */}
            {files.some(f => f.status === 'ready') && (
              <button
                onClick={uploadFiles}
                disabled={uploading}
                className="w-full dental-btn-primary disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload {files.filter(f => f.status === 'ready').length} File(s)
                  </>
                )}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Patient Portal Upload Section
export function PatientPortalUpload() {
  return (
    <div className="dental-card">
      <h3 className="text-xl font-bold text-dental-foreground mb-6">Upload Medical Records</h3>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
          <div className="p-2 bg-blue-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-dental-foreground">Secure Upload</h4>
            <p className="text-sm text-gray-600">
              Your files are encrypted and securely stored. Only authorized clinic staff can access them.
            </p>
          </div>
        </div>
      </div>

      <FileUpload
        category="medical-records"
        onUpload={(files) => console.log('Uploaded:', files)}
      />
    </div>
  )
}
`);

    // File Handler Library
    await fs.writeFile(path.join(libDir, 'fileHandler.js'), `/**
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
      return { valid: false, error: \`File size exceeds \${maxSize / (1024 * 1024)}MB limit\` }
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
`);

    // Patient Portal Page
    await fs.writeFile(path.join(portalDir, 'page.jsx'), `'use client'

import { PatientPortalUpload } from '@/components/features/FileUpload'

export default function PatientPortalPage() {
  return (
    <div className="dental-section">
      <div className="dental-container px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-dental-foreground mb-2">Patient Portal</h1>
          <p className="text-gray-600 mb-8">Upload your medical records, X-rays, and reports securely.</p>

          <PatientPortalUpload />
        </div>
      </div>
    </div>
  )
}
`);
  }
}

export default FileUploadFeature;
