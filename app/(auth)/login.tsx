import { View, Text, Button, Alert } from 'react-native'
import { Link, router } from "expo-router";
import InputText from "@/components/Input/text";
import InputButton from "@/components/Input/button";
import { useState } from "react";
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';

export default function Login() {
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        const { email, password } = form;

        if(!email || !password)  {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: 'Please enter valid email address & password.',
                position: 'bottom',
            });
            return false;
        }

        try {
            setLoading(true);
            const success = await login(email, password);
            setLoading(false);

            if (success) {
                router.replace('/(tabs)');
            }
        } catch (error: any) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <InputText
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text: string) => setForm((prev) => ({ ...prev, email: text }))}
                label="Email"
                keyboardType="email-address"
            />
            <InputText
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text: string) => setForm((prev) => ({ ...prev, password: text }))}
                label="Password"
                secureTextEntry={true}
            />

            <InputButton
                title={loading ? 'Loading...' : 'Sign In'}
                isLoading={loading}
                onPress={handleLogin}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Do not have an account?
                </Text>
                <Link href="/register" className="base-bold text-primary">
                    Sign Up
                </Link>
            </View>
        </View>
    )
}
