import useUrlParam from "../hooks/useUrlParam";
import Select from "./Select";

function SortBy({ options }) {
    const { readParam, setParam } = useUrlParam();
    const sortedBy = readParam("sortBy") || "name-asc";

    function handleChange(e) {
        setParam("sortBy", e.target.value);
    }

    return (
        <Select
            options={options}
            onChange={handleChange}
            value={sortedBy}
            type="white"
        />
    );
}

export default SortBy;
