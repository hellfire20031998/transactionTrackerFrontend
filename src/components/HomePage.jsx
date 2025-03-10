import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Links } from 'react-router-dom';

const HomePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/') // Updated route
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:8081/delete/${id}`)
        .then(res=>{
            setData(prev => prev.filter(data => data._id !== id))
            alert('Transaction deleted successfully');
        })
        .catch(err=>console.log(err));
    }

    return (
        <div className='container-fluid d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='col-12 col-md-10 col-lg-8 bg-white rounded p-4'>
        <h2 className="text-center mb-4">Transaction List</h2>
        <div className="d-flex justify-content-end mb-3">
            <Link to="/create" className='btn btn-success'>Create +</Link>
        </div>
        <div className="d-none d-md-block table-responsive">
            <table className='table table-striped table-bordered'>
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>UserEmail</th>
                        <th>Transaction Id</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction._id}</td>
                                <td>{transaction.userName}</td>
                                <td>{transaction.userEmail}</td>
                                <td>{transaction.transactionId}</td>
                                <td>${transaction.amount}</td>
                                <td>{transaction.method}</td>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td>{transaction.description}</td>
                                <td className="d-flex flex-column flex-md-row gap-2">
                                    <Link to={`/read/${transaction._id}`} className="btn btn-warning btn-sm">Read</Link>
                                    <Link to={`/edit/${transaction._id}`} className="btn btn-success btn-sm">Edit</Link>
                                    <button onClick={() => handleDelete(transaction._id)} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <div className="d-block d-md-none">
            {data.length > 0 ? (
                data.map((transaction, index) => (
                    <div key={index} className='border p-3 mb-3 rounded'>
                        <p><strong>ID:</strong> {transaction._id}</p>
                        <p><strong>UserName:</strong> {transaction.userName}</p>
                        <p><strong>UserEmail:</strong> {transaction.userEmail}</p>
                        <p><strong>Transaction Id:</strong> {transaction.transactionId}</p>
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                        <p><strong>Method:</strong> {transaction.method}</p>
                        <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                        <p><strong>Description:</strong> {transaction.description}</p>
                        <div className="d-flex gap-2">
                            <Link to={`/read/${transaction._id}`} className="btn btn-warning btn-sm">Read</Link>
                            <Link to={`/edit/${transaction._id}`} className="btn btn-success btn-sm">Edit</Link>
                            <button onClick={() => handleDelete(transaction._id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">No transactions found</p>
            )}
        </div>
    </div>
</div>

    );
};

export default HomePage;
