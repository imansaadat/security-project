import { useEffect } from 'react';
import Hash from "./components/Hash/Hash"


function App() {
  useEffect(() => {
    document.title = "Encryption | Decryption";
  }, []);

  return (
  <>
    <Hash />
  </>
  )
}

export default App
