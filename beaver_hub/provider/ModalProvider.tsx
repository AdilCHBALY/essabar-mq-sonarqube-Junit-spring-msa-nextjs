"use client"

import AlertModal from "@/components/modals/AlertModal"
import FillCarFuelModal from "@/components/modals/FillCarFuelModal"
import { useEffect, useState } from "react"



const ModalProvider = () => {
    const [mounted,setMounted]=useState(false)

    useEffect(()=>{
        setMounted(true)
    },[])


    if(!mounted) return null

    return (
        <>
            <AlertModal />
            <FillCarFuelModal />
        </>
    )
}

export default ModalProvider