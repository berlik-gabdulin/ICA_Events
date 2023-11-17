import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AdminLayout from 'src/components/AdminLayout';
import dynamic from 'next/dynamic';
import Meta from 'src/components/Meta';

const NewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.ChangeEvent<any>, newValue: number) => {
    setActiveTab(newValue);
  };

  const NewsTab = dynamic(() => import('./tabs/NewsTab'));

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <NewsTab />;
      case 1:
        return <Meta page="news" />;
      default:
        console.error('Unknown tab index:', activeTab);
        return null;
    }
  };

  return (
    <AdminLayout>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab key="news" label="Content" />
        <Tab key="meta" label="Meta" />
      </Tabs>
      <Box mt={3}>{renderTabContent()}</Box>
    </AdminLayout>
  );
};

export default NewsPage;
