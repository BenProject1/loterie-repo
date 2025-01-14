import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, QrCode, Gift, Star } from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboardStats';

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
}> = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        {trend !== undefined && (
          <p className={`text-sm mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trend}% vs. mois dernier
          </p>
        )}
      </div>
      <div className="p-3 bg-purple-50 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

export const Overview: React.FC = () => {
  const { stats, participationData, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Une erreur est survenue lors du chargement des statistiques.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h1>
        <p className="text-gray-600 mt-1">Statistiques et performances de votre commerce</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Scans QR Code"
          value={stats.totalScans}
          icon={<QrCode className="w-6 h-6 text-purple-600" />}
          trend={12}
        />
        <StatCard
          title="Participations"
          value={stats.totalParticipations}
          icon={<Gift className="w-6 h-6 text-purple-600" />}
          trend={8}
        />
        <StatCard
          title="Clients Fidèles"
          value={stats.totalLoyalCustomers}
          icon={<Users className="w-6 h-6 text-purple-600" />}
          trend={15}
        />
        <StatCard
          title="Avis Google"
          value={stats.totalReviews}
          icon={<Star className="w-6 h-6 text-purple-600" />}
          trend={5}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Participations des 7 derniers jours
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={participationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                }}
              />
              <Bar 
                dataKey="participations" 
                fill="#9333EA"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};