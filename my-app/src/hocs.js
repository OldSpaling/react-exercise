import { useParams, useSearchParams } from 'react-router-dom';
//解决class component 不能使用userParams()的问题
export function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}
export function withSearchParams(Component) {
    //******useParams, useSearchParams等钩子函数只能写在返回函数体力***************
    //searchParams={searchParams} setSearchParams={setSearchParams} 
    return props => {
        const [searchParams, setSearchParams] = useSearchParams();
        return (<Component {...props} searchParams={searchParams} setSearchParams={setSearchParams} />);
    };
}