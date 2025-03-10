import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Read = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                setTransaction(res.data);
            })
            .catch(err => {
                console.error('Error fetching transaction:', err);
            });
    }, [id]);

    if (!transaction) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '600px',
            margin: '50px auto'
        }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Transaction Details</h2>
            <div style={{ width: '100%' }}>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>User Name:</strong> {transaction.userName}</p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>User Email:</strong> {transaction.userEmail}</p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Amount:</strong> ${transaction.amount}</p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Method:</strong> {transaction.method}</p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Description:</strong> {transaction.description}</p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <Link to="/" style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>Back</Link>
                <Link to={`/edit/${transaction._id}`} style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>Edit</Link>
            </div>
        </div>
    );
};

export default Read;
