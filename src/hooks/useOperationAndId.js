import { useParams } from "react-router-dom";

const usePathParams = () => {
  const { '*': path } = useParams();

  const match = path.match(/^(update|create|delete)\/(\d{1,10})$/);

  if (!match) {
    const match1=path.match(/^\d{1,10}$/);
    return {
        operation:null,
        id:match1?parseInt(match1[0]):null
    }
  }
  
  const [_, operation, id] = match;
  return {
    operation,
    id:id?parseInt(id):null
  };
};
export default usePathParams;
 
