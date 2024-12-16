import {Spinner} from "@fluentui/react-components";
import "../../assets/loader.css"

export interface LoaderProps {
    label?: string;
    isForPage?: boolean;
}

function Loader({label, isForPage}: LoaderProps) {
    return <div className={isForPage ? "pageLoader" : 'componentLoader'}>
        <Spinner appearance="primary" label={label || 'Ładowanie aplikacji'} />
    </div>
}

export default Loader
