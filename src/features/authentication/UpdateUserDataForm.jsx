import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useLoggedInUser from "./useLoggedInUser";
import Label from "../../ui/Label";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName },
        },
    } = useLoggedInUser();

    const { updateUser, isUpdating } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (fullName) updateUser({ fullName, avatar });
    }

    function handleCancle() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow>
                <Label htmlFor="email">Email </Label>
                <Input value={email} id="email" disabled />
            </FormRow>
            <FormRow>
                <Label htmlFor="fullName">Name </Label>
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow>
                <Label htmlFor="avatar">Avatar image </Label>
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
            </FormRow>
            <FormRow>
                <Button
                    type="reset"
                    $variation="secondary"
                    disabled={isUpdating}
                    onClick={handleCancle}
                >
                    Cancle
                </Button>
                <Button disabled={isUpdating}>
                    {isUpdating ? "Updating.." : "Update account"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
