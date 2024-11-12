import styled from "styled-components";

import Form from "../../ui/styled-elements/Form";
import Label from "../../ui/styled-elements/Label";
import Input from "../../ui/styled-elements/Input";
import Button from "../../ui/styled-elements/Button";
import FormRow from "../../ui/styled-elements/FormRow";
import Textarea from "../../ui/styled-elements/Textarea";
import FileInput from "../../ui/styled-elements/FileInput";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
    grid-column: 2 / -1;
`;

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
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

    function onSubmit(data) {
        createCabinMutation(data);
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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

            {/* <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput id="image" accept="image/*" />
            </FormRow> */}

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>
                    {isCreating ? "Adding..." : "Add Cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
