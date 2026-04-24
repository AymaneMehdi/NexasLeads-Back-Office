import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import Doughnut from '../components/Doughnut';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const App = () => {
  const [counts, setCounts] = useState({ userCount: 0, blogCount: 0 });
  const [blogDates, setBlogDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countsResponse = await axios.get('');
        setCounts(countsResponse.data);

        const datesResponse = await axios.get('');
        setBlogDates(datesResponse.data);

      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  const dates = blogDates.map(d => d.date);
  const blogCreationData = {
    labels: dates,
    datasets: [
      {
        label: 'Blogs Created',
        data: dates.reduce((acc, date) => {
          const count = dates.filter(d => d === date).length;
          acc.push(count);
          return acc;
        }, []),
        backgroundColor: '#d9a74a',
        borderColor: '#d9a74a',
        borderWidth: 1,
      }
    ],
  };

  const countsData = {
    labels: ['Users', 'Blogs'],
    datasets: [
      {
        label: 'Counts',
        data: [counts.userCount, counts.blogCount],
        backgroundColor: ['#d9a74a', '#e24545'], 
        borderColor: ['#d9a74a', '#e24545'], 
        borderWidth: 1,
      }
    ],
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return Number.isInteger(value) ? value : '';
          }
        }
      }
    }
  };

  return (
    <div>
      <p style={{ color: '#e24545', fontWeight: 'bold', marginRight: 'auto', marginLeft: '20px', fontSize: '1.2em' }}>Dashboard</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto', marginTop: '50px' }}>
        <div style={{ width: '48%', backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px' }}>
          <h2 className='font-bold text-base text-[#d9a74a]'>Counts :</h2>
          <Bar data={countsData} options={commonOptions} />
        </div>
        <div style={{ width: '48%', backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px' }}>
          <h2 className='font-bold text-base text-[#d9a74a]'>Blog Creation Dates :</h2>
          <Line data={blogCreationData} options={commonOptions} />
        </div>
      </div>
      <div style={{ width: '80%', margin: 'auto', marginTop: '50px' }}>
        <div style={{ width: '100%', backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px' }}>
          <Doughnut />
        </div>
      </div>
    </div>
  );
};

export default App;
