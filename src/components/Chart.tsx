
import { useState, useEffect, useCallback } from 'react'


interface Props {
    originalQuantity: any[],
    day: number
}

const columns = ['fort', 'kiosk', 'order']
const clickedItemIndex = 0, clickedColumnIndex = 1;

export default function Chart(props: Props) {
    const [quantity, setQuantity] = useState<any[]>([]);
    const [total, setTotal] = useState(0)
    const [clicked, setClicked] = useState<[number, number]| null>(null)

    const [clickedOgQuant, setclickedOgQuant] = useState(0)
    const [clickedNewQuant, setclickedNewQuant] = useState(0)

    useEffect(() => {
        setQuantity(JSON.parse(JSON.stringify(props.originalQuantity)))
    }, [props.originalQuantity])

    useEffect(() => {
        let sum = 0
        for (let item in quantity) {
            for (let column of columns) {
                sum += quantity[item][column][props.day]
            }
        }
        setTotal(sum)
    }, [quantity])

    useEffect(() => {
        if(clicked) {
            setclickedOgQuant(props.originalQuantity[clicked[clickedItemIndex]][clicked[clickedColumnIndex]][props.day])
            setclickedNewQuant(quantity[clicked[clickedItemIndex]][clicked[clickedColumnIndex]][props.day])
        }
    },[clicked, quantity])

    const handleRemoteClick = useCallback((num: number) => {
        if (clicked === null) return;
        let newNum = quantity[clicked[clickedItemIndex]][clicked[clickedColumnIndex]][props.day] + num;
        if (newNum < 0) newNum = 0;
        setQuantity((prev: any) => {
            prev[clicked[clickedItemIndex]][clicked[clickedColumnIndex]][props.day] = newNum
            return [...prev];
        });
    }, [clicked]);


    return (
        <div className='text-xl box-border'>
            <div className='border-2 border-gray-600 my-8  bg-gray-200'>
                <table className='w-full table-fixed border-b-2 border-dashed'>
                    <thead>
                        <tr className='bg-gray-300'>
                            <th>Tart</th>
                            {columns.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {quantity && quantity.map((item: any, itemIndex: any) => (
                            <tr key={itemIndex}>
                                <td className='p-2 border-r-2'>{item.name}</td>
                                {columns.map((column: any) => (
                                    <td key={column} className={`${clicked && (clicked[clickedItemIndex] == itemIndex && clicked[clickedColumnIndex] == column) && 'text-red-800 bg-pink-100'} `} onClick={() => setClicked([itemIndex, column])}>{item[column][props.day]}</td>
                                ))
                                }
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <div className='flex justify-center items-center gap-6 p-3 my-3'>
                    <button className='rounded-full bg-blue-300 w-12 h-12 text-2xl' onClick={() => { handleRemoteClick(1) }}>+</button>
                    {clicked && <p>{clickedOgQuant} <span className='text-2xl text-bold'> {clickedNewQuant - clickedOgQuant >= 0 && '+'} {clickedNewQuant - clickedOgQuant}</span></p>}
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
