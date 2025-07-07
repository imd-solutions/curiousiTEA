import {View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image} from 'react-native'
import { useApplication} from "@/context/ApplicationContext";
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";

export default function AuthLayout() {
    const { name, version } = useApplication();
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white">
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 60 }}>
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25 }}>
                    <ImageBackground source={images.loginGraphic} className="w-full h-full rounded-b-lg" resizeMode="stretch" />
                    <Image source={images.logo} className="self-center w-48 h-48 absolute -bottom-16 z-10" />
                </View>
                <Slot />
            </ScrollView>

            <View className="absolute bottom-14 right-4">
                <Text className="text-xs text-gray-400 text-right">
                    {name} version: {version}
                </Text>
            </View>
        </KeyboardAvoidingView>
    )
}
