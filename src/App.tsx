import './App.css'
import Chart from './components/Chart'
import { useState, useEffect } from 'react'
import { db } from './firebase.ts'
import {query, collection, getDocs} from 'firebase/firestore'
import EditModal from './components/EditModal.tsx'
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function App() {
  const date = new Date()
  const day = date.getDay()
  const [originalQuantity, setOriginalQuantity] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const q = query(collection(db, "blindBakes"));

            const querySnapshot = await getDocs(q);
            const data: any[] = [];
            querySnapshot.forEach((doc) => {
                const docD = doc.data()
                docD.id = doc.id;
                data.push(docD);
            });
            setOriginalQuantity(data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchData();
}, [openModal])

  console.log(originalQuantity)

  return (
    <div id='main' className='bg-stone-300 h-screen'>
      <div className='title my-3'>
        <h1 className='text-2xl'>Blind Tarts Calculator</h1>
      </div>
      <Chart originalQuantity={originalQuantity} day={day}/>
      <p className='mt-2'>Day: {date.getMonth() + '/' + date.getDate() + ' (' + dayNames[day] + ')'}</p>
      <button className='rounded bg-blue-100 p-2' onClick={()=>{location.reload()}}>Reset</button>
      <button className='rounded bg-red-100 p-2 ml-2' onClick={()=>{setOpenModal(!openModal)}}>Edit</button>
      {openModal && <EditModal setOpenModal={setOpenModal} originalQuantity={originalQuantity}/>}
    </div>
  )
}

export default App
