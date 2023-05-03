import { useState, useEffect } from 'react';
import {getTopTags}from '../api/tag';
// 1 day in milliseconds
const expiredTme=24 * 60 * 60 * 1000;
const useTopTags = () => {
  const [topTags, setTopTags] = useState([]);

  useEffect(() => {
    const fetchTopTags = async () => {
      const tags = localStorage.getItem('topTags');
      const expireTime = localStorage.getItem('topTagsExpireTime');

      if (tags && expireTime && Date.now() < parseInt(expireTime, 10)) {
        setTopTags(JSON.parse(tags));
      } else {
        const fetchedTags = await getTopTags();
        const newExpireTime = Date.now() + expiredTme; 
        setTopTags(fetchedTags);
        localStorage.setItem('topTags', JSON.stringify(fetchedTags));
        localStorage.setItem('topTagsExpireTime', newExpireTime.toString());
      }
    };

    fetchTopTags();
  }, []);

  return topTags;
};
export default useTopTags;