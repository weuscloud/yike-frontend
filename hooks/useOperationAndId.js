import { useParams } from "react-router-dom";

const usePathParams = () => {
  const { '*': path } = useParams();

  const match = path.match(/^(create|edit|delete)\/(\d{1,10})?$/);

  if (!match) {
    return {
        operation:null,
        id:path.match(/^\d{1,9}$/)
    }
  }

  const [_, operation, id] = match;
  return {
    operation,
    id
  };
};
export default usePathParams;
 
