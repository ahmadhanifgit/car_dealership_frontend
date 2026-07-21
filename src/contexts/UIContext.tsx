import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type DrawerState = { open: boolean; title?: string };
type ModalState = { open: boolean; title?: string };

interface UIContextValue {
  drawer: DrawerState;
  openDrawer: (title?: string) => void;
  closeDrawer: () => void;
  modal: ModalState;
  openModal: (title?: string) => void;
  closeModal: () => void;
  compareBar: boolean;
  setCompareBar: (v: boolean) => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState<DrawerState>({ open: false });
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [compareBar, setCompareBar] = useState(false);

  const openDrawer = useCallback((title?: string) => setDrawer({ open: true, title }), []);
  const closeDrawer = useCallback(() => setDrawer({ open: false }), []);
  const openModal = useCallback((title?: string) => setModal({ open: true, title }), []);
  const closeModal = useCallback(() => setModal({ open: false }), []);

  const value = useMemo<UIContextValue>(
    () => ({ drawer, openDrawer, closeDrawer, modal, openModal, closeModal, compareBar, setCompareBar }),
    [drawer, openDrawer, closeDrawer, modal, openModal, closeModal, compareBar],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
