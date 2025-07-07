import {Redirect, Slot} from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function TabsLayout() {
    const { isAuthenticated } = useAuth();
    // const isAuthenticated: boolean = false;

    if(!isAuthenticated) return <Redirect href="/login" />

    return <Slot />
}
