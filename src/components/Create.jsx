import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const url = process.env.REACT_APP_BACKEND_URL ||'https://transactiontrackerbackend.onrender.com/'

const Create = ({ onTransactionAdded }) => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        transactionId: '',
        amount: '',
        method: '',
        expenseType: '',
        date: '',
        description: ''
    });

    const [paymentMethodList, setPaymentMethodList] = useState([]);
    const [expTypeList, setExpTypeList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [paymentRes, expenseRes] = await Promise.all([
                    axios.get(url+'/type'),
                    axios.get(url+'/expenseType')
                ]);
                setPaymentMethodList(paymentRes.data);
                setExpTypeList(expenseRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(url+'/create', formData);
            navigate('/');
        } catch (err) {
            console.error('Error submitting form:', err);
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
            width: '90%',
            maxWidth: '500px',
            margin: '50px auto',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Transaction Details</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                {[
                    { name: 'userName', type: 'text', placeholder: 'User Name' },
                    { name: 'userEmail', type: 'email', placeholder: 'User Email' },
                    { name: 'transactionId', type: 'text', placeholder: 'Transaction ID' },
                    { name: 'amount', type: 'number', placeholder: 'Amount' },
                    { name: 'date', type: 'date' },
                    { name: 'description', type: 'text', placeholder: 'Description' }
                ].map(({ name, type, placeholder }) => (
                    <input
                        key={name}
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        style={{
                            margin: '10px 0',
                            padding: '10px',
                            width: '100%',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                ))}

                <select
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    required
                    style={{
                        margin: '10px 0',
                        padding: '10px',
                        width: '100%',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                    }}
                >
                    <option value="">Select the Payment Mode</option>
                    {paymentMethodList.map((data) => (
                        <option key={data.typeOfPayment} value={data.typeOfPayment}>
                            {data.typeOfPayment}
                        </option>
                    ))}
                </select>

                <select
                    name="expenseType"
                    value={formData.expenseType}
                    onChange={handleChange}
                    required
                    style={{
                        margin: '10px 0',
                        padding: '10px',
                        width: '100%',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                    }}
                >
                    <option value="">Select the Expense Type</option>
                    {expTypeList.map((data) => (
                        <option key={data.type} value={data.type}>
                            {data.type}
                        </option>
                    ))}
                </select>

                <button type="submit" style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    width: '100%'
                }}>
                    Add Transaction
                </button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <Link to="/" style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}>
                    Back
                </Link>
            </div>
        </div>
    );
};

export default Create;
