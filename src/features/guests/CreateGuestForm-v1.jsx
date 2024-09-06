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
import { createRoom } from "../../services/apiRooms";

function CreateCabinForm({cabinToEdit}) {
	const { register, handleSubmit, reset, getValues, formState } = useForm();

	const { errors } = formState;

	const queryClient = useQueryClient();

	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: createRoom,
		onSuccess: () => {
			toast.success("New room successfully created");
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
	}

	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isCreating}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isCreating}
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
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Edit cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
