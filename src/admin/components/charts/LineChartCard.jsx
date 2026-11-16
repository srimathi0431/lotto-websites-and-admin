// ===================================
// LINE CHART CARD COMPONENT
// ===================================

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartCard = ({ title, data, dataKeys, colors }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#64748B' }}
            stroke="#E8EDF4"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748B' }}
            stroke="#E8EDF4"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8EDF4',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
          />
          {dataKeys.map((key, index) => (
            <Line 
              key={key.dataKey}
              type="monotone"
              dataKey={key.dataKey} 
              name={key.name}
              stroke={colors[index] || '#4F46E5'} 
              strokeWidth={2}
              dot={{ fill: colors[index] || '#4F46E5', r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;
