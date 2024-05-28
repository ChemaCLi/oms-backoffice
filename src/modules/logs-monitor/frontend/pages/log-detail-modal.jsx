import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export const LogDetailModal = ({ selectedLog, isOpen, onOpenChange }) => {
  const exportData = (data) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `log-${selectedLog.order_reference || selectedLog._id}.json`;

    link.click();
  };

  return (
    <Modal className="bg-slate-800" isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-slate-100">Vista RAW</ModalHeader>
            <ModalBody className="max-h-[400px] overflow-x-auto overflow-y-auto">
              <JsonView
                data={selectedLog}
                shouldExpandNode={allExpanded}
                style={darkStyles}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={() => {navigator.clipboard.writeText(JSON.stringify(selectedLog, null, 2))}}>
                Copiar al portapapeles
              </Button>
              <Button
                color="primary"
                variant="light"
                onPress={() => exportData(selectedLog)}
              >
                Exportar
              </Button>
              <Button color="primary" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
