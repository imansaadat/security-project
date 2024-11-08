import React from "react";
import { FaCopy,FaSmile,FaTimes } from "react-icons/fa";
const Modal = ({close,open,encrptedData,decryptedData,screen,handleCopy,showCopyMessage,setShowCopyMessage,copyText}) => {
  return (
   <>
    {/* overlay */}
     <div onClick={(e)=>{
      e.stopPropagation()
    }} className={`relative lg:w-1/2 min-h-[60vh] duration-500 glass-shape rounded-2xl ${open ? "opacity-100" : "opacity-0"}`}>
      <span onClick={close} className="absolute top-4 right-4 cursor-pointer text-white duration-300 hover:opacity-60"><FaTimes size={25}/></span>
     {encrptedData || decryptedData ? (
       <div className="p-6">
            <h2 className="text-center text-white text-2xl mb-6">{screen === "encrypt" ? "ENCRYPTED" : "DECRYPTED"} DATA</h2>
            <p className="text-white break-words leading-7">{screen === "encrypt" ? encrptedData : decryptedData}</p>
             <span className="flex gap-2 items-center justify-center bg-white bg-opacity-10 border border-white/30 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-opacity-20 transition-colors duration-300 cursor-pointer mt-5" onClick={handleCopy}>{copyText}<FaCopy size={20} /></span>
             {showCopyMessage && <p className="flex items-center justify-center gap-2 text-2xl text-green-400 text-center mt-5 capitalize">{showCopyMessage} <FaSmile className="relative top-[2px]" size={25}/></p>}
          </div>
        ) : null
        }
     </div>
    </>
  );
};

export default Modal;
