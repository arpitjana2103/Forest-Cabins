import Button from "../../ui/Button";
// import CabinForm from "./CabinForm";
import Modal from "../../ui/Modal";
import CabinForm from "./CabinForm";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open content="cabin-form">
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window content="cabin-form" title="Add New Cabin">
                <CabinForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddCabin;
