import { Link } from "react-router-dom"

export default function Header() {
    return(
        <div className="title-container">
                <h1 className="title text-7xl text-center text-pink my-16"><Link to="/">MyBills App</Link></h1>
        </div>
    )
}