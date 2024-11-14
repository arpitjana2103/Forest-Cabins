import Form from "../../ui/styled-elements/Form";
import FormRow from "../../ui/styled-elements/FormRow";
import Input from "../../ui/styled-elements/Input";
import Label from "../../ui/styled-elements/Label";
import Spinner from "../../ui/styled-elements/Spinner";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
    const { isLoading, settings } = useSettings();

    const {
        breakfastPrice,
        maxBookingLength,
        maxGuestsPerBooking,
        minBookingLength,
    } = settings || {};

    if (isLoading) return <Spinner />;
    return (
        <Form>
            <FormRow>
                <Label htmlFor="min-nights">Minimum nights/booking</Label>
                <Input
                    defaultValue={minBookingLength}
                    type="number"
                    id="min-nights"
                />
            </FormRow>
            <FormRow>
                <Label htmlFor="max-nights">Maximum nights/booking</Label>
                <Input
                    defaultValue={maxBookingLength}
                    type="number"
                    id="max-nights"
                />
            </FormRow>
            <FormRow>
                <Label htmlFor="max-guests">Maximum guests/booking</Label>
                <Input
                    defaultValue={maxGuestsPerBooking}
                    type="number"
                    id="max-guests"
                />
            </FormRow>
            <FormRow>
                <Label htmlFor="min-nights">Breakfast price</Label>
                <Input
                    defaultValue={breakfastPrice}
                    type="number"
                    id="breakfast-price"
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
