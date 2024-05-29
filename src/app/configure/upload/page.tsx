"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashedIcon } from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

const Page = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<number>(50);
  const [isPending, startTransitionFunction] = useTransition();

  const onDropRejected = () => {};
  const onDropAccepted = () => {
    console.log("accepted re khoi");
  };
  return (
    <main
      className={cn(
        "relative h-full flex-1 my-8 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        { "ring-blue-900/25 bg-blue-900/10": isDragOver }
      )}
    >
      <div className="relative flex flex-col flex-1 items-center justify-center w-full">
        <Dropzone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => {
            setIsDragOver(true);
          }}
          onDragLeave={() => {
            setIsDragOver(false);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashedIcon className="h-6 w-6 textt-zinc-500 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <Image className="h-6 w-6 text-zinc-500 mb-2" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 w-40 h-2 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait....</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span>
                    Upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span>
                    or drag and drop Upload
                  </p>
                )}
              </div>
              {isPending ? null : <p className="text-zinc-500">PNG,JPG,JPEG</p>}
            </div>
          )}
        </Dropzone>
      </div>
    </main>
  );
};

export default Page;
