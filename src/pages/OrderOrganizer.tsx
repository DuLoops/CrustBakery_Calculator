import { useState } from 'react'
import OOViewOrder from '../components/OOViewOrder'
const blindTart = ['Mer', 'Cho', 'Chai', 'Pist']
const tart = ['Chz', 'Pec', 'CrB', 'Mince', 'Fran']
const quiche = ['Bacon', 'Zuc', 'Mush']
const savPastry = ['Sausage', 'Ham', 'Tom', 'Asp(veg)', 'Asp(meat)']
const sweetPastry = ["SC", 'LY', 'BL', 'AP', 'Croissant', 'Cho-Croi', "TW"]
const allItems = [...blindTart, ...tart, ...quiche, ...savPastry, ...sweetPastry]
const leftItemsObjects = [{ name: 'Blind Tart', array: blindTart },
{ name: 'Tart', array: tart },
{ name: 'Quiche', array: quiche }]
const rightItemObjects = [{ name: 'Sav Pastry', array: savPastry },
{ name: 'Sweet Pastry', array: sweetPastry },]
const tables = [leftItemsObjects, rightItemObjects]

interface ItemDataType {
    mini: number;
    reg: number;
}

interface ItemType {
    [key: string]: ItemDataType;
}


export default function OrderOrganizer() {
    const [items, setItems] = useState<ItemType>(allItems.reduce((a, v) => ({ ...a, [v]: { mini: 0, reg: 0 } }), {}))
    const [clickedItem, setClickedItem] = useState<null | { itemName: string, type: keyof ItemDataType }>(null)
    const [viewOrder, setViewOrder] = useState(false)
    const [output, setOutput] = useState("")

    const handleRemoteClick = (num: number) => {
        if (clickedItem !== null) {
            let newNum = items[clickedItem.itemName][clickedItem.type] + num;
            if (newNum < 0) newNum = 0
            setItems(prev => ({
                ...prev,
                [clickedItem.itemName]: {
                    ...prev[clickedItem.itemName],
                    [clickedItem.type]: newNum
                }
            }));
        }
    };

    const print = () => {
        let textData = ""
        const newLine = '\n';
        for (const category of leftItemsObjects) {
            let paragraph = ''
            for (let item of category.array) {
                if (items[item].mini > 0) paragraph += ' - Mini ' + item + ' X ' + items[item].mini + newLine
                if (items[item].reg > 0) paragraph += ' - Reg ' + item + ' X ' + items[item].reg + newLine
            }
            if (paragraph.length > 0) {
                paragraph = category.name + newLine + paragraph
                textData += paragraph + newLine
            }
        }
        for (const category of rightItemObjects) {
            let paragraph = ''
            for (let item of category.array) {
                if (items[item].mini > 0) paragraph += ' - Mini ' + item + ' X ' + items[item].mini + newLine
                if (items[item].reg > 0) paragraph += ' - Reg ' + item + ' X ' + items[item].reg + newLine
            }
            if (paragraph.length > 0) {
                paragraph = category.name + newLine + paragraph
                textData += paragraph + newLine
            }
        }
        return textData
    }

    const handleViewOrder = () => {
        if (!viewOrder) {
            setOutput(print())
            setViewOrder(true)
        } else setViewOrder(false)
    }

    const handleShare = () => {
        if (!clickedItem) {
            alert("No data")
            return
        }
        let textData = print()
    
        window.open(`https://wa.me/?text=${encodeURIComponent(textData)}`, "_blank", "noreferrer");
    }

    

    return (
        <div>
            <div className='border-2 border-gray-600 mt-6 mb-3  bg-gray-200 flex' >
                {tables.map(table => (<table className='w-full table-auto border-2 border-collapse	'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mini</th>
                            <th>Reg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((itemObj) => (
                            <>
                                <tr className='border-t-2 border-dotted border-gray-500'><td colSpan={3} className='text-gray-400 text-sm'>{itemObj.name}</td></tr>
                                {itemObj.array.map(itemName => (
                                    <tr key={itemName}>
                                        <td >{itemName}</td>
                                        <td onClick={() => setClickedItem({ itemName: itemName, type: 'mini' })} className={`${itemName == clickedItem?.itemName && clickedItem?.type == 'mini' && 'text-red-500 bg-red-100'}`}>{items[itemName].mini}</td>
                                        <td onClick={() => setClickedItem({ itemName: itemName, type: 'reg' })} className={`${itemName == clickedItem?.itemName && clickedItem?.type == 'reg' && 'text-red-500 bg-red-100'}`}>{items[itemName].reg}</td>
                                    </tr>
                                ))}
                            </>
                        ))}
                    </tbody>
                </table>))}
            </div>
            <div className='flex justify-center items-center gap-3'>
                <button className='w-10 h-10 rounded-full bg-red-200 border-2 border-red-400' onClick={() => handleRemoteClick(-1)}>-1</button>
                <button className='w-14 h-14 rounded-full bg-red-300 border-2 border-red-400' onClick={() => handleRemoteClick(-6)}>-6</button>
                <p className='border-2 border-black p-3'>{clickedItem != null && items[clickedItem.itemName][clickedItem.type]}</p>
                <button className='w-14 h-14 rounded-full bg-blue-300 border-2 border-blue-400' onClick={() => handleRemoteClick(6)}>+6</button>
                <button className='w-10 h-10 rounded-full bg-blue-300 border-2 border-blue-400' onClick={() => handleRemoteClick(1)}>+1</button>
            </div>
            <div className='flex items-center justify-center mt-1'>
            <button onClick={handleViewOrder} className="inline-flex items-center mb-1 mr-1 py-1 px-2 text-sm rounded-full text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" >View summary</button>
            <button className="inline-flex items-center mb-1 mr-1 py-1 px-2 text-sm rounded-full text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700"  rel="noopener" onClick={handleShare} aria-label="Share on Whatsapp" draggable="false">
                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                    <title>Whatsapp</title>
                    <path d="M413 97A222 222 0 0 0 64 365L31 480l118-31a224 224 0 0 0 330-195c0-59-25-115-67-157zM256 439c-33 0-66-9-94-26l-7-4-70 18 19-68-4-7a185 185 0 0 1 287-229c34 36 56 82 55 131 1 102-84 185-186 185zm101-138c-5-3-33-17-38-18-5-2-9-3-12 2l-18 22c-3 4-6 4-12 2-32-17-54-30-75-66-6-10 5-10 16-31 2-4 1-7-1-10l-17-41c-4-10-9-9-12-9h-11c-4 0-9 1-15 7-5 5-19 19-19 46s20 54 23 57c2 4 39 60 94 84 36 15 49 17 67 14 11-2 33-14 37-27s5-24 4-26c-2-2-5-4-11-6z">
                    </path>
                </svg>
                <span className="ml-1">Share on Whatsapp</span>
            </button>
            </div>
            {viewOrder && <OOViewOrder output={output} setViewOrder={setViewOrder}/>}
        </div>
    )
}
