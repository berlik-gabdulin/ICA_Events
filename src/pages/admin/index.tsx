import { useEffect } from 'react';
import AdminLayout from 'src/components/AdminLayout';

const Admin = () => {
  useEffect(() => console.log('Hello, here is admin!'));

  return (
    <AdminLayout>
      <h1>Hello, user!</h1>
    </AdminLayout>
  );
};

export default Admin;
