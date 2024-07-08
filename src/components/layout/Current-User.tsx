import { Popover } from 'antd'
import { Fragment } from 'react'

export default function CurrentUser() {
    return (
        <Fragment>
            <Popover
                placement='right'
                trigger="hover"
                overlayInnerStyle={{ padding: 0 }}
                overlayStyle={{ zIndex: 999 }}
            >
                ddd
            </Popover>
        </Fragment>
    )
}
