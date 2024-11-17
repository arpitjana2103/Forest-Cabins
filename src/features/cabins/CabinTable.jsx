import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Spinner from "../../ui/styled-elements/Spinner";
import Table from "../../ui/Table";

function CabinTable() {
    const { isLoading, cabins = [], error } = useCabins();

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
                data={cabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            />
        </Table>
    );
}

export default CabinTable;
