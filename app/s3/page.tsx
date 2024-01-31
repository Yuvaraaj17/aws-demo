"use client"
import { useState } from "react";

export default function Upload() {
    const [file, setFile] = useState("")

    const handleChange = (event: any) => {
        setFile(
            event.target.files[0]
        )

    }

    const upload = () => {
        const formData = new FormData();
        formData.append('file', file);
        if (file==null){
            fetch(
                "http://localhost:8000/s3/upload",
                {
                    method: "POST",
                    body: formData
                }
            ).then((response) => {
                if (response.statusText == 'OK') {
                    console.log("File Uploaded")
                }
            })
        }
        else{
            console.log("Please select a file")
        }
        

    }

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <div className="flex flex-col  gap-4 items-center justify-center">
                <input type="file" onChange={() => handleChange(event)} className="flex border border-black" />
                <input type="button" onClick={() => upload()} className="flex bg-white rounded-sm border-blue-600 border-2 px-16 py-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors duration-500" value={"Upload file"} />
            </div>
        </div>

    )
}