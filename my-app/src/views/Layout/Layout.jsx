import React from 'react'
import {Link} from "react-router-dom"

export default function Layout() {
  return (
    <>
    <div>
        <nav>
            <ul>
                <li>
                    <Link to="/product">Product</Link>
                </li>
                <li>
                    <Link to="/category">Category</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/form">Form</Link>
                </li>
                <li>
                    <Link to="/pratice">Pratice</Link>
                </li>
                <li>
                    <Link to="/todo">Todo App</Link>
                </li>
                <li>
                    <Link to="/Widget">Widget</Link>
                </li>
            </ul>
        </nav>
    </div>
    
    
    
    </>
  )
}
