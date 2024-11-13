import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

import Form from "../../ui/styled-elements/Form";
import Label from "../../ui/styled-elements/Label";
import Input from "../../ui/styled-elements/Input";
import Button from "../../ui/styled-elements/Button";
import FormRow from "../../ui/styled-elements/FormRow";
import Textarea from "../../ui/styled-elements/Textarea";
import FileInput from "../../ui/styled-elements/FileInput";

import { createCabin, editCabin } from "../../services/apiCabins";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
    grid-column: 2 / -1;
`;

function CabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = editId !== undefined;

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createCabinMutation } = useMutation({
        mutationFn: (newCabin) => createCabin(newCabin),
        onSuccess: () => {
            toast.success("New Cabin Created.");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const { isPending: isEditing, mutate: editCabinMutation } = useMutation({
        mutationFn: ({ newCabin, id }) => editCabin(newCabin, id),
        onSuccess: () => {
            toast.success("Cabin Edited.");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
    });

    const isWorking = isEditing || isCreating;

    function onSubmit(data) {
        const haveImageFile = typeof data.image !== "string";
        if (haveImageFile) {
            data.image = data.image[0];
        }

        if (!isEditSession) {
            createCabinMutation(data);
        }

        if (isEditSession) {
            editCabinMutation({ newCabin: data, id: editId });
        }
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
                {errors?.name?.message && <Error>{errors.name.message}</Error>}
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
                {errors?.maxCapacity?.message && (
                    <Error>{errors.maxCapacity.message}</Error>
                )}
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
                {errors?.regularPrice?.message && (
                    <Error>{errors.regularPrice.message}</Error>
                )}
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
                {errors?.discount?.message && (
                    <Error>{errors.discount.message}</Error>
                )}
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
                {errors?.description?.message && (
                    <Error>{errors.description.message}</Error>
                )}
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
                {errors?.image?.message && (
                    <Error>{errors.image.message}</Error>
                )}
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                {!isEditSession && (
                    <Button disabled={isWorking}>
                        {isCreating ? "Adding..." : "Add Cabin"}
                    </Button>
                )}

                {isEditSession && (
                    <Button disabled={isWorking}>
                        {isEditing ? "Editing..." : "Edit Cabin"}
                    </Button>
                )}
            </FormRow>
        </Form>
    );
}

export default CabinForm;
