import { useState, useEffect, useMemo } from 'react';
import { getArticle } from '../api/blog';

// 1 minute
const expiredTme = 60 * 1000;

const useArticle = (op) => {
  const [article, setArticle] = useState({});

  const isAllFieldsCached = useMemo(() => {
    if (!article || !op) return false;

    return Object.keys(op).every(
      (field) => article[field] !== undefined
    );
  }, [article, op]);

  useEffect(() => {
    if (typeof op !== 'object' || !op.id) {
      throw new Error('Invalid input');
    }

    const { id, ...fields } = op;

    const cachedArticle = localStorage.getItem(`article-${id}`);
    const cachedTime = localStorage.getItem(`article-${id}-time`);

    if (cachedArticle && cachedTime && Date.now() < parseInt(cachedTime)) {
      const parsedArticle = JSON.parse(cachedArticle);

      if (isAllFieldsCached) {
        console.log('op',op)
        console.log('cached',parsedArticle)
        setArticle(parsedArticle);
        return;
      }
    }

    localStorage.removeItem(`article-${id}`);
    localStorage.removeItem(`article-${id}-time`);

    getArticle({ id, ...fields })
      .then((ar) => {
        const mergedArticle = { ...JSON.parse(cachedArticle), ...ar };
        localStorage.setItem(`article-${id}`, JSON.stringify(mergedArticle));
        localStorage.setItem(`article-${id}-time`, Date.now() + expiredTme);
        console.log('op',op)
        console.log('get',ar)
        console.log('merged',mergedArticle)
        setArticle(mergedArticle);
      })
      .catch((error) => {
        console.error(`Failed to fetch article ${id}:`, error);
      });
  }, []);

  return article;
};

export default useArticle;
