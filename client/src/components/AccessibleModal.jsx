import React, { useEffect, useRef } from "react";

export default function AccessibleModal({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.showModal();
    return () => dialogRef.current?.close();
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <form method="dialog" onSubmit={onClose}>
        <header>
          <h2 id="dialog-title">Add dashboard note</h2>
          <button type="button" aria-label="Close dialog" onClick={onClose}>
            ×
          </button>
        </header>
        <p id="dialog-description">
          Add a short note for the current dashboard review.
        </p>
        <label htmlFor="note">Note</label>
        <textarea id="note" name="note" rows="4" required maxLength="300" />
        <footer>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Save note</button>
        </footer>
      </form>
    </dialog>
  );
}
