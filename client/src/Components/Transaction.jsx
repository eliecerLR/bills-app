import { useState, useRef } from 'react'
import arrowDownImg from '../img/icons/arrow-down.png'
import arrowUpImg from '../img/icons/arrow-up.png'
import ModifyModal from './ModifyModal'
import NotificationModal from './NotificationModal'


export default function Transaction(props) {

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [showModifyModal, setShowModifyModal] = useState(false)
    const modifyForm = useRef(null)

    const handleDelete = async (key) => {
        const userConfirmation = window.confirm('Are you sure do you want to delete this transaction?')

        if (userConfirmation) {
            fetch(`http://localhost:4500/api/transaction/remove/${key}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            }).then(msg => {
                if (msg.ok) {
                    setShowSuccessModal(true)
                }
            }).catch(e => {
                if (e) {
                    setShowErrorModal(true)
                    console.log(e)
                }
            })
        }
    }

    const handleModify = async (key) => {

        const formData = new FormData(modifyForm.current)
        const userData = {
            concept: formData.get('concept'),
            amount: parseFloat(formData.get('amount')),
            category: formData.get('category')
        }

        const userConfirmation = window.confirm('Are you sure do you want to update this transaction?')

        if (userConfirmation) {

            await fetch(`http://localhost:4500/api/transaction/modify/${key}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then(msg => {
                if (msg.ok) {
                    setShowSuccessModal(true)
                }
            }).catch(e => {
                if (e) {
                    setShowErrorModal(true)
                    console.log(e)
                }
            })
            setShowModifyModal(false)
        }
    }

    return (
        <>
            <div className="flex">
                <div className="justify-between w-5/6 my-0.5 mx-auto border border-purple rounded-full shadow-md shadow-violet items-center p-4 flex xs:w-full xs:border-x-0 xs:rounded-none xs: shadow xs:mb-1.5">
                    <div className=" w-5/6 row-content grid grid-cols-6 flex xs:grid-cols-10 place-items-center xs:w-full ">
                        <h4 className="text-l col-span-2 font-bold xs:col-span-3 xs:mr-1.5">{props.concept}</h4>
                        <p className="mx-2.5 text-right xs:text-center xs:col-span-2">{props.amount} <b className='text-center'>USD</b></p>
                        <p className="mx-2.5 text-center xs:col-span-2">{props.category}</p>
                        <p className="mx-2.5 xs:col-span-2">{props.date}</p>
                        <div className="col-span-1 grid grid-cols-6 place-items-center">
                            <p className="mx-2.5 col-span-2 text-right xs:hidden">{props.type === true ? 'Ingress' : 'Egress'}</p>
                            <img className="w-4 inline xs:col-span-3 xs:w-full" src={props.type === true ? arrowUpImg : arrowDownImg} alt="" srcSet="" />
                        </div>
                    </div>
                    <div className="btn-panel space-x-reverse xs:w-10">
                        <button className="bg-blue inline rounded-full text-white mx-1 px-2 py-1.5 xs:mx-0.5 xs:my-0.5 xs:px-0.5 xs:py-0.5" onClick={() => setShowModifyModal(true)} data-modal-toggle="defaultModal">
                            Modify
                        </button>
                        <button
                            className="bg-red inline rounded-full text-white mx-1 px-2 py-1.5 xs:mx-0.5 xs:my-0.5 xs:px-0.5 xs:py-0.5"
                            onClick={() => { handleDelete(props.id) }}
                            type="button" data-modal-toggle="defaultModal">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {
                showModifyModal ? (

                    <ModifyModal
                        reference={modifyForm}
                        onSubmit={() => handleModify(props.id)}
                        action={() => setShowModifyModal(false)}
                        type={props.type}
                        concept={props.concept}
                        amount={props.amount}
                        category={props.category}
                    />
                ) : null
            }

            {
                showSuccessModal ? (

                    <NotificationModal
                        color="bg-green"
                        message="Operation Successfully"
                        action={() => {
                            setShowSuccessModal(false)
                            window.location.assign('/');
                        }}
                    />
                ) : null
            }

            {
                showErrorModal ? (

                    <NotificationModal
                        color="bg-red"
                        message="An Error was Ocurred. Please Try Again Later"
                        action={() => {
                            setShowErrorModal(false)
                            window.location.assign('/');
                        }}
                    />
                ) : null
            }
        </>
    )
}