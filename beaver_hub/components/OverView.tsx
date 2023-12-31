"use client";

import { HourlyTotal, timeConverter } from "@/lib/utils";
import { Consumption } from "@/models/Consumption.model";
import {
  Tooltip,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
} from "recharts";

const Overview = ({ data }: { data: Consumption[] }) => {
  const dataOverview: HourlyTotal[] = timeConverter(data);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={dataOverview}>
        <XAxis
          dataKey="hour"
          stroke="#6B7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} H`}
        />
        <YAxis
          stroke="#6B7280"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} MAD`}
        />
        <Line
          dataKey="total"
          fill="#adfa1d"
          stroke="#82ca9d"
          // radius={[4,4,0,0]}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Overview;
