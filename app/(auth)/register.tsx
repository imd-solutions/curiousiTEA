import {View, Text, Button} from 'react-native'
import { router} from "expo-router";

export default function Register() {
    return (
        <View>
            <Text>Register</Text>
            <Button title="Register" onPress={()  => router.push("/login")} />
        </View>
    )
}