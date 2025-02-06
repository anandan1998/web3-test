import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardMetric = ({ title, children, isExpanded, onToggle, bgColor, chartData, chart }) => {
  return (
    <div className={`border rounded-xl p-6 ${bgColor} shadow-xl transition-transform transform hover:scale-105`}>
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={onToggle}
      >
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {isExpanded ? <ChevronDown size={22} color="white" /> : <ChevronRight size={22} color="white" />}
      </div>
      {isExpanded && (
        <div className="mt-6 space-y-6">
          {children}
          {chart && chartData && (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </div>
  );
};

const MetricItem = ({ label, value, color }) => (
  <div className={`flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm ${color}`}>
    <span className="text-gray-700 text-sm">{label}</span>
    <span className="font-semibold text-lg">{value}</span>
  </div>
);

const Dashboard = () => {
  const [expandedSections, setExpandedSections] = useState({
    network: false,
    security: false,
    sla: false,
    automation: false,
    customer: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const networkData = [
    { name: 'Jan', value: 99.9 },
    { name: 'Feb', value: 98.5 },
    { name: 'Mar', value: 99.3 },
  ];

  const automationData = [
    { name: 'Jan', value: 250 },
    { name: 'Feb', value: 210 },
    { name: 'Mar', value: 230 },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Sapper Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Network Stability */}
          <DashboardMetric 
            title="Network Stability" 
            isExpanded={expandedSections.network}
            onToggle={() => toggleSection('network')}
            bgColor="bg-blue-500"
            chartData={networkData}
            chart={true}
          >
            <div className="space-y-6">
              <MetricItem label="Avg Network Uptime" value="99.9%" color="bg-blue-100" />
              <MetricItem label="MTTR" value="45 mins" color="bg-blue-200" />
              <MetricItem label="Packet Loss Rate" value="0.01%" color="bg-blue-300" />
              <div className="mt-6 pt-6 border-t border-blue-200">
                <h4 className="font-medium mb-4 text-white">Performance Counters</h4>
                <MetricItem label="Network Throughput" value="850 Mbps" color="bg-blue-400" />
                <MetricItem label="Network Latency" value="25ms" color="bg-blue-500" />
                <MetricItem label="Network Congestion" value="Low" color="bg-blue-600" />
              </div>
            </div>
          </DashboardMetric>

          {/* Security & Resilience */}
          <DashboardMetric 
            title="Secure & Resilience" 
            isExpanded={expandedSections.security}
            onToggle={() => toggleSection('security')}
            bgColor="bg-green-500"
          >
            <div className="space-y-6">
              <MetricItem label="Security Incidents" value="2" color="bg-green-100" />
              <MetricItem label="Security Standards" value="98%" color="bg-green-200" />
              <div className="mt-6 pt-6 border-t border-green-200">
                <h4 className="font-medium mb-4 text-white">Detailed Metrics</h4>
                <MetricItem label="Security Incidents" value="2 active" color="bg-green-300" />
                <MetricItem label="Patching Compliance" value="95%" color="bg-green-400" />
              </div>
            </div>
          </DashboardMetric>

          {/* SLA Compliance */}
          <DashboardMetric 
            title="SLA Compliance" 
            isExpanded={expandedSections.sla}
            onToggle={() => toggleSection('sla')}
            bgColor="bg-yellow-500"
          >
            <div className="space-y-6">
              <MetricItem label="Achievement Rate" value="98.5%" color="bg-yellow-100" />
              <MetricItem label="Violation Count" value="3" color="bg-yellow-200" />
              <MetricItem label="Response Time" value="15m" color="bg-yellow-300" />
              <div className="mt-6 pt-6 border-t border-yellow-200">
                <h4 className="font-medium mb-4 text-white">Detailed Metrics</h4>
                <MetricItem label="Compliance %" value="98.5%" color="bg-yellow-400" />
                <MetricItem label="Breach Incidents" value="1" color="bg-yellow-500" />
              </div>
            </div>
          </DashboardMetric>

          {/* Automation Efficiency */}
          <DashboardMetric 
            title="Automation Efficiency" 
            isExpanded={expandedSections.automation}
            onToggle={() => toggleSection('automation')}
            bgColor="bg-red-500"
            chartData={automationData}
            chart={true}
          >
            <div className="space-y-6">
              <MetricItem label="Automation ROI" value="250%" color="bg-red-100" />
              <MetricItem label="Manual vs Auto" value="20:80" color="bg-red-200" />
              <MetricItem label="Error Rate" value="0.5%" color="bg-red-300" />
              <div className="mt-6 pt-6 border-t border-red-200">
                <h4 className="font-medium mb-4 text-white">Detailed Metrics</h4>
                <MetricItem label="Automated Tasks" value="456" color="bg-red-400" />
                <MetricItem label="Time Saved" value="280h" color="bg-red-500" />
              </div>
            </div>
          </DashboardMetric>

          {/* Customer Experience */}
          <DashboardMetric 
            title="Customer Experience" 
            isExpanded={expandedSections.customer}
            onToggle={() => toggleSection('customer')}
            bgColor="bg-purple-500"
          >
            <div className="space-y-6">
              <MetricItem label="NPS" value="8.5" color="bg-purple-100" />
              <MetricItem label="Churn Rate" value="2.1%" color="bg-purple-200" />
              <MetricItem label="First Response" value="5m" color="bg-purple-300" />
              <div className="mt-6 pt-6 border-t border-purple-200">
                <h4 className="font-medium mb-4 text-white">Detailed Metrics</h4>
                <MetricItem label="Response Times" value="4.8m" color="bg-purple-400" />
                <MetricItem label="Promoters-Detractors" value="45%" color="bg-purple-500" />
              </div>
            </div>
          </DashboardMetric>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
