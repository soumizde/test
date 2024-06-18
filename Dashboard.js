import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const yAxisLabelClickPlugin = {
  id: 'yAxisLabelClick',
  afterEvent: (chart, event) => {
    const evt = event.event;
    if (evt.type === 'click') {
      const yAxis = chart.scales.y;
      const yValue = yAxis.getValueForPixel(evt.y);
      const label = chart.data.labels[yValue];
      const value = chart.data.datasets[0].data[yValue];
      if (label) {
        chart.options.onYAxisLabelClick(label, value);
      }
    }
  }
};

const data = {
  labels: Array.from({ length: 15 }, (_, i) => `Product ${i + 1}`),
  datasets: [
    {
      data: Array.from({ length: 15 }, (_, i) => Math.floor(Math.random() * 30) + 1),
      backgroundColor: Array.from({ length: 15 }, (_, i) =>
        i % 2 === 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(255, 159, 64, 0.5)'
      ),
    },
  ],
};

const data2 = {
  labels: ['State 1', 'State 2', 'State 3', 'State 4', 'State 5', 'State 6', 'State 7', 'State 8', 'State 9', 'State 10', 'State 11', 'State 12', 'State 13', 'State 14', 'State 15'],
  datasets: [
    {
      label: 'A',
      data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190],
      backgroundColor: '#FFEB3B',
    },
    {
      label: 'B',
      data: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
      backgroundColor: '#FFC107',
    },
    {
      label: 'C',
      data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
      backgroundColor: '#FF9800',
    },
    {
      label: 'D',
      data: [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
      backgroundColor: '#FF5722',
    },
    {
      label: 'E',
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
      backgroundColor: '#F44336',
    },
    {
      label: 'F',
      data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
      backgroundColor: '#D32F2F',
    },
  ],
};

const genderData = {
  labels: ['MALE', 'FEMALE', 'OTHER'],
  datasets: [
    {
      data: [58, 35, 7],
      backgroundColor: ['#FF0000', '#FFEB3B', '#FFECB3'],
    },
  ],
};

const ageData = {
  labels: ['26 - 50', '51 - 60', '60+', '18 - 25'],
  datasets: [
    {
      data: [45, 35, 15, 5],
      backgroundColor: ['#FF5722', '#FFC107', '#FFEB3B', '#FFF9C4'],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Product Sales Data',
    },
  },
};


const genderOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Gender Representation',
    },
  },
};

const ageOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Age Representation',
    },
  },
};

const Dashboard = () => {
  const [year, setYear] = useState('2023');
  const [popupData, setPopupData] = useState({ label: '', value: '', visible: false });
  

  const handleYAxisLabelClick = (label, value) => {
    setPopupData({ label, value, visible: true });
  };

  const closePopup = () => {
    setPopupData({ ...popupData, visible: false });
  };


  const handleYearChange = (e) => {
    setYear(e.target.value);
    // Update the data based on the selected year
  };


  const options2 = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    onYAxisLabelClick: handleYAxisLabelClick,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Customer Count by State',
      },
    },
    
  };
  

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Year:
            <select value={year} onChange={handleYearChange} style={{ marginLeft: '10px' }}>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </label>
        </div>
        <Bar data={data} options={options} />
      </div>
      <div style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Year:
            <select value={year} onChange={handleYearChange} style={{ marginLeft: '10px' }}>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </label>
        </div>
        <Bar data={data2} options={options2} plugins={[yAxisLabelClickPlugin]}/>
        {popupData.visible && <Popup label={popupData.label} value={popupData.value} onClose={closePopup} />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '45%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Year:
              <select value={year} onChange={handleYearChange} style={{ marginLeft: '10px' }}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </label>
          </div>
          <Doughnut data={genderData} options={genderOptions} />
        </div>
        <div style={{ width: '45%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Year:
              <select value={year} onChange={handleYearChange} style={{ marginLeft: '10px' }}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </label>
          </div>
          <Doughnut data={ageData} options={ageOptions} />
        </div>
      </div>
    </div>
  );
};
function Popup({ label, value, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{label}</h2>
        <p>Value: {value}</p>
      </div>
    </div>
  );
}
export default Dashboard;