import { useSearchParams } from "react-router-dom";

function useUrlParam() {
    const [searchParams, setSearchParams] = useSearchParams();
    const readParam = function (field) {
        return searchParams.get(field);
    };
    const setParam = function (param, value) {
        searchParams.set(param, value);
        setSearchParams(searchParams);
    };
    return { readParam, setParam };
}

export default useUrlParam;
