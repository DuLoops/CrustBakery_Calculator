import { useState, useEffect, useCallback } from 'react'
import { blindbakes } from '../quantityData.ts'

interface Props {
    day: string
}

export default function Chart(props: Props) {
    const originalQuantity = blindbakes[props.day]
    const [quantity, setQuantity] = useState(JSON.parse(JSON.stringify(originalQuantity)))
    const [total, setTotal] = useState(0)
    const [clicked, setClicked] = useState<string[]>([])
    let ogQuant, newQuant;
    if (clicked.length > 0) {
        ogQuant = originalQuantity[clicked[0]][clicked[1]]
        newQuant = quantity[clicked[0]][clicked[1]]
    }

    useEffect(() => {
        let sum = 0
        for (let item in quantity) {
            sum += quantity[item].fort + quantity[item].kiosk + quantity[item].order
        }
        setTotal(sum)
    }, [quantity])




    const handleRemoteClick = useCallback((num: number) => {
        console.log(originalQuantity[clicked[0]][clicked[1]])
        console.log(quantity[clicked[0]][clicked[1]])
        if (clicked.length === 0) return;
        let newNum = quantity[clicked[0]][clicked[1]] + num;
        setQuantity((prev: any) => {
            prev[clicked[0]][clicked[1]] = newNum
            if (prev[clicked[0]][clicked[1]] < 0) prev[clicked[0]][clicked[1]] = 0;
            return { ...prev };
        });
    }, [clicked]);
    

    return (
        <div className='text-xl box-border'>
            <div className='border-2 border-gray-600 my-8  bg-gray-200'>
                <table className='w-full table-fixed border-b-2 border-dashed'>
                    <thead>
                        <tr className='bg-gray-300'>
                            <th>Tart</th>
                            <th>Fort</th>
                            <th>Kiosk</th>
                            <th>Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quantity && Object.entries(quantity).map((item: any, index: any) => (
                            <tr key={index}>
                                <td className='p-2 border-r-2'>{item[0]}</td>
                                {Object.entries(item[1]).map((itemDet: any) => (
                                    <td key={itemDet[0]} className={`${(clicked[0] == item[0] && clicked[1] == itemDet[0]) && 'text-red-800 bg-pink-100' } `} onClick={() => setClicked([item[0], itemDet[0]])}>{itemDet[1]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center items-center gap-6 p-3 my-3'>
                    <button className='rounded-full bg-blue-300 w-12 h-12 text-2xl' onClick={() => { handleRemoteClick(1) }}>+</button>
                    {clicked.length > 1 && <p>{ogQuant}<span className='text-2xl'> {newQuant - ogQuant >= 0 && '+'} {newQuant - ogQuant}</span></p>}
                    <button className='rounded-full bg-red-300 w-12 h-12 text-2xl' onClick={() => { handleRemoteClick(-1) }}>-</button>
                </div>
            </div>
            <div className='flex justify-around mt-1 mb-6 bg-stone-200 py-2'>
                <div>
                    <p>Total</p>
                    <p className='text-blue-800 text-3xl'>{total}</p>
                </div>
                <div>
                    <p>Trays</p>
                    <p>30x<span className='text-pink-800 text-2xl'>{Math.trunc(total / 30)}</span> + <span className='text-rose-800 text-2xl'>{total % 30}</span></p>
                </div>
            </div>
        </div>
    )
}
