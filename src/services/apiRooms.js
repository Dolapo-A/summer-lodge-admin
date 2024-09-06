/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function getRooms() {
	const { data, error } = await supabase.from("rooms").select("*");

	if (error) {
		console.error(error);
		throw new Error("Could not load rooms");
	}

	return data;
}

export async function createEditRoom(newRoom, id) {
	console.log(newRoom, id);
	const hasImagePath = newRoom.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll(
		"/",
		" "
	);

	const imagePath = hasImagePath
		? newRoom.image
		: `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

	//1. create/edit Room
	let query = supabase.from("rooms");

	// A. CREATE
	if (!id) query = query.insert([{ ...newRoom, image: imagePath }]);

	// B. EDIT
	if (id) query = query.update({ ...newRoom, image: imagePath }).eq("id", id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Room could not be created");
	}

	//2. upload image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from("room-images")
		.upload(imageName, newRoom.image);

	//3. Delete room if cabin was created but image was not uploaded
	if (storageError) {
		await supabase.from("rooms").delete().eq("id", data.id);
		console.error(error);
		throw new Error("Cabin image could not be uploaded and the cabin was not");
	}
}

export async function deleteRoom(id) {
	const { data, error } = await supabase.from("rooms").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Rooms could not be deleted");
	}

	return data;
}
