import { useDisclosure } from '@nextui-org/react';
import { Layout } from '../../../shared/frontend/components/layout/layout'
import { LogsTable } from '../components/logs-table';
import { LogDetailModal } from './log-detail-modal';
import { useEffect, useState } from 'react';

export const LogsTablePage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedLog(null);
    }
  }, [isOpen]);

  return (
    <Layout
      title="Logs"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Logs', href: '/logs-monitor' },
      ]}>
      <LogDetailModal
        isOpen={isOpen}
        selectedLog={selectedLog}
        onOpenChange={onOpenChange} />
      <LogsTable onViewDetail={(selectedLog) => {
        setSelectedLog(selectedLog)
        onOpen()
      }} />
    </Layout>
  );
}
