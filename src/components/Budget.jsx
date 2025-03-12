import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = process.env.REACT_APP_BACKEND_URL ||'https://transactiontrackerbackend.onrender.com/'

const BudgetForm = () => {
    const [formData, setFormData] = useState({
        month: '',
        expenseType: '',
        totalAmount: ''
    });

    const [budgets, setBudgets] = useState([]);
    const [expTypeList, setExpTypeList] = useState([]);

    useEffect(() => {
        const fetchExpenseTypes = async () => {
            try {
                const res = await axios.get(url+'expenseType');
                setExpTypeList(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchExpenseTypes();
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get(url+'getBudget');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(url+'createBudget', formData);
            alert('Budget created/updated successfully!');
            fetchBudgets();
            setFormData({ month: '', expenseType: '', totalAmount: '' });
        } catch (error) {
            console.error('Error creating budget:', error);
            alert(error.response?.data?.message || 'Failed to create budget');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this budget?')) {
            try {
                await axios.delete(`${url}deleteBudget/${id}`);
                alert('Budget deleted successfully!');
                fetchBudgets();
            } catch (error) {
                console.error('Error deleting budget:', error);
                alert('Failed to delete budget');
            }
        }
    };

    return (
        <div style={{
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto',
            boxSizing: 'border-box'
        }}>
            <h2 style={{
                textAlign: 'center',
                fontSize: '28px',
                color: '#333'
            }}>Create Monthly Budget</h2>

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                <input
                    type="month"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    style={{
                        padding: '10px',
                        width: '100%',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                    }}
                    required
                />
                <select
                    onChange={(e) => setFormData({ ...formData, expenseType: e.target.value })}
                    value={formData.expenseType}
                    style={{
                        padding: '10px',
                        width: '100%',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                    }}
                    required
                >
                    <option value="">Select the Expense Type</option>
                    {expTypeList.map((data) => (
                        <option key={data._id} value={data.type}>
                            {data.type}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    placeholder="Total Amount"
                    style={{
                        padding: '10px',
                        width: '100%',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                    }}
                    required
                />
                <button type="submit" style={{
                    padding: '12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: '100%'
                }}>
                    Create/Update Budget
                </button>
                <Link to={'/'} style={{
                    textDecoration: 'none',
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: 'gray',
                    color: 'white',
                    borderRadius: '5px',
                    fontSize: '16px',
                    width: '100%'
                }}>
                    Back
                </Link>
            </form>

            <h3 style={{
                textAlign: 'center',
                fontSize: '24px',
                marginTop: '20px',
                color: '#333'
            }}>Budgets Overview</h3>

            <div style={{
                width: '100%',
                overflowX: 'auto'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center'
                            }}>Month</th>
                            <th style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center'
                            }}>Expense Type</th>
                            <th style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center'
                            }}>Total Amount</th>
                            <th style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center'
                            }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgets.map((budget) => (
                            <tr key={budget._id}>
                                <td style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center'
                                }}>
                                    {new Date(budget.month).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit' })}
                                </td>
                                <td style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center'
                                }}>{budget.expenseType}</td>
                                <td style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center'
                                }}>${budget.totalAmount}</td>
                                <td style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center'
                                }}>
                                    <button onClick={() => handleDelete(budget._id)} style={{
                                        padding: '5px 10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer'
                                    }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BudgetForm;
