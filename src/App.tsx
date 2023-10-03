import './App.css'
import Chart from './components/Chart'
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
function App() {
  const date = new Date()
  let day = dayNames[date.getDay()]
  return (
    <div id='main' className='bg-stone-300 h-screen'>
      <div className='title my-3'>
        <h1 className='text-2xl'>Blind Tarts Calculator</h1>
      </div>
      <Chart day={day.toLocaleLowerCase()}/>
      <p className='mt-2'>Day: {date.getMonth() + '/' + date.getDate() + ' (' + day + ')'}</p>
      <button className='rounded bg-blue-100 p-1' onClick={()=>{location.reload()}}>Reset</button>
    </div>
  )
}

export default App
