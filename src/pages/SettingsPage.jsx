import Heading from "../ui/styled-elements/Heading";
import Align from "../ui/styled-elements/Align";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
    return (
        <Align type="row">
            <Heading as="h1">Update hotel settings</Heading>
            <UpdateSettingsForm />
        </Align>
    );
}

export default Settings;
