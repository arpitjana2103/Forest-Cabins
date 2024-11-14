import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../ui/styled-elements/Button";
import Form from "../../ui/styled-elements/Form";
import FormRow from "../../ui/styled-elements/FormRow";
import Input from "../../ui/styled-elements/Input";
import Label from "../../ui/styled-elements/Label";
import Spinner from "../../ui/styled-elements/Spinner";
import useEditSettings from "./useEditSettings";
import useSettings from "./useSettings";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
    grid-column: 2 / -1;
`;

function isEqual(obj1, obj2) {
    for (const key in obj1) {
        if (obj2[key] !== Number(obj1[key])) return false;
    }
    return true;
}

function ifUpdateRequired(formValues, settings) {
    return !isEqual(formValues, settings);
}

function UpdateSettingsForm() {
    const [updateRequired, setUpdateRequired] = useState(false);
    const { isLoading, settings } = useSettings();
    const { isEditing, editSettings } = useEditSettings();
    const { register, handleSubmit, formState, watch } = useForm();
    const { errors } = formState;
    const formValues = watch();

    useEffect(
        function () {
            if (ifUpdateRequired(formValues, settings)) {
                setUpdateRequired(true);
            } else {
                setUpdateRequired(false);
            }
        },
        [formValues, settings]
    );

    function onSubmit(data) {
        editSettings(data);
    }

    function onError(err) {
        console.log(err);
    }

    if (isLoading) return <Spinner />;
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow>
                <Label htmlFor="min-nights">Minimum nights/booking</Label>
                <Input
                    type="number"
                    disabled={isEditing}
                    defaultValue={settings.minBookingLength}
                    id="min-nights"
                    {...register("minBookingLength", {
                        required: "This field is required.",
                    })}
                />
                {errors?.minBookingLength?.message && (
                    <Error>{errors.minBookingLength.message}</Error>
                )}
            </FormRow>
            <FormRow>
                <Label htmlFor="max-nights">Maximum nights/booking</Label>
                <Input
                    type="number"
                    disabled={isEditing}
                    id="max-nights"
                    defaultValue={settings.maxBookingLength}
                    {...register("maxBookingLength", {
                        required: "This field is required.",
                    })}
                />
                {errors?.maxBookingLength?.message && (
                    <Error>{errors.maxBookingLength.message}</Error>
                )}
            </FormRow>
            <FormRow>
                <Label htmlFor="max-guests">Maximum guests/booking</Label>
                <Input
                    type="number"
                    disabled={isEditing}
                    id="max-guests"
                    defaultValue={settings.maxGuestsPerBooking}
                    {...register("maxGuestsPerBooking", {
                        required: "This field is required.",
                    })}
                />
                {errors?.maxGuestsPerBooking?.message && (
                    <Error>{errors.maxGuestsPerBooking.message}</Error>
                )}
            </FormRow>
            <FormRow>
                <Label htmlFor="min-nights">Breakfast price</Label>
                <Input
                    type="number"
                    disabled={isEditing}
                    id="breakfast-price"
                    defaultValue={settings.breakfastPrice}
                    {...register("breakfastPrice", {
                        required: "This field is required.",
                    })}
                />
                {errors?.breakfastPrice?.message && (
                    <Error>{errors.breakfastPrice.message}</Error>
                )}
            </FormRow>
            <FormRow>
                <Button
                    disabled={isEditing || !updateRequired}
                    $variation={updateRequired ? "primary" : "secondary"}
                >
                    {isEditing ? "Updating.." : "Update Settings"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
