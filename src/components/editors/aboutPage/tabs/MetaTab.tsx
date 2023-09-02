import Meta from 'src/components/Meta';
import { fetchAboutPageBlock, updateAboutPageBlock } from 'src/utils/api';

const MetaTab = () => <Meta fetchData={fetchAboutPageBlock} updateData={updateAboutPageBlock} />;

export default MetaTab;
