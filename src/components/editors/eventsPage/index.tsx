import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AdminLayout from 'src/components/AdminLayout';
import dynamic from 'next/dynamic';
import Meta from 'src/components/Meta';

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.ChangeEvent<any>, newValue: number) => {
    setActiveTab(newValue);
  };

  const ApiTab = dynamic(() => import('./tabs/ApiTab'));
  const ManualTab = dynamic(() => import('./tabs/ManualTab'));

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ApiTab />;
      case 1:
        return <ManualTab />;
      case 2:
        return <Meta page="events" />;
      default:
        console.error('Unknown tab index:', activeTab);
        return null;
    }
  };

  return (
    <AdminLayout>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab key="api" label="Api" />
        <Tab key="manual" label="Manual" />
        <Tab key="meta" label="Meta" />
      </Tabs>
      <Box mt={3}>{renderTabContent()}</Box>
    </AdminLayout>
  );
};

export default Events;
