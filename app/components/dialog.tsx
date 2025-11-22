"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

export type ModalProps = ComponentPropsWithoutRef<"dialog"> & {
  onClose: () => void;
  open: boolean;
};

export default function Dialog({ children, open, onClose, ...rest }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current!;
    if (!dialog) return;

    if (open && !dialog.open) {
      // Open the dialog only if it’s not already open
      dialog.showModal();
    } else if (!open && dialog.open) {
      // Close safely only if it’s currently open
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current!;
    if (!dialog) return;

    const handleClose = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleClose);
    };
  }, [onClose]);

  return (
    <dialog ref={ref} {...rest} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="submit"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
