import { useState } from "react";
import Button from "../../ui/styled-elements/Button";
// import CabinForm from "./CabinForm";
import Modal from "../../ui/Modal";
import CabinForm from "./CabinForm";

function AddCabin() {
    const [isOpenModel, setIsAddOpenModel] = useState(true);
    return (
        <div>
            <Button onClick={() => setIsAddOpenModel((show) => !show)}>
                Create New Cabin
            </Button>

            {isOpenModel && (
                <Modal
                    title="Create New Cabin"
                    onClose={() => setIsAddOpenModel(false)}
                >
                    <CabinForm onCloseModal={() => setIsAddOpenModel(false)} />
                </Modal>
            )}
        </div>
    );
}

export default AddCabin;
