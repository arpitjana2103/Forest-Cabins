import styled from "styled-components";

import Input from "../../ui/styled-elements/Input";
import Form from "../../ui/styled-elements/Form";
import Button from "../../ui/styled-elements/Button";
import FileInput from "../../ui/styled-elements/FileInput";
import Textarea from "../../ui/styled-elements/Textarea";
import FormRow from "../../ui/styled-elements/FormRow";
import Label from "../../ui/styled-elements/Label";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateCabinForm() {
    return (
        <Form>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input type="text" id="name" />
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input type="number" id="maxCapacity" />
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input type="number" id="regularPrice" />
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input type="number" id="discount" defaultValue={0} />
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea type="number" id="description" defaultValue="" />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput id="image" accept="image/*" />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Edit cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
