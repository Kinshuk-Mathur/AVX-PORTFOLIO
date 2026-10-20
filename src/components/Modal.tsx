import { useEffect, useRef, type PropsWithChildren } from 'react';
import { X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

type Props = PropsWithChildren<{ title: string; onClose: () => void; className?: string }>;

export function Modal({ title, onClose, children, className = '' }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const reduce = useReducedMotion();

  useEffect(() => {
    const dialog = ref.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.dispatchEvent(new Event('avx:overlay-open'));
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={ref} className={`modal ${className}`} aria-label={title} data-lenis-prevent
      onCancel={event => { event.preventDefault(); closeRef.current(); }}
      onClick={event => { if (event.target === event.currentTarget) closeRef.current(); }}>
      <motion.div className="modal-shell" initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25 }}>
        <div className="modal-top"><span>{title}</span><button className="icon-button" onClick={onClose} aria-label="Close dialog" autoFocus><X size={22} /></button></div>
        {children}
      </motion.div>
    </dialog>
  );
}
