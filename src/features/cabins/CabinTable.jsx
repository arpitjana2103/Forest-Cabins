import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Spinner from "../../ui/styled-elements/Spinner";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
    const { isLoading, cabins = [], error } = useCabins();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("discount") || "all";

    let filteredCabins = [];
    if (filterValue === "all") {
        filteredCabins = cabins;
    }
    if (filterValue === "no-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    }
    if (filterValue === "with-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
    }

    if (error) return <p>Cabins cannot be loaded !</p>;
    if (isLoading) return <Spinner />;
    return (
        <Table columns="6rem 1.8fr 2.2fr 1fr 1fr 4rem">
            <Table.Header>
                <div>{null}</div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>

            <Table.Body
                data={filteredCabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            />
        </Table>
    );
}

export default CabinTable;
