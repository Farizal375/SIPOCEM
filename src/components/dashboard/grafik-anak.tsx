"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface GrafikProps {
  data: any[];
}

export default function GrafikAnak({ data }: GrafikProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="bulan" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="berat" 
            stroke="#00BFA6" 
            strokeWidth={3} 
            dot={{ r: 4, fill: "#00BFA6", strokeWidth: 2, stroke: "#fff" }} 
            name="Berat Badan Anak (Kg)"
          />
          <Line 
            type="monotone" 
            dataKey="standar" 
            stroke="#D4E157" 
            strokeWidth={2} 
            strokeDasharray="5 5" 
            dot={false}
            name="Standar WHO"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}