import { useEffect } from 'react';

function usePageTitle(title = 'title 🎉') {
  useEffect(() => {
    const oldTitle = document.title;

    setPageTitle(title);

    return () => {
      setPageTitle(oldTitle);
    };
  }, [title]);

  const setPageTitle = (newPageTitle: string) => {
    document.title = `Dynamic | ${newPageTitle}`;
  };

  return [title, setPageTitle];
}
export default usePageTitle;
