// src/components/Modal.tsx
import React, { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 rounded-xl bg-zinc-900">{children}</div>
    </div>
  );
};

export default Modal;
