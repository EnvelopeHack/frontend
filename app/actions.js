// app/actions.js
"use server";

import { revalidatePath } from "next/cache";

export async function revalidateRaceData() {
	console.log("Revalidating race data path");
	revalidatePath("/");
	return { success: true };
}
