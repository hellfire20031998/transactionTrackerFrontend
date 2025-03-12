import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const url = process.env.REACT_APP_BACKEND_URL ||'https://transactiontrackerbackend.onrender.com/'


// Month names for mapping month numbers
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


const TransactionsBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url+'month')
            .then(res => {
                const formattedData = res.data.map(item => ({
                    name: monthNames[item._id - 1], // Map month number to name (assuming _id is 1-12)
                    value: item.totalAmount
                }));
                setData(formattedData);
            })
            .catch(err => console.error('Error fetching transactions:', err));
    }, []);

    return (
        <div style={{
            width: '100%',
            maxWidth: '600px', // Limits max width for desktop
            margin: '20px auto', // Centers the chart
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
            <h3 style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333',
            }}>
                Monthly Transactions Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: '#555' }} />
                    <YAxis tick={{ fill: '#555' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#4CAF50" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionsBarChart;
