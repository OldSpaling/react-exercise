import { useParams } from 'react-router-dom';
//解决class component 不能使用userParams()的问题
export default function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}