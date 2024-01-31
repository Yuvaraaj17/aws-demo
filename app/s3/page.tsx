"use client"
import { useRef, useState } from "react";

export default function Upload() {
    const [file, setFile] = useState("")
    var filename=useRef("")

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

    const download = ()=>{
        var fileobj={filename:filename.current.value}
        
        fetch(
            "http://localhost:8000/s3/download",
            {
                method: "post",
                headers: {
                    'Content-type':'application/json'
                },
                body: JSON.stringify(fileobj)
                
                

            }
        ).then(
            (response)=>{ return response.json()}
        ).then((data)=>{console.log(data)})
    }

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <div className="flex flex-col w-[450px] h-[400px] bg-amber-200 gap-4 items-center justify-center shadow-lg">
                <p>AWS S3 Demo</p>
                <input type="file" onChange={() => handleChange(event)} className="flex border border-black bg-white p-2 rounded-sm" />
                <input type="button" onClick={() => upload()} className="flex bg-white rounded-sm border-blue-600 border px-16 py-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors duration-500" value={"Upload file"} />
                <input type="text" ref={filename} placeholder="Enter file name" className="border border-black rounded-sm px-3 py-2 focus:outline-none"/>
                <input type="button" onClick={() => download()} className="flex bg-white rounded-sm border-blue-600 border px-16 py-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors duration-500" value={"Download file"} />
            </div>
        </div>

    )
}


