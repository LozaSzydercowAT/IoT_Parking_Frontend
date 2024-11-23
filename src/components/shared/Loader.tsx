import {Spinner} from "@fluentui/react-components";
import "../../assets/loader.css"

function Loader() {
    return <div className="loader">
        <Spinner appearance="primary" label="Ładowanie aplikacji" />
    </div>
}

export default Loader
