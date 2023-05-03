import { useState, useEffect } from 'react';
import { getArticle,getArticles } from '../api/blog';
//1d
const expiredTme=24 * 60 * 60 * 1000;
const useArticles = (articleIds) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const cachedArticles = JSON.parse(localStorage.getItem('cachedArticles') || '{}');
      const fetchedArticles = [];

      for (const id of articleIds) {
        if (cachedArticles[id] && Date.now() - cachedArticles[id].cachedTime <= expiredTme) {
          fetchedArticles.push(cachedArticles[id].data);
        } else {
          const fetchedArticle = await getArticle(id);
          fetchedArticles.push(fetchedArticle);
          cachedArticles[id] = {
            cachedTime: Date.now(),
            data: fetchedArticle,
          };
        }
      }

      localStorage.setItem('cachedArticles', JSON.stringify(cachedArticles));
      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, [articleIds]);

  return articles;
};

export default useArticles;
