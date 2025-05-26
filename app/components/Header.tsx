// components/Header.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../config/firebase"; // Adjust path as needed
import className from "twrnc";

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthNavigation = () => {
    router.push("/(auth)/SignInScreen");
  };

  const handleLogoutPress = () => {
    console.log("Logout button pressed");
    if (onLogout) {
      onLogout();
    }
  };

  // Helper function to get user display name
  const getUserDisplayName = (user: User): string => {
    if (user.displayName) {
      return user.displayName;
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  // Helper function to get user initial
  const getUserInitial = (user: User): string => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <View style={className`p-5 flex-row items-center justify-between bg-white shadow-sm`}>
      <View style={className`flex-row items-center gap-3`}>
        <Ionicons name="restaurant-outline" size={24} color="#f97316" />
        <Text style={className`text-lg font-bold text-gray-800`}>Foody</Text>
      </View>
      
      <View style={className`flex-row items-center gap-4`}>
        {user ? (
          <>
            <View style={className`flex-row items-center gap-2`}>
              <View style={className`w-8 h-8 bg-orange-500 rounded-full items-center justify-center`}>
                <Text style={className`text-white font-bold text-sm`}>
                  {getUserInitial(user)}
                </Text>
              </View>
              <Text style={className`text-gray-600 font-medium max-w-32`} numberOfLines={1}>
                {getUserDisplayName(user)}
              </Text>
            </View>
            
            <Ionicons name="notifications-outline" size={24} color="black" />
            
            <TouchableOpacity 
              onPress={handleLogoutPress}
              style={className`bg-red-500 px-4 py-2 rounded-lg`}
            >
              <Text style={className`text-white font-semibold`}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleAuthNavigation}>
              <Text style={className`text-orange-500 font-semibold`}>Sign In</Text>
            </TouchableOpacity>
            
            <Ionicons name="notifications-outline" size={24} color="gray" />
          </>
        )}
      </View>
    </View>
  );
};

export default Header;

