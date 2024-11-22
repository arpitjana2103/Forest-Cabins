import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { useSingup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import FormError from "../../ui/FormError";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { signup, isSigningup } = useSingup();
    const { errors } = formState;

    function onSubmit({ fullName, email, password }) {
        signup(
            { fullName, email, password },
            {
                onSettled: () => reset(),
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isSigningup}
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
                <FormError error={errors?.fullName?.message} />
            </FormRow>

            <FormRow>
                <Label htmlFor="email">Email Address</Label>
                <Input
                    type="email"
                    id="email"
                    disabled={isSigningup}
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Plase provide a valid email address",
                        },
                    })}
                />
                <FormError error={errors?.email?.message} />
            </FormRow>

            <FormRow>
                <Label htmlFor="password">Password (min 8 characters)</Label>
                <Input
                    type="password"
                    id="password"
                    disabled={isSigningup}
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
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords need to match",
                    })}
                />
                <FormError error={errors?.passwordConfirm?.message} />
            </FormRow>

            <FormRow>
                <Button
                    $variation="secondary"
                    type="reset"
                    disabled={isSigningup}
                >
                    Cancel
                </Button>
                <Button disabled={isSigningup}>
                    {isSigningup ? "Creating..." : "Create new user"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
