"use client";

import { useState, useRef, DragEvent } from "react";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, GlassButton } from "@/design-system/components";
import { Upload, File, X, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "complete" | "error";
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const simulateUpload = (file: UploadedFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        setFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, progress: 100, status: "complete" } : f
        ));
      } else {
        setFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: UploadedFile[] = Array.from(fileList).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      status: "uploading" as const
    }));

    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => simulateUpload(file));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="w-full">
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Upload className="h-5 w-5 text-[var(--text-primary)]" />
            <CardTitle>File Upload</CardTitle>
          </div>
          <CardDescription>
            Drag and drop files or click to browse
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-lg p-8
              cursor-pointer transition-all duration-200
              ${isDragging
                ? "border-purple-500 bg-purple-500/10"
                : "border-[var(--glass-border)] hover:border-purple-500/50"
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={e => handleFiles(e.target.files)}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3 text-center">
              <div className="p-3 rounded-full bg-[var(--glass-tint)] backdrop-blur-[var(--blur-medium)]">
                <Upload className="h-6 w-6 text-[var(--text-primary)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Uploaded Files ({files.length})
              </h3>

              <div className="space-y-2">
                {files.map(file => (
                  <div
                    key={file.id}
                    className="p-4 rounded-lg backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)] border border-[var(--glass-border)]"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="p-2 rounded bg-blue-500/20">
                          <File className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-[var(--text-secondary)]">
                            {file.size}
                          </p>
                        </div>
                      </div>

                      {file.status === "complete" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="p-1 hover:bg-red-500/20 rounded transition-colors"
                          aria-label="Remove file"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </button>
                      )}
                    </div>

                    {file.status === "uploading" && (
                      <div className="space-y-1">
                        <Progress value={file.progress} className="h-1" />
                        <p className="text-xs text-[var(--text-secondary)]">
                          Uploading... {file.progress}%
                        </p>
                      </div>
                    )}

                    {file.status === "complete" && (
                      <p className="text-xs text-green-500">
                        Upload complete
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </GlassCard>
    </div>
  );
}
