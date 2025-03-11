import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CompareBudget = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [comparisonData, setComparisonData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!month || !year) {
            alert('Please select both month and year');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/compare', {
                month: parseInt(month),
                year: parseInt(year)
            });

            setComparisonData(response.data);
        } catch (error) {
            console.error('Error fetching budget comparison:', error);
            alert('Failed to fetch data');
        }
    };

    return (
        <div style={{
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Compare Budget vs. Expenses</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px'
            }}>
                <select value={month} onChange={(e) => setMonth(e.target.value)} style={{
                    padding: '10px',
                    width: '100%',
                    maxWidth: '300px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} required>
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>

                <select value={year} onChange={(e) => setYear(e.target.value)} style={{
                    padding: '10px',
                    width: '100%',
                    maxWidth: '300px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                }} required>
                    <option value="">Select Year</option>
                    {Array.from({ length: 5 }, (_, i) => (
                        <option key={i} value={2025 - i}>
                            {2025 - i}
                        </option>
                    ))}
                </select>

                <button type="submit" style={{
                    padding: '10px 20px',
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '300px'
                }}>
                    Compare
                </button>
                <Link to={'/'} type="submit" style={{
                    padding: '10px 20px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '300px',
                    textAlign:'center'
                }}>
                    Back
                </Link>
            </form>

            {/* Results */}
            {comparisonData && (
                <div>
                    <h3 style={{ textAlign: 'center', fontSize: '20px' }}>Transactions by Expense Type</h3>
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
                                    }}>Expense Type</th>
                                    <th style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center'
                                    }}>Total Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.transactionByExpenseType.map((t) => (
                                    <tr key={t._id}>
                                        <td style={{
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'center'
                                        }}>{t._id}</td>
                                        <td style={{
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'center'
                                        }}>{t.totalSpent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3 style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>Monthly Budgets by Expense Type</h3>
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
                                    }}>Expense Type</th>
                                    <th style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center'
                                    }}>Total Budget</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.monthlyByExpenseType.map((b) => (
                                    <tr key={b._id}>
                                        <td style={{
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'center'
                                        }}>{b._id}</td>
                                        <td style={{
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'center'
                                        }}>{b.totalBudget}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompareBudget;
