import { useState } from "react";

interface UseModalsReturn {
  certificateUploadModal: {
    isOpen: boolean;
    mode: "single" | "bulk";
    open: (mode?: "single" | "bulk") => void;
    close: () => void;
  };
  certificateDetailsModal: {
    isOpen: boolean;
    certificate: any;
    open: (certificate: any) => void;
    close: () => void;
  };
}

export const useModals = (): UseModalsReturn => {
  const [certificateUploadModal, setCertificateUploadModal] = useState({
    isOpen: false,
    mode: "single" as "single" | "bulk",
  });

  const [certificateDetailsModal, setCertificateDetailsModal] = useState({
    isOpen: false,
    certificate: null as any,
  });

  return {
    certificateUploadModal: {
      isOpen: certificateUploadModal.isOpen,
      mode: certificateUploadModal.mode,
      open: (mode: "single" | "bulk" = "single") =>
        setCertificateUploadModal({ isOpen: true, mode }),
      close: () =>
        setCertificateUploadModal({ isOpen: false, mode: "single" }),
    },
    certificateDetailsModal: {
      isOpen: certificateDetailsModal.isOpen,
      certificate: certificateDetailsModal.certificate,
      open: (certificate: any) =>
        setCertificateDetailsModal({ isOpen: true, certificate }),
      close: () =>
        setCertificateDetailsModal({ isOpen: false, certificate: null }),
    },
  };
};