
"use client";
import { Input } from "./components/Input";
import React, { useState } from "react";
import Current from "./components/Current";
import { WeekForcast } from "./components/WeekForcast";
import { Details } from "./components/Details";



export default function Home() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")


  const handleSearch = async(e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
      e.preventDefault()
      try{


        const response = await fetch(`/api/${location}`)
        console.log('Response Status:', response.status);
  
        if(!response.ok){
          throw new Error()
        }

        const data1 = await response.json()
        setData(data1)
        setLocation("")
        setError("")

      }catch(error){
        setError("City not found")
        setData({})
      }
    }

  }

  let content; if (Object.keys(data).length ===0 && error === ''){

    content = (
      <div className="text-white text-center h-screen mt-[]5rem">
        <h2 className="text-3xl font-bold mb-4">Welcome to Wheather app</h2>
        <p className="text-xl">Enter a city name to get the weather forecast</p>
      </div>
    )

  }else if( error !== ""){
    content = (
      <div className="text-white text-center h-screen mt-[]5rem">
        <p className="text-3xl font-bold mb-4">City Not Found</p>
        <p className="text-xl">Enter Vaild City</p>
      </div>
    )
  }else{
    content = (
      <>
      <div className="flex md:flex-row flex-col p-12 items-center justify-between">
        <Current data = {data} />
        <WeekForcast data = {data}/>
      </div>
      <div>
        <Details data = {data}/>
      </div>
      </>
    )
  }
  
console.log(data)

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
      <div className="bg-white/25 w-full flex flex-col h-fit">
        <div className="flex flex-col justify-between md:flex-row items-center p-12">
          <Input handleSearch = {handleSearch} setLocation = {setLocation}/>
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">Wheather Update</h1>
        </div>
        {content}
      </div>
    </div>

  );
}
