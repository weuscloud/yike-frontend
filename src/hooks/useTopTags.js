import { useState, useEffect } from 'react';
import {getTopTags}from '../api/tag';
const useTopTags = () => {
  const [topTags, setTopTags] = useState([]);

  useEffect(() => {
    const fetchTopTags = async () => {
      const tags = localStorage.getItem('topTags');

      if (tags) {
        setTopTags(JSON.parse(tags));
      } else {
        const fetchedTags = await getTopTags();
        setTopTags(fetchedTags);
        localStorage.setItem('topTags', JSON.stringify(fetchedTags));
      }
    };

    fetchTopTags();
  }, []);

  return topTags;
};
export default useTopTags;