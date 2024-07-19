"use client"
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [subject, setSubject] = useState({subject:"",attended:0,notAttended:0})
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
      let substring = localStorage.getItem("subjects")
      if (substring) {
          let subjectt = JSON.parse(localStorage.getItem("subjects"))
          setSubjects(subjectt)
          console.log(subjectt)
      }
      console.log(subjects)
  }, [])

  const saveToLS = (a = subjects) => {
      localStorage.setItem("subjects", JSON.stringify(a))
  }

  const handleChange = (e) => {
      setSubject(e.target.value)
  }
  const handleAdd = (e) => {
    if(subject.subject !== ""){
    toast.success('Subject Added!', {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      e.preventDefault()
      subjects.push({ id: uuidv4(), subject, attended: 0, notAttended: 0 })
      setSubject({subject:"",attended:0,notAttended:0})
      console.log(subjects)
      saveToLS()
  }}

  return (
      <>
      <ToastContainer
position="bottom-right"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
          <div className='bg-black w-[100vw] h-[100vh] text-white flex flex-col gap-1.5'>
              <h2 className='w-full min-h-[52px] bg-gray-800 flex justify-center items-center text-4xl font-bold tracking-[9px] md:tracking-[15px]'>ATTENDENCE</h2>
              <form autoComplete='off' className='w-full flex flex-col justify-center items-center bg-slate-700 min-h-[15vh] gap-3'>
                  <input onChange={handleChange} type="text" name="subject" id="subject" placeholder='Subject' className='px-3 py-2 bg-[#656c6c] rounded-lg' value={subject.subject}/>
                  <button onClick={handleAdd} className='border px-2 py-1 rounded-xl bg-black  font-bold'>Submit</button>
              </form>
              <div className='w-full    bg-gray-900 '>
                  <div className='md:w-3/5 mx-auto py-3'>
                      <div className='w-full mb-4 px-5 h-10 flex justify-between bg-[#1a1a63] items-center rounded-lg'>
                          <h2>Subject</h2>
                          <h2>Actions </h2>
                      </div>
                      <div>
                          {subjects.length === 0 && <div>No Subject To Display</div>}
                          {subjects.map((item) => {
                         return( <div key={item.id} className='w-full px-5 py-2 flex flex-col bg-[#20412e] items-center justify-center  rounded-lg mb-3 lg:hover:scale-105 transition-all gap-3'>
                            <div className='flex'>

                            
                              <div className='flex flex-col w-[50%] '>
                              <h2 className='font-bold text-2xl'>{item.subject}</h2>
                              <div className="flex gap-2 flex-col">
                                  <h2><u>Attended</u> : {item.attended}</h2>
                                  <h2><u>Not Attended</u> : {item.notAttended}</h2>
                                  <h2><u>Total</u> : {item.attended + item.notAttended} </h2>
                                  {item.attended + item.notAttended === 0 && <h2><u>Percentage </u> : 0%</h2>}
                                  {item.attended + item.notAttended !== 0 && <h2><u>Percentage </u> : {(item.attended*100/((item.attended) + (item.notAttended))).toString().slice(0,5)}%</h2>}
                                  
                                  
                                  </div>
                              </div>
                              <div className="actions flex justify-center items-center w-1/2 flex-col md:flex-row gap-2">
                                  <button className='border px-2 py-1 rounded-xl bg-[#265543] mr-2 hover:bg-[#5bc59c] text-sm' onClick={()=>{
                                    let newSub = (subjects.map((sub)=>{
                                        if(sub.id === item.id){
                                            return {...sub,attended:sub.attended+1}
                                        }
                                        return sub
                                    }))
                                    setSubjects(newSub)
                                    saveToLS(newSub)
                                  }}>Attended</button>
                                  <button className='border px-2 py-1 rounded-xl bg-[#265543] mr-2 hover:bg-[#5bc59c] text-sm' onClick={()=>{
                                    let newSub = (subjects.map((sub)=>{
                                      if(sub.id === item.id){
                                        return {...sub,notAttended:sub.notAttended+1}
                                      }
                                      return sub
                                    }))
                                    setSubjects(newSub)
                                    saveToLS(newSub)
                                  }}>Not Attended</button>
                                  <button className='border px-2 py-1 rounded-xl bg-[#265543] mr-2 hover:bg-[#5bc59c] text-sm' onClick={()=>{
                                    let newSub = (subjects.map((sub)=>{
                                      if(sub.id === item.id){
                                        if(sub.attended>0){
                                        return {...sub,attended:sub.attended-1}
                                        }
                                      }
                                      return sub
                                    }))
                                    setSubjects(newSub)
                                    saveToLS(newSub)
                                  }}>Delete Previous Attend</button>
                                  <button className='border px-2 py-1 rounded-xl bg-[#265543] mr-2 hover:bg-[#5bc59c] text-sm' onClick={()=>{
                                    let newSub = (subjects.map((sub)=>{
                                      if(sub.id === item.id){
                                        if(sub.notAttended>0){
                                        return {...sub,notAttended:sub.notAttended-1}
                                      }}
                                      return sub
                                    }))
                                    setSubjects(newSub)
                                    saveToLS(newSub)
                                  }}>Delete Previous NotAttend</button>
                              </div>
                              </div>
                              <button className='bg-red-500 w-full py-2 rounded-2xl focus:bg-red-800 focus' onClick={
                                ()=>{
                                  let dell = confirm("Do You really Want to Delete this Subject? Press Ok to Confirm")
                                  if (dell){
                                    
                                    let newSub = subjects.filter((sub)=>sub.id !== item.id)
                                    setSubjects(newSub)
                                    saveToLS(newSub)
                                  }
                                }
                              }>Delete Subject</button>
                          </div>)
                          })}
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default App
