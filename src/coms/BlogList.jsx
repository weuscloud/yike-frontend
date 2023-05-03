import { List } from "antd";
import BlogItem from "./BlogItem";
import { getPOPArticles, getArticles } from "../api/blog";
import { useEffect, useState } from "react";

const BlogList = ({ pop }) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (pop === true) {
        const res = await getPOPArticles();
        setListData(res);
        setLoading(false);
        return;
      } else {
        const res = await getArticles();
        setListData(res);
        setLoading(false);
        return;
      }
    };
    fetchData();
  }, []);

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={(item) => <BlogItem item={item} />}
    />
  );
};

export default BlogList;
