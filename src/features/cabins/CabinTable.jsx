import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import styled from "styled-components";
import Spinner from "../../ui/styled-elements/Spinner";
import Table from "../../ui/Table";

function CabinTable() {
    const { isLoading, cabins = [], error } = useCabins();

    if (isLoading) return <Spinner />;
    return (
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header>
                <div>Image</div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div>NULL</div>
            </Table.Header>

            <Table.Body
                data={cabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            />
        </Table>
    );
}

export default CabinTable;
