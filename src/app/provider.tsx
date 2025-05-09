'use client';

import { Provider } from 'react-redux';
import { store } from '@/Apis/store';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}