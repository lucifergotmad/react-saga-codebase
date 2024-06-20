import { columns } from './columns';
import { DataTable } from './data-table';

export const AdminUser = () => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={[]} />
    </div>
  );
};
