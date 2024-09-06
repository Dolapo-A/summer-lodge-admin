import CreateGuestForm from "./CreateGuestForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddGuest() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="guest-form">
					<Button>Add new guest</Button>
				</Modal.Open>
				<Modal.Window name="guest-form">
					<CreateGuestForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);

// 	return (
// 		<div>
// 			<Button onClick={() => setIsOpenModal((show) => !show)}>
// 				Add new room
// 			</Button>
// 			{isOpenModal && (
// 				<Modal onClose={()=> setIsOpenModal(false)}>
// 					<CreateCabinForm onCloseModal={()=> setIsOpenModal(false)} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

export default AddGuest;
