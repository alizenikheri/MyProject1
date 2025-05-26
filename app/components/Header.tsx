import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import className from "twrnc";

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const router = useRouter();

  const handleAuthNavigation = () => {
    router.push("/(auth)/SignInScreen");
  };

  return (
    <View style={className`p-5 flex-row items-center justify-between bg-white shadow-sm`}>
      <View style={className`flex-row items-center gap-3`}>
        <Ionicons name="person-outline" size={24} color="black" />
        <Text style={className`text-lg font-semibold text-gray-800`}>Foody</Text>
      </View>
      
      <View style={className`flex-row items-center gap-4`}>
        <TouchableOpacity onPress={handleAuthNavigation}>
          <Text style={className`text-orange-500 font-semibold`}>Sign In</Text>
        </TouchableOpacity>
        
        <Ionicons name="notifications-outline" size={24} color="black" />
        
        {onLogout && (
          <TouchableOpacity 
            onPress={onLogout}
            style={className`bg-red-500 px-4 py-2 rounded-lg`}
          >
            <Text style={className`text-white font-semibold`}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;