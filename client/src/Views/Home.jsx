import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import Header from "../Components/Header"
import Transaction from "../Components/Transaction"
import AddModal from "../Components/AddModal";
import NotificationModal from "../Components/NotificationModal";


export default function Home() {

    const addForm = useRef(null)
    const [firstTransactions, setFirstTransactions] = useState([])
    const [allTransactions, setAllTransactions] = useState([])
    const [showAddModal, setShowAddModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [show, setShow] = useState(true)

    useEffect(() => {

        fetch('http://localhost:4500/api/last-transactions', {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }).then(res => res.json())
            .then(res => setFirstTransactions(res))
            .catch(error => console.log(error))

        fetch('http://localhost:4500/api/transactions', {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }).then(res => res.json())
            .then(res => setAllTransactions(res))
            .catch(error => console.log(error))
    }, [])

    function formatDate(date) {
        let formattedDate = new Date(date).toISOString().slice(0, 10).replace('T', ' ');

        return formattedDate;
    }

    const seeAllTransactions = () => {
        setFirstTransactions(allTransactions)
        setShow(false)
    }

    const handleTotalBalance = () => {
        let transactions = 0;
        allTransactions.forEach(transaction => {
            if (transaction.type === true) {
                transactions += parseFloat(transaction.amount)
            } else {
                transactions -= parseFloat(transaction.amount)
            }
        });
        const result = transactions.toFixed(2)
        return result.toString();
    }

    const totalBalance = handleTotalBalance()

    const handleAddSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(addForm.current)
        const userData = {
            concept: formData.get('concept'),
            amount: parseFloat(formData.get('amount')),
            type: JSON.parse(formData.get('type')),
            category: formData.get('category')
        }

        await fetch('http://localhost:4500/api/transaction/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(msg => {
            if (msg.ok) {
                setShowConfirmModal(true)
            }
        }).catch(e => {
            if (e) {
                setShowErrorModal(true)
                console.log(e)
            }
        })
        setShowAddModal(false)
    }

    return (
        <>
            <Header />
            <button className="transactions-button bg-green text-center w-5/6 my-6 mx-auto border border-green rounded-full shadow-md shadow-green p-4 flex ..." onClick={() => setShowAddModal(true)}>
                <h4 className=" mx-auto text-center text-white font-bold">+ ADD NEW TRANSACTION</h4>
            </button>
            <div className="bg-purple justify-between w-5/6 my-0.5 mb-6 mx-auto border border-purple rounded-full shadow-md shadow-violet p-4 flex ...">
                <div className="balance-title">
                    <h4 className="text-l text-white font-bold">Your Actual Balance: </h4>
                </div>
                <div className="btn-panel space-x-reverse">
                    <h4 className={totalBalance.includes('-') ? 'text-red ' + 'text-l font-bold' : 'text-green ' + 'text-l font-bold'}>{totalBalance} USD</h4>
                </div>
            </div>


            {firstTransactions.map(transaction => {

                return (
                    <div key={transaction.id}>
                        <Transaction
                            concept={transaction.concept}
                            amount={transaction.amount}
                            type={transaction.type}
                            category={transaction.category}
                            date={formatDate(transaction.date)}
                            id={transaction.id}
                        />
                    </div>

                )
            })}
            <button className={!show ? 'hidden' : '' + "transactions-button bg-violet text-center w-5/6 my-0.5 mx-auto border border-violet rounded-full shadow-md shadow-violet p-4 flex ..."} onClick={seeAllTransactions}>
                <h4 className=" mx-auto text-center text-white font-bold">See All Transactions &#187;</h4>
            </button>

            {showAddModal ? (
                <>
                    <AddModal
                        reference={addForm}
                        onSubmit={handleAddSubmit}
                        action={() => {
                            setShowAddModal(false)
                        }}
                    />
                </>
            ) : null}

            {showConfirmModal ? (
                <>
                    <NotificationModal
                        color="bg-green"
                        message="Transaction Sucessfully Added"
                        action={() => {
                            setShowConfirmModal(false)
                            window.location.assign('/');
                        }}
                    />
                </>
            ) : null}

            {showErrorModal ? (
                <>
                    <NotificationModal
                        color="bg-red"
                        message="An Error Was Ocurred. Please Try Later"
                        action={() => {
                            setShowConfirmModal(false)
                            window.location.assign('/');
                        }}
                    />
                </>
            ) : null}

        </>
    )
}