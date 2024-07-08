import { ReactNode } from "react";
import CurrentUser from "./Current-User";

export const Header: React.FC = (): ReactNode => {
    return (
        <div>
            <CurrentUser />
        </div>
    )
}
