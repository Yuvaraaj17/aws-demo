'use client'
import { METHODS } from "http"
import { MouseEvent, useState } from "react"

export default function DyanamoDB() {

    const [formdata,setFormdata]=useState({
        email:'',
        username:'',
        age:'',
        vehicle:''
    })

    const handleOnchange = (event : any)=>{
        setFormdata({
            ...formdata,
            [event.target.name]:event.target.value
        })
    }

    const add = ()=>{
        
        fetch(
            "http://localhost:8000/dynamodb/add",
            {
                method: "POST",
                body: JSON.stringify(formdata),
                headers:{
                    'Content-type':'application/json'
                }

            }
        ).then((response)=>{
            console.log(response.statusText)
        })
    }

    const get = ()=>{
        fetch(
            "http://localhost:8000/dynamodb/get",
            {
                method: "get",
            }
        
        ).then((response)=>{
            return response.json()
        }).then((data)=>data.forEach((element: any) => {
            console.log(element)})
        )
    }


    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-400">
            <form className="flex flex-col gap-5 p-16 items-start justify-center bg-white">
                <p className="flex items-center justify-center w-full">Dynamo DB Example</p>
                <input name="email" onChange={(event)=>handleOnchange(event)} type="email" required className="border border-black focus:outline-none p-2 rounded-sm" placeholder="example@email.com" />
                <input name="username" onChange={(event)=>handleOnchange(event)} type="text" className="border border-black focus:outline-none p-2 rounded-sm" placeholder="Enter your name" />
                <input name="age" onChange={(event)=>handleOnchange(event)} type="number" className="border border-black focus:outline-none p-2 rounded-sm" placeholder="Age.." />
                <div className="flex flex-row gap-5">
                <label htmlFor="bike" onClick={(event)=>handleOnchange(event)} className="flex flex-row gap-3">Bike<input id="bike" type="radio" value={"Bike"}className="border border-black focus:outline-none p-2 rounded-sm" name="vehicle"/></label>
                <label htmlFor="car" onClick={(event)=>handleOnchange(event)} className="flex flex-row gap-3">Car<input id="car" type="radio" value={"Car"}className="border border-black focus:outline-none p-2 rounded-sm" name="vehicle"/></label>
                <label htmlFor="none" onClick={(event)=>handleOnchange(event)} className="flex flex-row gap-3">None<input id="none" type="radio" value={"None"}className="border border-black focus:outline-none p-2 rounded-sm" name="vehicle"/></label>
                </div>
                <input type="button" onClick={() => add()} className="flex bg-white rounded-sm border-blue-600 border px-16 py-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors duration-500" value="Add record" />
                <input type="button" onClick={() => get()} className="flex bg-white rounded-sm border-blue-600 border px-16 py-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors duration-500" value="Get Values" />
            </form>
        </div>

    )
}