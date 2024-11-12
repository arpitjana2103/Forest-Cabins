import Heading from "../ui/styled-elements/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Align from "../ui/styled-elements/Align";
import Button from "../ui/styled-elements/Button";

function Cabins() {
    return (
        <>
            <Align type="col">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Align>

            <CabinTable />

            <Button>Create New Cabin</Button>
        </>
    );
}

export default Cabins;
