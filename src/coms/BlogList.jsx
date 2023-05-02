import { List, Spin } from "antd";
import BlogItem from "./BlogItem";
import { getPOPArticles } from "../api/blog";
import { useEffect, useState } from "react";

const BlogList = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPOPArticles();
      setListData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Spin spinning={loading}>
      <List
        className="margin-top-bottom"
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => <BlogItem item={item} />}
      />
    </Spin>
  );
};

export default BlogList;
