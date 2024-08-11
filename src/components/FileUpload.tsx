'use client'
import React , { Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import { Inbox , Loader2 } from "lucide-react";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

const FileUpload = () => {
    const [uploading , setUploading ]  = React.useState ( false )
    // Configure the mutation with React Query to handle the API call
    // after the file has been successfully uploaded to S3.
    const { mutate , isLoading } = useMutation ( {
        mutationFn : async ( { file_key , file_name } : { file_key : string, file_name : string } ) => {
            // API call to create a chat (or any other business logic action)
            const response = await axios.post ( '/api/create-chat',
                { file_key,file_name });
            return response.data;
        }
    } );

    // Set up the useDropzone hook to manage file drag-and-drop.
    // Limits to one file and accepts only PDF files.
    const { getRootProps , getInputProps } = useDropzone ( {
        // Only PDF files are accepted
        accept : { "application/pdf" : [".pdf"] } ,
        // Limit to one file
        maxFiles : 1 ,
        onDrop : async ( acceptedFiles ) => {
            if (!acceptedFiles || acceptedFiles.length === 0) {
                console.log("No files were dropped or accepted.");
                return;
            }
            // Select the first accepted file
            const file = acceptedFiles[0];

            // Check if the file size exceeds 10 MB
            if (file.size > 10 * 1024 * 1024) {
                toast.error ( "File too large, please upload a smaller file" );
                return;
            }

            try {
                setUploading ( true )
                // Upload the file to S3
                const data = await uploadToS3 ( file );
                console.log("Data returned from S3:", data);

                console.log("Sending data to mutation:", data);
                // Check if the returned data is valid
                if (! data?.file_key || ! data?.file_name) {
                    // Explicit error message
                    toast.error ( "An error occurred during file upload. The server did not return the expected data. Please try again." )
                    return;
                }

                // Trigger mutation with the file data, handling success and error cases
                mutate ( data , {
                    onSuccess : ( data ) => {
                        console.log("Mutation success:", data);
                        // Log the file name on success
                        toast.success ( data.message );
                    } ,
                    onError : ( err ) => {
                        console.error("Mutation error:", err);
                        // Log the error message on failure
                        toast.error ( "Error creating chat" )
                    }
                } );
            } catch ( e ) {
                // Log any errors that occur during the upload
                console.log ( e );
            } finally {
                setUploading (false);
            }
        }
    } );

    return (
        <div className="p-2 bg-white rounded-xl">
            {/* Container for the Dropzone component */}
            <div {...getRootProps ( {
                className : 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'
            } )}>
                <input {...getInputProps ()} />
                {uploading || isLoading ? (
                    <Fragment>
                        {/* Loading state*/}
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin"/>
                        <p className="mt-2 text-sm text-slate-400">
                            Spilling Tea to GPT...
                        </p>
                    </Fragment>
                ) : (
                    <Fragment>
                        {/* Content of the Dropzone */}
                        <Inbox className="w-10 h-10 text-gray-800"/>
                        <p className="mt-2 text-sm text-slate-600">Drop your PDF here!</p>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default FileUpload;
