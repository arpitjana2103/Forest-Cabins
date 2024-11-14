import supabase from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const bucketPath = `${supabaseUrl}/storage/v1/object/public/cabin-images`;

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded..");
    }
    return data;
}

export async function deleteCabin(id, image) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted..");
    }

    if (!image) return data;

    // Delete the Image
    const { error: deleteImageError } = await supabase.storage
        .from("cabin-images")
        .remove([image?.split("/").pop()]);

    if (deleteImageError) {
        console.log(error);
        throw new Error("Cabin Image could not be deleted..");
    }

    return data;
}

function createImageName(image) {
    const fileName = image.split(".").slice(0, -1).join("_");
    const extention = image.split(".").pop();
    const randomVal = `${Math.floor(Math.random() * 9999999)}_${Date.now()}`;

    return `${fileName}_${randomVal}.${extention}`;
}

export async function createCabin(newCabin) {
    // 1. Create Cabin
    const haveImageFile = typeof newCabin.image !== "string";
    let [imageFile, imageName] = [null, null];

    if (haveImageFile) {
        imageFile = newCabin.image;
        imageName = createImageName(newCabin.image.name);
        newCabin.image = `${bucketPath}/${imageName}`;
    }

    const { data, error } = await supabase
        .from("cabins")
        .insert([newCabin])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created..");
    }

    // 2. Upload Image
    if (haveImageFile) {
        const { error: storageError } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, imageFile);

        // 3. If StorageError Delete the Cabin
        if (storageError) {
            console.log(storageError);
            await deleteCabin(data[0].id);
            throw new Error(
                "Failed to upload image. Cabin could not be created.."
            );
        }
    }

    return data;
}

export async function editCabin(newCabin, id) {
    // 1. Edit Cabin
    const haveImageFile = typeof newCabin.image !== "string";
    let [imageFile, imageName] = [null, null];

    if (haveImageFile) {
        imageFile = newCabin.image;
        imageName = createImageName(newCabin.image.name);
        newCabin.image = `${bucketPath}/${imageName}`;
    }

    const { data, error } = await supabase
        .from("cabins")
        .update(newCabin)
        .eq("id", id)
        .select();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be edited..");
    }

    // 2. Delete Prev Image ( should be handeled at backend )
    // 3. Upload Image
    if (haveImageFile) {
        const { error: storageError } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, imageFile);

        if (storageError) {
            console.log(storageError);
            throw new Error("Failed to upload image.");
        }
    }
    return data;
}
