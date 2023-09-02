import { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AdminLayout from 'src/components/AdminLayout';
import { fetchAllAboutPageBlocks } from 'src/utils/api';
import dynamic from 'next/dynamic';
import { IPageBlock } from 'src/utils/types';

const About: React.FC = () => {
  const [data, setData] = useState<IPageBlock[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blocks = await fetchAllAboutPageBlocks();
        console.log(blocks);
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
    ContentTab: dynamic(() => import('./tabs/ContentTab')),
    MetaTab: dynamic(() => import('./tabs/MetaTab')),
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
        {data.map((block, index) => (
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

export default About;
