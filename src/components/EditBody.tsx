import EditChart from "./EditChart"
import { useState } from "react"


interface Props {
    quantityData: any,
    setQuantityData: React.Dispatch<React.SetStateAction<any[]>>,
    setDeletedDoc: React.Dispatch<React.SetStateAction<string[]>>
}

export default function EditBody(props: Props) {
    const [pagination, setPagination] = useState(0)

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setQuantityData((prev) => {
            prev[pagination].name = e.target.value
            return [...prev]
        }
        )
    }

    const handleDocDelete = () => {
        props.setDeletedDoc((prev) => {
            const newPrev = [...prev]
            newPrev.push(props.quantityData[pagination].id)
            return newPrev
        })
        props.setQuantityData((prev) => {
            const newPrev = [...prev]
            newPrev.splice(pagination, 1)
            return newPrev
        })
        window.alert("Doc deleted!")
    }

    const handleDocAdd = () => {
        props.setQuantityData((prev) => {
            const newPrev = [...prev]
            newPrev.push({
                name: 'New Doc',
                id: Date.now().toString(),
                fort: [0, 0, 0, 0, 0, 0, 0],
                kiosk: [0, 0, 0, 0, 0, 0, 0],
                order: [0, 0, 0, 0, 0, 0, 0]
            })
            return newPrev
        })
        setPagination(props.quantityData.length)
    }

    return (
        <div className="relative p-2 flex-auto">                            
            {/* Pagination */}
            <div className='flex justify-center items-center gap-3'>
                <button className='rounded-full bg-gray-300 p-1 text-xl' onClick={() => { setPagination((prev) => prev - 1 > 0 ? prev - 1 : 0) }}>{'<'}</button>
                <p># {pagination + 1}</p>
                <button className='rounded-full bg-gray-300 p-1 text-xl' onClick={() => { setPagination((prev) => prev + 1 < props.quantityData.length ? prev + 1 : prev) }}>{'>'}</button>
            </div>
            {/* Name Edit */}
            <div className="flex justify-center items-center gap-1 m-2">
                <p>Name: </p>
                <input type="text" className='border-2 border-gray-400 rounded-md p-1' onChange={handleNameChange} value={props.quantityData[pagination].name} />
            </div>
            <EditChart newQuantityData={props.quantityData[pagination]} setNewQuantityData={props.setQuantityData} pagination={pagination}/>
            <button className='rounded bg-blue-400 p-2 ml-2' onClick={handleDocAdd}>Add Item</button>            
            <button className='rounded bg-red-400 p-2' onClick={handleDocDelete}>Delete Item</button>
        </div> 
    )
}
