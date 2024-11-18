import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Spinner from "../../ui/styled-elements/Spinner";
import Table from "../../ui/Table";
import useUrlParam from "../../hooks/useUrlParam";

function CabinTable() {
    const { isLoading, cabins, error } = useCabins();
    if (error) console.log(error);

    const { readParam } = useUrlParam();

    const filterValue = readParam("discount") || "all";
    const sortByValue = readParam("sortBy") || "name-asc";

    let filteredCabins = [];
    if (filterValue === "all") {
        filteredCabins = cabins || [];
    }
    if (filterValue === "no-discount") {
        filteredCabins = cabins?.filter((cabin) => cabin.discount === 0) || [];
    }
    if (filterValue === "with-discount") {
        filteredCabins = cabins?.filter((cabin) => cabin.discount !== 0) || [];
    }

    let sortedCabins = filteredCabins;
    const [sortByField, sortByDir] = sortByValue.split("-");
    const modifier = sortByDir === "asc" ? 1 : -1;
    sortedCabins = sortedCabins.sort(function (a, b) {
        return modifier * (a[sortByField] - b[sortByField]);
    });

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
                data={sortedCabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            />
        </Table>
    );
}

export default CabinTable;
