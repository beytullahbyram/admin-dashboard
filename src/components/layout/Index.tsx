import { ThemedLayoutV2, ThemedTitleV2 } from '@refinedev/antd'
import { Header } from './Header'
import { ReactNode } from 'react'
import { TitleProps } from '@refinedev/core'

interface LayoutProps {
    children: ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }: React.PropsWithChildren): ReactNode => {
    // export function Layout({ children }: React.PropsWithChildren) {
    return (
        <ThemedLayoutV2
            Header={Header}
            Title={(props: TitleProps) => <ThemedTitleV2  {...props} text='Refine' />}
        >
            {children}
        </ThemedLayoutV2>
    )
}
