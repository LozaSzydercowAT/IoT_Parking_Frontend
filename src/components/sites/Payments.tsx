import {memo} from 'react'
import {LargeTitle} from "@fluentui/react-components";

const Payments = memo(function() {
    return <>
        <div className={'tablePosition'}>
            <LargeTitle className={"marginsDef"}>Płatności</LargeTitle>
        </div>
    </>
})

export default Payments
