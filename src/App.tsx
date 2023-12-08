import './App.css'
import BlindTartCalculator from './pages/BlindTartCalculator.tsx'
import OrderOrganizer from './pages/OrderOrganizer.tsx'
import { useState } from 'react'
const menuItems = ['Order Organizer', 'Blind Tarts Calculator']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function App() {
  const date = new Date()
  const day = date.getDay()

  const [menu, setMenu] = useState(menuItems[0])

  return (
    <div id='main' className='bg-stone-300 min-h-screen'>
      <h1 className='text-2xl mt-2'>Crust Bakery Helper</h1>
      <p className='mb-2'>Day: {date.getMonth() + '/' + date.getDate() + ' (' + dayNames[day] + ')'}</p>
      <div className='flex gap-2 justify-center items-center mt-3'>
        <p>Menu: </p>
        {menuItems.map((item, i) => (
          <button key={i} className={`rounded border-2 p-1 ${item == menu ? 'border-green-500 bg-green-200' : 'border-gray-500'}`} onClick={()=>setMenu(item)}>{item}</button>
        ))}
      </div>
      {menu == 'Order Organizer' && <OrderOrganizer/>}
      {menu == 'Blind Tarts Calculator' && <BlindTartCalculator day={day}/>}
    </div>
  )
}

export default App
