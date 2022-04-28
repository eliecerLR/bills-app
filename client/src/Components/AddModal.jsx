export default function AddModal(props) {
    return (
        <>
            <div
                className="bg-black-300 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className=" items-start justify-between p-5">
                            <h3 className="block title text-pink text-3xl  mb-6">
                                MyBills App
                            </h3>
                            <h4 className="block text-xl text-center font-semibold">Add New Transaction</h4>
                        </div>
                        <div className="flex row p-6 ...">
                            <form ref={props.reference} onSubmit={props.onSubmit}>

                                <div className="form-layer w-6/6">
                                    <label className="font-bold uppercase" htmlFor="concept">Concept</label>
                                    <input className="px-2.5 py-1.5 border border-gray-light rounded-full w-4/6 m-4" type="text" id="concept" name="concept" required />
                                </div>
                                <div className="form-layer">
                                    <label className="font-bold uppercase" htmlFor="transaction-type">Type of Transaction</label>
                                    <select className="px-2.5 py-1.5 border border-gray-light rounded-full w-2/6 m-4" name="type" id="transaction-type">
                                        <option value={false}>Egress</option>
                                        <option value={true}>Ingress</option>
                                    </select>
                                </div>
                                <div className="form-layer w-6/6">
                                    <label className="font-bold uppercase" htmlFor="Amount">Amount</label>
                                    <input className="px-2.5 py-1.5 border border-gray-light rounded-full w-3/6 m-4" type="number" id="amount" name="amount" required />
                                    <span className="font-bold uppercase w-1/6">USD</span>
                                </div>
                                <div className="form-layer">
                                    <label className="font-bold uppercase" htmlFor="category">Category</label>
                                    <input className="px-2.5 py-1.5 border border-gray-light rounded-full w-3/6 m-4" type="text" id="category" name="category" required />
                                </div>
                                <div className="flex items-center justify-end p-6">
                                    <button
                                        className="text-red bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={props.action}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-green text-white active:bg-blue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={props.onSubmit}
                                    >
                                        Add Transaction
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}