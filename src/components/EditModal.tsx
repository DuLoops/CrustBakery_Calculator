import EditBody from "./EditBody"
import { useState } from "react"
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "../firebase";

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    originalQuantity: any[]
}
export default function EditModal(props: Props) {
    const [newQuantityData, setNewQuantityData] = useState<any[]>(props.originalQuantity.map(item => ({ ...item })));
    const [deletedDoc, setDeletedDoc] = useState<string[]>([])

    const handleClose =() => {
        if (window.confirm("Are you sure you want to close without saving?")) {
            props.setOpenModal(false)
        }
    }

    const handleSave = () => {
        let password = window.prompt("Please enter the password to save changes")
        if (password !== "1234") {
            window.alert("Wrong password!")
            return
        } else {
            newQuantityData.forEach(async (item) => {
                console.log(item)
                const docRef = doc(db, "blindBakes", item.id);
                await setDoc(docRef, {
                    name: item.name,
                    fort: item.fort,
                    kiosk: item.kiosk,
                    order: [0,0,0,0,0,0,0]
                });
            })
            deletedDoc.forEach(async (item) => {
                const docRef = doc(db, "blindBakes", item);
                await deleteDoc(docRef);
            })
            window.alert("New data saved!")
            props.setOpenModal(false)
        }

    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto mt-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-xl font-semibold">
                                Edit default data
                            </h3>
                            <button
                            onClick={()=>{props.setOpenModal(false)}}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <EditBody quantityData={newQuantityData} setQuantityData={setNewQuantityData} setDeletedDoc={setDeletedDoc}/>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )

    }