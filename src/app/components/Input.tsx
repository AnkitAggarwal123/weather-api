import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface inputProps  {
    handleSearch: () => void
    setLocation: React.Dispatch<React.SetStateAction<string>>
}



export const Input = ({handleSearch, setLocation}: inputProps) => {

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (input === "") {
        alert("Input field is empty");
      } else {
        handleSearch();
        setInput("");
      }
    }
  };

  const [input, setInput] = useState("")

  return (
    <form className="flex items-center md:w-2/4 w-full order-2 md:order-1">
        <input type="text"
        placeholder="Search City..."
        className="w-full bg-transparent border-b-2 placeholder-white outline-none text-white"
        onChange={(e)=> {setLocation(e.target.value) 
        setInput(e.target.value)}}
        value={input}
        onKeyDown={handleKeyPress}
         />

        <div onClick={()=>{ 
          if(input == ""){
            alert("Input feild is empty")
          }else{
          handleSearch()
          setInput("")}
          }
        } className="ml-[-25] text-white cursor-pointer hover:size-8"><AiOutlineSearch /></div>
    </form>
  )
}
