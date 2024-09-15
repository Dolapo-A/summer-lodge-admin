/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateGuest } from "./useCreateGuest";
import { useEditGuest } from "./useEditGuest";
import styled from "styled-components";

const StyledSelect = styled.select`
	font-size: 1.4rem;
	padding: 1.2rem 1.6rem;
	border: 1px solid
		${(props) =>
			props.type === "white"
				? "var(--color-grey-100)"
				: "var(--color-grey-300)"};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;

const Option = styled.option`
	padding: 0.75rem 1.25rem;
	background-color: var(--color-grey-0);
	/* color: var(--color-primary-800); */
	width: 100%;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	border-radius: 7px;
`;

function CreateGuestForm({ cabinToEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinToEdit;

	const { createGuest, isCreating } = useCreateGuest();
	const { editGuest, isEditing } = useEditGuest();

	const isWorking = isCreating || isEditing;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isEditSession)
			editGuest(
				{ newGuestData: { ...data }, id: editId },
				{
					onSuccess: (data) => {
						console.log(data);
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createGuest(
				{ ...data },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				}
			);
		console.log(data);
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input
					type="text"
					id="fullName"
					disabled={isWorking}
					{...register("fullName", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="email" error={errors?.email?.message}>
				<Input
					type="text"
					id="email"
					disabled={isWorking}
					{...register("email", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Minimum capacity is 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Phone number" error={errors?.phoneNumber?.message}>
				<Input
					type="text"
					id="phoneNumber"
					disabled={isWorking}
					{...register("phoneNumber", {
						required: "This field is required",
						// min: {
						// 	value: 1,
						// 	message: "Minimum Price is 1",
						// },
					})}
				/>
			</FormRow>

			<FormRow label="Gender" error={errors?.gender?.message}>
				<StyledSelect
					name="gender"
					id="gender"
					disabled={isWorking}
					{...register("gender", { required: "This field is required" })}
				>
					<Option value="" key="">
						Select Gender
					</Option>
					<Option value="male" key="male">
						Male
					</Option>
					<Option value="female" key="female">
						Female
					</Option>
				</StyledSelect>
			</FormRow>

			<FormRow label="Nationality" error={errors?.nationality?.message}>
				<Input
					type="text"
					id="nationality"
					disabled={isWorking}
					{...register("nationality", {
						required: "This field is required",
						// validate: (value) =>
						// 	value <= getValues().regularPrice ||
						// 	"Discount should be less than Regular Price",
					})}
				/>
			</FormRow>

			<FormRow label="National ID" error={errors?.nationalID?.message}>
				<Input
					type="text"
					id="nationality"
					disabled={isWorking}
					{...register("nationalID", {
						required: "This field is required",
						// validate: (value) =>
						// 	value <= getValues().regularPrice ||
						// 	"Discount should be less than Regular Price",
					})}
				/>
			</FormRow>

			{/* <FormRow
				label="Observations"
				// error={errors?.description?.message}
			>
				<Textarea
					type="text"
					id="description"
					defaultValue=""
					disabled={isWorking}
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow> */}

			{/* <FormRow label="Room photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow> */}

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
					{isEditSession ? "Edit guest" : "Create new Guest"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateGuestForm;
