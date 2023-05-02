import { useSelector } from 'react-redux';

export default function useUser() {
  const token = useSelector(state => state.app.token);

  if (!token) {
    return null; // 如果token不存在，则返回null
  }

  // 从token中解析出用户信息
  const { name, avatarUrl, id } = JSON.parse(atob(token.split('.')[1]));

  return { name, avatarUrl, id };
}
