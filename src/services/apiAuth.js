import supabase from "./supabase";

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
