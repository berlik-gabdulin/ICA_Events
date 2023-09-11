import Meta from 'src/components/Meta';
import { fetchSettingsPageBlock, updateSettingsPageBlock } from 'src/utils/api';

const MetaTab = () => (
  <Meta fetchData={fetchSettingsPageBlock} updateData={updateSettingsPageBlock} />
);

export default MetaTab;
