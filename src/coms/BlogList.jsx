import { List } from "antd";
import BlogItem from "./BlogItem";
const listData = Array.from({
  length: 4,
}).map((_, i) => ({
  id:"123456789",
  title: `ant design part ${i + 1}`,
  avatarUrl:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const BlogList = ({ loading }) => {
  return (
    <List
    className="margin-top-bottom"
    itemLayout="vertical"
    size="large"
    dataSource={listData}
    renderItem={(item) => <BlogItem  item={item} />}
  />
  );
};

export default BlogList;
