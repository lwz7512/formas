import { useOutletContext } from 'react-router-dom';

// export type ContextType = { title: string | null };

/**
 * @deprecated
 * gen outlet context
 * @returns ContextType
 */
export function usePageContext() {
  return useOutletContext();
}
