import {Redirect, Slot} from "expo-router";

export default function TabsLayout() {
    const isAuthenticated: boolean = false;

    if(!isAuthenticated) return <Redirect href="/login" />

    return <Slot />
}
