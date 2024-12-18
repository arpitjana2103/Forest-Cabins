import supabase from "./supabase";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function signup({ fullName, email, password }) {
    console.log(fullName, email, password);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);
    return data;
}

export async function login({ email, password }) {
    console.log(email, password);
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getLoggedInUser() {
    // Get the logged in user from local storate
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) null;

    // Get the logged in user from DB
    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1. Update password or fullName

    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };

    const { data, error } = await supabase.auth.updateUser(updateData);
    console.log(error);

    if (error) throw new Error(error.message);
    if (!avatar) return data;

    // 2. Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Date.now()}`;
    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // 3. Update avatar in the user
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
        {
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        }
    );

    if (error2) throw new Error(error2.message);
    return updatedUser;
}
