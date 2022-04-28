import { Link, useLocation } from "react-router-dom"



export default function NotificationModal(props) {
    const location = useLocation()
    return (
        <>
            <div
                className="justify-center bg-black-300 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className={`${props.color} relative text-white w-auto p-8 my-6 mx-auto max-w-3xl`}>

                    <h3 className="center bold text-center text-xl">{props.message}</h3>
                    <div className="modal-footer flex items-center justify-center p-4">
                        <Link to="/">
                            <button className="justify-center text-white text-l bg-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150" onClick={props.action}>Close</button>
                        </Link>

                    </div>

                </div>
            </div>
        </>
    )
}