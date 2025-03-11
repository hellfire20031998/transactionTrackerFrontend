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
        return <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px' }}>Loading...</div>;
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
            margin: '50px auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box'
        }}>
            <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px'
            }}>Transaction Details</h2>

            {/* Single box containing all values */}
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                width: '100%',
                wordBreak: 'break-word'
            }}>
                <p style={{ margin: '10px 0', fontSize: '18px' }}>
                    <strong>User Name:</strong> {transaction.userName}
                </p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}>
                    <strong>User Email:</strong> {transaction.userEmail}
                </p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}>
                    <strong>Transaction ID:</strong> {transaction.transactionId}
                </p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}>
                    <strong>Amount:</strong> ${transaction.amount}
                </p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}>
                    <strong>Method:</strong> {transaction.method}
                </p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}>
                    <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
                </p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}>
                    <strong>Expense Type:</strong> {transaction.expenseType}
                </p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}>
                    <strong>Description:</strong> {transaction.description}
                </p>
            </div>

            {/* Buttons section */}
            <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '10px',
                width: '100%',
                justifyContent: 'center'
            }}>
                <Link to="/" style={{
                    padding: '12px 24px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    textAlign: 'center',
                    transition: 'background-color 0.3s ease'
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Back
                </Link>

                <Link to={`/edit/${transaction._id}`} style={{
                    padding: '12px 24px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    textAlign: 'center',
                    transition: 'background-color 0.3s ease'
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                    Edit
                </Link>
            </div>
        </div>
    );
};

export default Read;
