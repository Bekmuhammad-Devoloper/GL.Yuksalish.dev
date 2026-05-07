'use client';

import * as React from 'react';

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const AdminMobileContext = React.createContext<Ctx>({
  open: false,
  setOpen: () => {},
});

export function useAdminMobile() {
  return React.useContext(AdminMobileContext);
}
