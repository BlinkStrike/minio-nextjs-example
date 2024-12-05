# Simple File Manager

A modern, user-friendly file management application built with Next.js and MinIO. This application allows you to easily upload, download, and manage files stored in your MinIO bucket.

## Features

- 📤 File Upload: Upload files to your MinIO bucket
- 📥 File Download: Download files directly from the bucket
- 🗑️ File Deletion: Remove files you no longer need
- 📊 File Information: View file sizes in a human-readable format
- 🎯 Modern UI: Clean and responsive interface with loading states
- 🔒 Secure: Built-in security with MinIO authentication

## Prerequisites

- Node.js 18 or later
- A MinIO server instance
- MinIO access credentials (Access Key and Secret Key)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd minio-nextjs-example
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Fill in your MinIO credentials in the `.env` file:
   ```env
   MINIO_ENDPOINT=<minio endpoint>
   MINIO_PORT=<minio port>
   MINIO_USE_SSL=<minio use ssl>
   MINIO_ACCESS_KEY=<access key>
   MINIO_SECRET_KEY=<secret key>
   MINIO_BUCKET_NAME=<bucket name>
   ```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## API Routes

The application includes the following API endpoints:

- `GET /api/files` - List all files in the bucket
- `POST /api/upload` - Upload a new file
- `GET /api/download/[filename]` - Download a specific file
- `DELETE /api/delete/[filename]` - Delete a specific file

## Built With

- [Next.js](https://nextjs.org/) - The React framework
- [MinIO](https://min.io/) - High Performance Object Storage
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## License

This project is open source and available under the [MIT License](LICENSE).
