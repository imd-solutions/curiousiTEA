import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import {InputButtonProps} from "@/type";
import cn from "clsx";

const InputButton = ({
                          onPress,
                          title="Click Me",
                          style,
                          textStyle,
                          leftIcon,
                          isLoading = false
                      }: InputButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
            {leftIcon}

            <View className="flex-center flex-row">
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ): (
                    <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default InputButton