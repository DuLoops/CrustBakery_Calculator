import { useState } from "react"

interface EditChartProps {
  newQuantityData: any
  setNewQuantityData: React.Dispatch<React.SetStateAction<any>>
  pagination: number
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


export default function EditChart(props: EditChartProps) {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, store:string, day: number) => {
    props.setNewQuantityData((prev) => {
      prev[props.pagination][store][day] = e.target.valueAsNumber
      return [...prev]
    })
  }

  return (
    <div>
      <table className="table-auto my-5 mx-auto">
        <thead>
          <tr>
            <th className="px-1">Days</th>
            <th className="px-1">Fort</th>
            <th className="px-1">Kiosk</th>
          </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <tr key={index}>
                <td className="border px-1">{day}</td>
                <td className="border px-1">
                  <input type="number" className="border px-1 w-12 text-xl" value={props.newQuantityData.fort[index]} 
      onChange={(e)=>handleNumberChange(e, 'fort', index)} />
                  </td>
                <td className="border px-1">
                  <input type="number" className="border px-1 w-12 text-xl" value={props.newQuantityData.kiosk[index]} 
                  onChange={(e)=>handleNumberChange(e, 'kiosk',index)}/>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}
