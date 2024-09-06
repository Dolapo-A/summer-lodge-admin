/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function getGuests() {
	const { data, error } = await supabase.from("guests").select("*");

	if (error) {
		console.error(error);
		throw new Error("Could not load guests");
	}
	console.log(data);

	return data;
}

export async function createEditGuest(newGuest, id) {
	console.log(newGuest, id);
	// const hasImagePath = newGuest.image?.startsWith?.(supabaseUrl);

	// const imageName = `${Math.random()}-${newGuest.image.name}`.replaceAll(
	// 	"/",
	// 	" "
	// );

	// const imagePath = hasImagePath
	// 	? newGuest.image
	// 	: `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

	//1. create/edit Room
	let query = supabase.from("guests");

	// A. CREATE
	if (!id) query = query.insert([{ ...newGuest }]);
	// if (!id) query = query.insert([{ ...newGuest, image: imagePath }]);

	// B. EDIT
	if (id) query = query.update({ ...newGuest }).eq("id", id);
	// if (id) query = query.update({ ...newGuest, image: imagePath }).eq("id", id);

	const { error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Room could not be created");
	}

	//2. upload image
	// if (hasImagePath) return data;

	// const { error: storageError } = await supabase.storage
	// 	.from("room-images")
	// 	.upload(imageName, newGuest.image);

	// //3. Delete room if cabin was created but image was not uploaded
	// if (storageError) {
	// 	await supabase.from("rooms").delete().eq("id", data.id);
	// 	console.error(error);
	// 	throw new Error("Cabin image could not be uploaded and the cabin was not");
	// }
}

export async function deleteGuest(id) {
	const { data, error } = await supabase.from("guests").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Guest could not be deleted");
	}

	return data;
}
