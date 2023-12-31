"use client"

import {Bar, BarChart,Tooltip, ResponsiveContainer, XAxis, YAxis} from 'recharts'


const data=[{day:"Sun",total:130},{day:"Mon",total:320},{day:"Tue",total:10},{day:"Wed",total:90},{day:"Thu",total:10},{day:"Fri",total:200},{day:"Sat",total:100},{day:"Sun",total:130},{day:"Mon",total:320},{day:"Tue",total:10},{day:"Wed",total:90},{day:"Thu",total:10},{day:"Fri",total:200},{day:"Sat",total:100},{day:"Sun",total:130},{day:"Mon",total:320},{day:"Tue",total:10},{day:"Wed",total:900},{day:"Thu",total:10},{day:"Fri",total:200},{day:"Sat",total:100},{day:"Sun",total:100},{day:"Mon",total:320},{day:"Tue",total:10},{day:"Wed",total:90},{day:"Thu",total:100},{day:"Fri",total:200},{day:"Sat",total:100}]


const OverviewBar = () => {
    return (
        <ResponsiveContainer width="100%"height={350}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="day"
                        stroke='#6B7280'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke='#6B7280'
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value)=> `${value} MAD`}
                    />
                    <Bar 
                        dataKey="total"
                        fill='#adfa1d'
                        stroke="#82ca9d"
                        radius={[4,4,0,0]}
                    />
                    <Tooltip />
                </BarChart>
        </ResponsiveContainer>
    )
}

export default OverviewBar  