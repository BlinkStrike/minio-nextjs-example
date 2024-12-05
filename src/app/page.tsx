'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FileInfo {
  name: string;
  size: number;
  lastModified: Date;
}

export default function Home() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/files');
      const data = await response.json();
      if (data.files) {
        setFiles(data.files);
      }
    } catch (err) {
      setError('Error fetching files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      await fetchFiles(); // Refresh the file list
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (filename: string) => {
    try {
      window.open(`/api/download/${filename}`, '_blank');
    } catch (err) {
      setError('Error downloading file');
      console.error(err);
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      const response = await fetch(`/api/delete/${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Delete failed');
      }
      
      await fetchFiles(); // Refresh the file list
    } catch (err) {
      setError('Error deleting file');
      console.error(err);
    }
  };

  const formatFileSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">MinIO File Storage</h1>
          
          {/* Upload Section */}
          <div className="mb-8">
            <label className="block mb-4">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                className="block w-full text-sm text-white
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
            {uploading && <p className="text-blue-500">Uploading...</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Files List */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Files</h2>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : files.length === 0 ? (
              <p className="text-gray-500">No files uploaded yet</p>
            ) : (
              <ul className="space-y-2">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                  >
                    <div className="flex flex-col">
                      <span className="truncate text-gray-900">{file.name}</span>
                      <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownload(file.name)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(file.name)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
