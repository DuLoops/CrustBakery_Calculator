import { useState, useEffect } from 'react'
import { db } from '../firebase.ts'
import { query, collection, getDocs } from 'firebase/firestore'
import Chart from '../components/Chart.tsx'
import EditModal from '../components/EditModal.tsx'

export default function BlindTartCalculator(props: any) {
    const [originalQuantity, setOriginalQuantity] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "blindBakes"));

                const querySnapshot = await getDocs(q);
                const data: any[] = [];
                querySnapshot.forEach((doc) => {
                    const docD = doc.data()
                    docD.id = doc.id;
                    data.push(docD);
                });
                setOriginalQuantity(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [openModal])


    return (
        <div>
            <Chart originalQuantity={originalQuantity} day={props.day} />
            <button className='rounded bg-blue-100 p-2' onClick={() => { location.reload() }}>Reset</button>
            <button className='rounded bg-red-100 p-2 ml-2' onClick={() => { setOpenModal(!openModal) }}>Edit</button>
            {openModal && <EditModal setOpenModal={setOpenModal} originalQuantity={originalQuantity} />}
        </div>
    )
}
