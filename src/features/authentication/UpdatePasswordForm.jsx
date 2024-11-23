import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import Label from "../../ui/Label";
import FormError from "../../ui/FormError";
import { useLogout } from "./useLogout";
import toast from "react-hot-toast";
import Emoji from "../../ui/Emoji";

function UpdatePasswordForm() {
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const { logout, isLoggingOut } = useLogout();
    const { errors } = formState;

    if (isLoggingOut) {
        toast(() => {
            return (
                <p>
                    <span>
                        <Emoji emoji="🙏" />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span>Please login to continue !</span>
                </p>
            );
        });
    }

    const { updateUser, isUpdating } = useUpdateUser();

    function onSubmit({ password }) {
        updateUser(
            { password },
            {
                onSuccess: () => {
                    reset();
                    setTimeout(function () {
                        logout();
                    }, 3500);
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdating}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
                <FormError error={errors?.password?.message} />
            </FormRow>

            <FormRow>
                <Label htmlFor="passwordConfirm">Password Confirm</Label>
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdating}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            getValues().password === value ||
                            "Passwords need to match",
                    })}
                />
                <FormError error={errors?.passwordConfirm?.message} />
            </FormRow>
            <FormRow>
                <Button onClick={reset} type="reset" $variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>
                    {isUpdating ? "Updating.." : "Update password"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
