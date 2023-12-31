import { Car } from "@/models/Car.model";
import { create } from "zustand";


export type ModalType = "TrashCar" | "AddFuel"

interface useStoreModalProps{
    type:ModalType | null
    data:Car | null
    isOpen: boolean;
    onOpen:(type:ModalType,data?:Car)=>void;
    onClose:()=>void;
}




export const useStoreModal=create<useStoreModalProps>((set)=>({
    type:null,
    data:null,
    isOpen:false,
    onOpen:(type,data)=>set({isOpen:true,type,data}),
    onClose:()=>set({isOpen:false,type:null})
}))