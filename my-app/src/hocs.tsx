import { 
    useLocation, 
    useNavigate, 
    useParams, 
    useSearchParams 
} from 'react-router-dom';
//解决class component 不能使用userParams()的问题
export function withParams(Component:Function) {
    return (props: { [key: string]: string }) => <Component {...props} params={useParams()} />;
}
export function withSearchParams(Component: Function) {
    //******useParams, useSearchParams等钩子函数只能写在返回函数体力***************
    //searchParams={searchParams} setSearchParams={setSearchParams} 
    return (props: { [key: string]: string }) => {
        const [searchParams, setSearchParams] = useSearchParams();
        return (<Component {...props} searchParams={searchParams} setSearchParams={setSearchParams} />);
    };
}
export function withLocation(Component:Function) {
    return (props: {[key:string]:string}) => {
        const location = useLocation();
        return (
            <Component  {...props} to={props.to + location.search} />
        );
    }
}
export function withNavigate(Component:Function) {
    return (props: { [key: string]: string }) => {
        const navigate = useNavigate();
        return (
            <Component  {...props} navigate={navigate} />
        );
    }
}