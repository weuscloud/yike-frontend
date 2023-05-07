import { List } from "antd";
import BlogItem from "./BlogItem";
import { getPOPArticles, getArticles,getTagArticles } from "../api/blog";
import { useEffect, useState } from "react";

const BlogList = ({channel, data,edit,id }) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (channel === 'pop') {
        const res = await getPOPArticles();
        if(res)setListData(res);
        setLoading(false);
        return;
      }  
      if(channel==='users'){
        const res = await getArticles();
        if(res)setListData(res);
        setLoading(false);
        return;
      } 
      if(channel==='tags'&&id){
    
        const res = await getTagArticles({id});
        if(res)setListData(res);
        setLoading(false);
        return;
      }
    };
    if(!data)
    fetchData();
    else{
      setListData(data);
      setLoading(false);
    }
  }, []);

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={(item) => <BlogItem edit={edit} item={item} />}
    />
  );
};

export default BlogList;
