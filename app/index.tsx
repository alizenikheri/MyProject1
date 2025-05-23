import { View, Text, Image, Pressable } from "react-native"; // إضافة استيراد Pressable
import React from "react";
import className from "twrnc"; // استيراد className من twrnc
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/home")} // تصحيح المسار هنا
      style={className`bg-orange-500 flex-1 justify-center items-center`}
    >
      <Image 
        source={require('../assets/logo.webp')}
        style={className`w-70 h-70`} 
      />
      <Text style={className`text-9xl text-white font-bold`}>Foody</Text> {/* تصحيح الحجم هنا */}
      <Text style={className`text-black font-semibold`}>Food is always right!</Text>
    </Pressable>
  );
};

export default Index;
