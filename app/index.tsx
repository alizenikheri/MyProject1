import { View, Text, Pressable } from "react-native";
import React from "react";
import className from "twrnc";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";

const Index = () => {
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'none',
          navigationBarHidden: true,
          statusBarHidden: true
        }}
      />
      <View style={className`bg-orange-500 flex-1 justify-center items-center`}>
        <View style={className`items-center`}>
          {/* Placeholder for logo - you can add your image back later */}
          <View style={className`w-80 h-80 mb-8 bg-white bg-opacity-20 rounded-full items-center justify-center`}>
            <Text style={className`text-8xl text-white font-bold`}>F</Text>
          </View>
          
          <Text style={className`text-7xl text-white font-bold mb-2`}>Foody</Text>
          <Text style={className`text-xl text-white font-semibold mb-10`}>
            Food is always right!
          </Text>
          <Pressable
            onPress={() => router.push("/(auth)/SignUpScreen")}
            style={className`bg-white px-12 py-4 rounded-full`}
          >
            <Text style={className`text-orange-500 font-bold text-xl`}>
              Get Started
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Index;