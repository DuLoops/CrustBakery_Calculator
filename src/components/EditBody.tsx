import { set } from "firebase/database"
import EditChart from "./EditChart"
import { useState } from "react"

interface Props {
    originalQuantity: any,
}

export default function EditBody(props: Props) {
    const [newQuantityData, setNewQuantityData] = useState<any[]>(props.originalQuantity.map(item => ({ ...item })));
    const [pagination, setPagination] = useState(0)


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewQuantityData((prev) => {
            prev[pagination].name = e.target.value
            return [...prev]
        }
        )
        console.log(props.originalQuantity)
        console.log(newQuantityData)
    }

    return (
        <div className="relative p-2 flex-auto">                            
            {/* Pagination */}
            <div className='flex justify-center items-center gap-3'>
                <button className='rounded-full bg-gray-300 p-1 text-xl' onClick={() => { setPagination((prev) => prev - 1 > 0 ? prev - 1 : 0) }}>{'<'}</button>
                <p># {pagination + 1}</p>
                <button className='rounded-full bg-gray-300 p-1 text-xl' onClick={() => { setPagination((prev) => prev + 1 < props.originalQuantity.length ? prev + 1 : prev) }}>{'>'}</button>
            </div>
            {/* Name Edit */}
            <div className="flex justify-center items-center gap-1">
                <p>Name: </p>
                <input type="text" className='border-2 border-gray-400 rounded-md p-1' onChange={handleNameChange} value={newQuantityData[pagination].name} />
            </div>
            <div></div>
            <EditChart originalQuantity={props.originalQuantity[pagination]} />
        </div> 
    )
}
