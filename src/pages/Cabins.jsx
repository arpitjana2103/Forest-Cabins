import { useEffect } from "react";
import Heading from "../ui/Heading";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Align from "../ui/Align";

function Cabins() {
    return (
        <>
            <Align type="col">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Align>

            <CabinTable />
        </>
    );
}

export default Cabins;
