import { useState } from "react";

import Heading from "../ui/styled-elements/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Align from "../ui/styled-elements/Align";
import Button from "../ui/styled-elements/Button";
import CabinForm from "../features/cabins/CabinForm";

function CabinsPage() {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <Align type="col">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Align>

            <CabinTable />

            <Button onClick={() => setShowForm((show) => !show)}>
                Create New Cabin
            </Button>
            {showForm && <CabinForm />}
        </>
    );
}

export default CabinsPage;
