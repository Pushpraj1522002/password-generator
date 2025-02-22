import {useState, useCallback, useEffect, useRef} from 'react'

function App() { 
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(){}[]|?><,.:;_+-="

    for(let i = 1; i <= length; i++){
      let charIndex = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(charIndex)
    }

    setPassword(pass);


  },[length, numAllowed,charAllowed,setPassword])


  //Copy to clipboard
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3); 
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed,charAllowed, passwordGenerator])



   return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 pb-2'>
        
        {/* title */}
        <h1 className='text-white text-center pb-2 pt-2'>Password Generator</h1>

        {/* input field */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3 bg-white '
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='text-white bg-blue-700 outline-none px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        {/* input sclider */}
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          {/* Number allowed checkbox */}
          <div className='flex items-center gap-x-1'>
             <input 
             type="checkbox" 
             defaultChecked ={numAllowed}
             id='numberInput'
             onChange={()=>{
              setNumAllowed((prev) => !prev);
             }}
             />
              <label htmlFor='numberInput'>Numbers</label>
          </div>

          {/* Special Character Allowed checkbox */}
          <div className='flex items-center gap-x-1'>
             <input    
             type="checkbox" 
             defaultChecked ={charAllowed}
             id='charInput'
             onChange={()=>{
              setCharAllowed((prev) => !prev);
             }}
             />
              <label htmlFor='charInput'>character</label>
          </div>
            
        </div>
      </div>
    </>
  )
}

export default App
