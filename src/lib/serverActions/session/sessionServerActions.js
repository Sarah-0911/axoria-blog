"use server"
import { connectToDB } from "@/lib/utils/db/connectToDB";
import { User } from "@/lib/models/user";
import { Session } from "@/lib/models/session";
import slugify from "slugify";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function register (formData) {
    const { userName, email, password, passwordConfirm } = Object.fromEntries(formData);

    if (userName.length < 3) {
        throw new Error("Username is too short")
    }
    if (password.length < 6) {
        throw new Error("Password is too short")
    }
    if (password !== passwordConfirm) {
        throw new Error("Passwords do not match")
    }

    try {
        await connectToDB();
        const user = await User.findOne({userName})

        if (user) throw new Error("UserName already exists");

        const normalizedUserName = slugify(userName, {lower: true, strict: true})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            userName,
            normalizedUserName,
            email,
            password : hashedPassword
        })

        await newUser.save();

        console.log("User saved to db");
        
        return { success: true };

    } catch (error) {
        console.log("Error while signing up the user:", error)
        throw new Error(error.message || "An error occured while signing up the user")
    }
}

export async function login (formData) {
    const { userName, password } = Object.fromEntries(formData);

    try {
        await connectToDB();
        const user = await User.findOne({userName});
        if (!user) throw new Error("Invalid credentials");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) throw new Error("Invalid credentials");

        let session;

        const existingSession = await Session.findOne({
            userId: user._id,
            expiresAt: { $gt: new Date() } // expire après maintenant → session encore valide (gt = "greater than")
        })

        if (existingSession) {
            session = existingSession;
            session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            await session.save();
        }
        else {
            session = new Session({
                userId: user._id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }) 
            await session.save();
        }

        const cookieStore = await cookies();

        // 🔹 Configuration du cookie
        cookieStore.set("sessionId", session._id.toString(), {
            httpOnly: true,  // cookie inaccessible via JS (dc côté client) (protège contre XSS)
            secure: process.env.NODE_ENV === "production", // HTTPS uniquement en prod
            path: "/",  // valable sur tout le site
            maxAge: 7 * 24 * 60 * 60, // expire après 1 semaine (en secondes)
            sameSite: "Lax", // protège contre les attaques CSRF simples
        })

        return { success: true };

 
    } catch (error) {
        console.error("Error while login", error);
        throw new Error(error.message);
    }
}