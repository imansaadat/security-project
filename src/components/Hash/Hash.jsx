import React, { useState } from "react";
import { FaSmile } from "react-icons/fa";
import CryptoJS from "crypto-js";
import Modal from "../Modal/Modal";
const SECRET_PASS = "XkhZG4fW2t2W";

const Hash = () => {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");
  const [errorMessage, setErrorMessage] = useState("");
  const [encrptedData, setEncrptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [copyText, setCopyText] = useState(
    screen === "encrypt" ? "Copy Hash" : "Copy Text"
  );

  const [showCopyMessage, setShowCopyMessage] = useState("");

  const switchScreen = (type) => {
    setScreen(type);
    setCopyText(type === "encrypt" ? "Copy Hash" : "Copy Text"); // تنظیم متن دکمه
    setText("");
    setEncrptedData("");
    setDecryptedData("");
    setErrorMessage("");
  };

  // encryptData
  const encryptData = () => {
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        SECRET_PASS
      ).toString();
      setEncrptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Encryption failed");
    }
  };

  // decryptData
  const decryptData = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecryptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption failed. Please check the input");
    }
  };

  // handleClick
  const handleClick = () => {
    if (!text) {
      setErrorMessage("Please enter something");
      return;
    }
    if (screen === "encrypt") {
      encryptData();
      setOpenModal(!openModal);
    } else {
      decryptData();
      setOpenModal(!openModal);
    }
  };
  // handleCopy
  const handleCopy = () => {
    const textToCopy = screen === "encrypt" ? encrptedData : decryptedData;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        const message = screen === "encrypt" ? "Hash copied" : "Text copied";
        setShowCopyMessage(message);
        setCopyText(screen === "encrypt" ? "Copy Hash" : "Copy Text"); // تنظیم متن دکمه بر اساس حالت

        setTimeout(() => {
          setShowCopyMessage("");
          setCopyText(screen === "encrypt" ? "Copy Hash" : "Copy Text"); // بازگشت به متن اصلی دکمه
        }, 2000);
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

  return (
    <>
      <div
        onClick={() => {
          setOpenModal(false);
        }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-gray-900 overflow-hidden p-4 sm:p-6 lg:p-8"
      >
        {/*  shapes */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-700/30 rounded-full backdrop-blur-md animate-move1"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gray-800/25 rounded-full backdrop-blur-lg animate-move2"></div>
        <div className="absolute top-20 right-1/2 w-64 h-64 bg-blue-600/35 rounded-full backdrop-blur-md animate-move3"></div>

        {/*  glass card */}
        {!openModal ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="glass-shape w-full sm:w-3/4 lg:w-1/2 bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700 shadow-xl z-10"
          >
              <h2 className="lg:text-2xl flex items-center justify-center gap-2 text-center font-semibold text-white mb-5">
                Let's take a break and have some fun <FaSmile
                className="text-green-400 relative text-2xl top-[2px]"
              />
              </h2>
            <div className="flex justify-center gap-5">
              <button
                className={`bg-white w-full bg-opacity-10 border border-white/30 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-opacity-20 transition-colors duration-300 ${
                  screen === "encrypt" ? "bg-opacity-30" : ""
                }`}
                onClick={() => {
                  switchScreen("encrypt");
                }}
              >
                Encrypt
              </button>

              <button
                className={`bg-white w-full bg-opacity-10 border border-white/30 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-opacity-20 transition-colors duration-300 ${
                  screen === "decrypt" ? "bg-opacity-30" : ""
                }`}
                onClick={() => {
                  switchScreen("decrypt");
                }}
              >
                Decrypt
              </button>
            </div>
            <textarea
              className="w-full h-1/2 p-4 my-5 bg-white bg-opacity-10 border border-white/30 text-white font-medium rounded-lg shadow-md focus:outline-none focus:bg-opacity-20 transition-colors duration-300 placeholder-white/50 resize-none"
              value={text}
              rows={6}
              onChange={({ target }) => setText(target.value)}
              placeholder={
                screen === "encrypt"
                  ? "Please enter your text"
                  : "Please enter encrypted data"
              }
            ></textarea>
            {errorMessage && (
              <div className="text-red-800 text-lg font-semibold p-4 bg-white bg-opacity-20 border border-white/30 rounded-lg shadow-lg backdrop-blur-sm animate-shake">
                {errorMessage}
              </div>
            )}

            <button
              className={`bg-white w-full bg-opacity-10 border border-white/30 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-opacity-20 transition-colors duration-300 ${
                errorMessage ? "mt-5" : ""
              }`}
              onClick={handleClick}
            >
              {screen === "encrypt" ? "Encrypt" : "Decrypt"}
            </button>
          </div>
        ) : (
          <Modal
            encrptedData={encrptedData}
            decryptedData={decryptedData}
            screen={screen}
            open={openModal}
            handleCopy={handleCopy}
            showCopyMessage={showCopyMessage}
            copyText={copyText}
            close={() => {
              setOpenModal(!openModal);
            }}
            setShowCopyMessage={setShowCopyMessage}
          />
        )}
      </div>
    </>
  );
};

export default Hash;
