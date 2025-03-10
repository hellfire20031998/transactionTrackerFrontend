import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Create = ({ onTransactionAdded }) => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        transactionId: '',
        amount: '',
        method: '',
        date: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8081/create', formData);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            width: '50%',
            margin: '50px auto'
        }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Transaction Details</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="User Name" required style={{
                    margin: '10px 0',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} />
                <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="User Email" required style={{
                    margin: '10px 0',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} />
                <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder="Transaction ID" required style={{
                    margin: '10px 0',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} />
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required style={{
                    margin: '10px 0',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} />
                <input type="text" name="method" value={formData.method} onChange={handleChange} placeholder="Method" required style={{
                    margin: '10px 0',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{
                    margin: '10px 0',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} />
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required style={{
                    margin: '10px 0',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} />
                <button type="submit" style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}>Add Transaction</button>
            </form>
            <div style={{ marginTop: '20px' }}>
                <Link to="/" style={{
                    marginRight: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}>Back</Link>
            </div>
        </div>
    );
};

export default Create;
