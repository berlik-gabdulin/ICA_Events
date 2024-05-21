import { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AdminLayout from 'src/components/AdminLayout';
import dynamic from 'next/dynamic';
import { IPageBlock } from 'src/utils/types';
import Meta from 'src/components/Meta';
import { fetchAllPageData } from 'src/utils/api';

const Home: React.FC = () => {
  const [data, setData] = useState<IPageBlock[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blocks = await fetchAllPageData('settings');
        setData(blocks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setActiveTab(newValue);
  };

  const components = {
    MainTab: dynamic(() => import('./tabs/MainTab')),
    NavigationTab: dynamic(() => import('./tabs/NavigationTab')),
    SocialTab: dynamic(() => import('./tabs/SocialTab')),
    AnalyticsTab: dynamic(() => import('./tabs/AnalyticsTab')),
    PromoTab: dynamic(() => import('./tabs/PromoTab')),
    MetaTab: () => <Meta page="settings" path="#" />,
  };

  const renderTabContent = () => {
    if (data.length) {
      let blockName = data[activeTab]?.block_name;
      blockName = blockName.charAt(0).toUpperCase() + blockName.slice(1) + 'Tab';
      const Component = components[blockName as keyof typeof components];

      if (!Component) {
        console.error(`Component for block "${blockName}" not found.`);
        return null;
      }
      return <Component />;
    }
  };

  return (
    <AdminLayout>
      <Tabs value={activeTab} onChange={handleChange}>
        {data.map((block) => (
          <Tab
            key={block.block_name}
            label={block.block_name.charAt(0).toUpperCase() + block.block_name.slice(1)}
          />
        ))}
      </Tabs>
      <Box mt={3}>{renderTabContent()}</Box>
    </AdminLayout>
  );
};

export default Home;
