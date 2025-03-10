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
        method: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                const { userName, userEmail, amount, description, method } = res.data;
                setFormData({ userName, userEmail, amount, description, method });
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
            margin: '50px auto'
        }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Update Transaction</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                {['userName', 'userEmail', 'amount', 'description', 'method'].map((field) => (
                    <input
                        key={field}
                        type={field === 'amount' ? 'number' : 'text'}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
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
                    />
                ))}
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
                }}>Update Transaction</button>
            </form>
            <div style={{ marginTop: '20px', width: '100%' }}>
                <Link to="/" style={{
                    display: 'block',
                    textAlign: 'center',
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

export default Update;
