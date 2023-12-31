"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Power, PowerOff } from "lucide-react"



const OnOff = () => {
    const [status,setStatus]=useState(false)

    return (
        <Button variant="outline" size="icon" onClick={()=>setStatus(!status)}>
            {status ? <Power className="w-6 h-6 text-emerald-500" /> : <PowerOff className="w-6 h-6 text-rose-500" />}
        </Button>
    )
}

export default OnOff