import Heading from "../ui/styled-elements/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Align from "../ui/styled-elements/Align";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function CabinsPage() {
    return (
        <>
            <Align type="col">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations />
            </Align>

            <Align type="row">
                <CabinTable />
                <AddCabin />
            </Align>
        </>
    );
}

export default CabinsPage;
