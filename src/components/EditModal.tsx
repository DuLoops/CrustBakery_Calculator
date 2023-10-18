import EditBody from "./EditBody"
interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    originalQuantity: any[]
}
export default function EditModal(props: Props) {

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
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
                                onClick={() => props.setOpenModal(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <EditBody originalQuantity={props.originalQuantity}/>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => props.setOpenModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => props.setOpenModal(false)}
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
