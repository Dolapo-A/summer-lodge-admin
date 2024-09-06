/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createEditRoom } from "../../services/apiRooms";
import { useCreateRoom } from "./useCreateRoom";
import { useEditRoom } from "./useEditRoom";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinToEdit;

	const { createRoom, isCreating } = useCreateRoom();
	const { editRoom, isEditing } = useEditRoom();

	const isWorking = isCreating || isEditing;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;

	const queryClient = useQueryClient();

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editRoom(
				{ newRoomData: { ...data, image }, id: editId },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createRoom(
				{ ...data, image },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				}
			);
		// console.log(data);
	}

	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Minimum capacity is 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Minimum Price is 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isWorking}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should be less than Regular Price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				// error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isWorking}
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Room photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit room" : "Create new room"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
