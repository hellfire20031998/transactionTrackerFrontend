import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Example from './PieChart';
import TransactionsBarChart from './BarChat';

const url = process.env.REACT_APP_BACKEND_URL ||'https://transactiontrackerbackend.onrender.com/'
console.log(url)
const HomePage = () => {
    const [data, setData] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentRes = await axios.get(url+'getAllPaymentByType');
                setPieData(paymentRes.data.formattedData);
                setExpenses(paymentRes.data.expenseType);

                const transactionRes = await axios.get(url);
                setData(transactionRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url}delete/${id}`);
            setData(prev => prev.filter(transaction => transaction._id !== id));
            alert('Transaction deleted successfully');
        } catch (err) {
            console.error('Error deleting transaction:', err);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Transaction List</h2>

                {/* Transaction Summary Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '20px'
                }}>
                    <div style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>
                        <h5>Total Transactions</h5>
                        <p>Total Amount: ${pieData.reduce((acc, transaction) => acc + transaction.value, 0)}</p>
                        {pieData.map(data => (
                            <p key={data.name}>{data.name}: ${data.value}</p>
                        ))}
                    </div>

                    <div style={{
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>
                        <h5>Expenses Category</h5>
                        {expenses.map(data => (
                            <p key={data._id}>{data._id}: ${data.value}</p>
                        ))}
                    </div>
                </div>

                {/* Charts */}
                <div style={{
                    display: 'flex',
                    flexDirection: window.innerWidth >= 1024 ? 'row' : 'column', // Responsive layout
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    marginTop: '20px'
                }}>
                    <div style={{ width: '100%', maxWidth: '450px' }}>
                        <Example data={pieData} />
                    </div>
                    <div style={{ width: '100%', maxWidth: '400px' }}>
                        <TransactionsBarChart />
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    margin: '20px 0'
                }}>
                    <Link to="/create" style={{
                        backgroundColor: '#28a745',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        textDecoration: 'none'
                    }}>
                        Create +
                    </Link>
                    <Link to="/budget" style={{
                        backgroundColor: '#ffc107',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        textDecoration: 'none'
                    }}>
                        Create Budget
                    </Link>
                    <Link to="/compare" style={{
                        backgroundColor: '#17a2b8',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        textDecoration: 'none'
                    }}>
                        Compare Budget
                    </Link>
                </div>

                {/* Transactions Table */}
                <div style={{
                    overflowX: 'auto'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse'
                    }}>
                        <thead style={{ backgroundColor: '#343a40', color: '#fff' }}>
                            <tr>
                                {['ID', 'UserName', 'UserEmail', 'Transaction Id', 'Amount', 'Method', 'Date', 'Expense Type', 'Description', 'Action'].map(header => (
                                    <th key={header} style={{
                                        padding: '10px',
                                        textAlign: 'left'
                                    }}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((transaction, index) => (
                                <tr key={transaction._id} style={{
                                    borderBottom: '1px solid #ddd'
                                }}>
                                    <td style={{ padding: '10px' }}>{index + 1}</td>
                                    <td style={{ padding: '10px' }}>{transaction.userName}</td>
                                    <td style={{ padding: '10px' }}>{transaction.userEmail}</td>
                                    <td style={{ padding: '10px' }}>{transaction.transactionId}</td>
                                    <td style={{ padding: '10px' }}>${transaction.amount}</td>
                                    <td style={{ padding: '10px' }}>{transaction.method}</td>
                                    <td style={{ padding: '10px' }}>{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '10px' }}>{transaction.expenseType}</td>
                                    <td style={{ padding: '10px' }}>{transaction.description}</td>
                                    <td style={{ display: 'flex', gap: '5px' }}>
                                        <Link to={`/read/${transaction._id}`} style={{
                                            backgroundColor: '#ffc107',
                                            color: '#fff',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            textDecoration: 'none'
                                        }}>
                                            Read
                                        </Link>
                                        <Link to={`/edit/${transaction._id}`} style={{
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            textDecoration: 'none'
                                        }}>
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(transaction._id)} style={{
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="10" style={{
                                        textAlign: 'center',
                                        padding: '10px'
                                    }}>
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
