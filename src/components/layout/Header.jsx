import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NavLink } from "react-router-dom"

export const Header =()=>{
    return(
        <>
        <header>
        <nav className="bg-gray-800 p-4">
            <div className="flex items-center justify-between">
                <div>

                <h1 className="text-white text-lg">ManishQuery</h1>
                </div>
                <div className="gap-5 hidden md:flex">
                    <NavLink to="/" className="text-gray-300 hover:text-white">Home</NavLink>
                    <NavLink to="/trad" className="text-gray-300 hover:text-white">FetchOld</NavLink>
                    <NavLink to="/rq" className="text-gray-300 hover:text-white">FetchNew</NavLink>
                    <NavLink to="/infinite" className="text-gray-300 hover:text-white">Infinite</NavLink>
                </div>
            </div>
        </nav>  
    </header>
    </>
        
    )
}