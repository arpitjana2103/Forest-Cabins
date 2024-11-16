import { useForm } from "react-hook-form";

import FormError from "../../ui/FormError";
import Button from "../../ui/styled-elements/Button";
import FileInput from "../../ui/styled-elements/FileInput";
import Form from "../../ui/styled-elements/Form";
import FormRow from "../../ui/styled-elements/FormRow";
import Input from "../../ui/styled-elements/Input";
import Label from "../../ui/styled-elements/Label";
import Textarea from "../../ui/styled-elements/Textarea";

import { useCreateCabin } from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = editId !== undefined;

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const isWorking = isEditing || isCreating;

    function onSubmit(data) {
        const haveImageFile = typeof data.image !== "string";
        if (haveImageFile) {
            data.image = data.image[0];
        }

        if (!isEditSession) {
            createCabin(data, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },
            });
        }

        if (isEditSession) {
            editCabin(
                { newCabin: data, id: editId },
                {
                    onSuccess: () => {
                        onCloseModal?.();
                    },
                }
            );
        }
    }

    function onError(errors) {
        console.log("Form-Errors : ", errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required.",
                    })}
                />
                <FormError error={errors?.name?.message} />
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
                <FormError error={errors?.maxCapacity?.message} />
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required.",
                        min: {
                            value: 500,
                            message: "regularPrice should be at least 500",
                        },
                    })}
                />
                <FormError error={errors?.regularPrice?.message} />
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required.",
                        validate: (value, fieldValues) =>
                            Number(value) <= fieldValues.regularPrice ||
                            "Discount should be less regular price",
                    })}
                />
                <FormError error={errors?.discount?.message} />
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea
                    disabled={isWorking}
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required.",
                    })}
                />
                <FormError error={errors?.description?.message} />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput
                    disabled={isWorking}
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "Please select an image file.",
                    })}
                />
                <FormError error={errors?.image?.message} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                {!isEditSession && (
                    <Button disabled={isWorking}>
                        {isCreating ? "Adding..." : "Add Cabin"}
                    </Button>
                )}

                {isEditSession && (
                    <Button disabled={isWorking}>
                        {isEditing ? "Updating..." : "Update Cabin"}
                    </Button>
                )}
            </FormRow>
        </Form>
    );
}

export default CabinForm;
