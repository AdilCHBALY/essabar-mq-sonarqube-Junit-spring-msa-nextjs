import { Leaf } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import UserProfile from "./UserProfile"
import MainNav from "./navigation/MainNav"


const Navbar =  async () => {

    return (
        <div className="border-b bg-inherit z-10 sticky top-0">
            <div className="flex h-16 items-center px-4">
                <div className="flex items-center text-primary gap-x-2 font-semibold text-xl">
                    <Leaf className="w-10 h-10" />
                    BeaverHub
                </div>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserProfile />
                </div>
            </div>
        </div>
    )
}

export default Navbar