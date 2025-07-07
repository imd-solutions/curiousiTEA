import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@/apollo/mutations/auth/login.mutation';
import { REGISTER_MUTATION } from '@/apollo/mutations/auth/register.mutation';
import { FORGOTTEN_PASSWORD_MUTATION } from '@/apollo/mutations/auth/reset-password.mutation';
import Toast from 'react-native-toast-message';
import { AuthContextProps } from '@/type';
import { GraphQLError } from 'graphql';

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    login: async () => false,
    register: async () => false,
    logout: async () => {},
    resetPassword: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const [executeLogin] = useMutation(LOGIN_MUTATION);
    const [executeRegister] = useMutation(REGISTER_MUTATION);
    const [executeResetPassword] = useMutation(FORGOTTEN_PASSWORD_MUTATION);

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

            setIsAuthenticated(false);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (
        username: string,
        password: string,
    ): Promise<boolean> => {

        try {
            const { data } = await executeLogin({
                variables: {
                    input: { username, password },
                },
            });

            const { access_token, refresh_token, user } = data.login;

            await AsyncStorage.setItem('access_token', access_token);
            await AsyncStorage.setItem('refresh_token', refresh_token);

            setUser(user);
            setIsAuthenticated(true);

            return true;
        } catch (error: any) {

            const graphQLError: GraphQLError | undefined = error.graphQLErrors[0];
            const reason =
                String(graphQLError?.extensions?.reason) ??
                'Please check your credentials and try again.';

            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: reason,
                position: 'bottom',
            });
            return false;
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        password_confirmation: string,
    ): Promise<boolean> => {
        try {
            const { data } = await executeRegister({
                variables: {
                    input: { name, email, password, password_confirmation },
                },
            });
            console.log('Register Data: ', data);

            Toast.show({
                type: 'success',
                text1: 'Login Failed',
                text2: 'You have been registered. Please check your email.',
                position: 'top',
            });

            return true;
        } catch (error: any) {
            console.log('Error', error);
            const graphQLError: GraphQLError | undefined = error.graphQLErrors?.[0];

            let reason = 'Something went wrong. Please try again.';

            // Check for validation errors
            if (
                graphQLError?.extensions &&
                typeof graphQLError.extensions === 'object' &&
                'validation' in graphQLError.extensions
            ) {
                const validationErrors = graphQLError.extensions.validation as Record<
                    string,
                    string[]
                >;

                // Get the first validation message
                const firstErrorKey = Object.keys(validationErrors)[0];
                const firstErrorMessage = validationErrors[firstErrorKey]?.[0];

                reason = firstErrorMessage || reason;
            } else if (graphQLError?.message) {
                reason = graphQLError.message;
            }

            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: reason,
                position: 'bottom',
            });
            return false;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const resetPassword = async (email: string): Promise<boolean> => {
        try {
            const { data } = await executeResetPassword({
                variables: {
                    input: { email },
                },
            });
        } catch (error: any) {}
        return true;
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                user,
                login,
                register,
                logout,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
