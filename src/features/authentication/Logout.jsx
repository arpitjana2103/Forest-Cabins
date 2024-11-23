import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
    const { logout, isLoggingOut } = useLogout();

    console.log("isLoggingOut : ", isLoggingOut);

    return (
        <ButtonIcon onClick={() => logout()}>
            {isLoggingOut ? (
                <SpinnerMini />
            ) : (
                <HiOutlineArrowRightOnRectangle />
            )}
        </ButtonIcon>
    );
}

export default Logout;