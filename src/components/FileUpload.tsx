'use client'
import React, {Fragment} from 'react';
import {useDropzone} from 'react-dropzone';
import {Inbox} from "lucide-react";
import accept from "attr-accept";
import {uploadToS3} from "@/lib/s3";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
const FileUpload  = () => {
    // Configure useDropzone hook.( Types files, Limit files)
    const {getRootProps, getInputProps} = useDropzone(
        {
            accept:{"application/pdf":[".pdf"]},
            maxFiles: 1,
            onDrop:async (acceptedFiles) => {
                console.log ( acceptedFiles )
                const file = acceptedFiles[0]
                //Bigger than 10mb
                if (file.size > 10 * 1024 * 1024) {
                    alert ( "Please upload a smaller file" )
                    return
                }
               try {
                   const data = await uploadToS3 ( file )
                   console.log("data", data)
               } catch (e) {
                   console.log(error)
               }
            }
        }
    );
    return (
        <div className="p-2 bg-white rounded-xl">
            {/* Dropzone container */}
           <div {...getRootProps({
               className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col '
           })}>
               <input {...getInputProps()}/>
               {/* Dropzone content */}
               <Fragment>
                   <Inbox className="w-10 h-10 text-gray-800"/>
                   <p className="mt-2 text-sm text-slate-600"> Drop your PDF here!</p>
               </Fragment>
           </div>
        </div>
    );
}
export default FileUpload ;
