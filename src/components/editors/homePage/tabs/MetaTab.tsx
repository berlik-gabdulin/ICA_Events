import Meta from 'src/components/Meta';
import { fetchHomePageBlock, updateHomePageBlock } from 'src/utils/api';

const MetaTab = () => <Meta fetchData={fetchHomePageBlock} updateData={updateHomePageBlock} />;

export default MetaTab;
