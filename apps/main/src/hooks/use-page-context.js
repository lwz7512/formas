import { useOutletContext } from 'react-router-dom';

// export type ContextType = { title: string | null };

/**
 * gen outlet context
 * @returns ContextType
 */
export function usePageContext() {
  return useOutletContext();
}
