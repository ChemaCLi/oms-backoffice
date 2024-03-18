import { Layout } from '../../../shared/frontend/components/layout/layout'
import { LogsTable } from '../components/logs-table';

export const LogsTablePage = () => {
  return (
    <Layout
      title="Logs"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Logs', href: '/logs-monitor' },
      ]}>
      <LogsTable />
    </Layout>
  );
}
