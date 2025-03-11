import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        amount: '',
        description: '',
        method: '',
        expenseType: ''
    });
    const [paymentMethodList, setPaymentMethodList] = useState([]);
    const [expTypeList, setExpTypeList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [paymentRes, expTypeRes] = await Promise.all([
                    axios.get('http://localhost:8081/type'),
                    axios.get('http://localhost:8081/expenseType')
                ]);
                setPaymentMethodList(paymentRes.data);
                setExpTypeList(expTypeRes.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                const { userName, userEmail, amount, description, method, expenseType } = res.data;
                setFormData({ userName, userEmail, amount, description, method, expenseType });
            })
            .catch(err => {
                console.error('Error fetching transaction:', err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/update/${id}`, formData);
            alert('Transaction updated successfully');
            navigate('/');
        } catch (err) {
            console.error('Error updating transaction:', err);
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
            maxWidth: '600px',
            margin: '50px auto',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px'
            }}>Update Transaction</h2>

            <form onSubmit={handleSubmit} style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {['userName', 'userEmail', 'amount', 'description'].map((field) => (
                    <input
                        key={field}
                        type={field === 'amount' ? 'number' : 'text'}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '12px',
                            width: '100%',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                ))}
                <select
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                    required
                    style={{
                        padding: '12px',
                        width: '100%',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        backgroundColor: '#fff'
                    }}
                >
                    <option value="">Select Payment Mode</option>
                    {paymentMethodList.map(data => (
                        <option key={data.typeOfPayment} value={data.typeOfPayment}>
                            {data.typeOfPayment}
                        </option>
                    ))}
                </select>

                <select
                    value={formData.expenseType}
                    onChange={(e) => setFormData({ ...formData, expenseType: e.target.value })}
                    required
                    style={{
                        padding: '12px',
                        width: '100%',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        backgroundColor: '#fff'
                    }}
                >
                    <option value="">Select Expense Type</option>
                    {expTypeList.map(data => (
                        <option key={data.type} value={data.type}>
                            {data.type}
                        </option>
                    ))}
                </select>

                <button type="submit" style={{
                    padding: '12px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease'
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                    Update Transaction
                </button>
            </form>

            <div style={{
                marginTop: '20px',
                width: '100%'
            }}>
                <Link to="/" style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease'
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Back
                </Link>
            </div>
        </div>
    );
};

export default Update;
