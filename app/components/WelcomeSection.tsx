import React from "react";
import { View, Text, TextInput , TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import className from "twrnc";

const WelcomeSection: React.FC = () => {
  return (
    <View style={className`p-5 pt-8`}>
      <Text style={className`text-lg font-semibold text-gray-600`}>Welcome Back</Text>
      <Text style={className`text-3xl font-bold text-gray-800 mb-6`}>
        Make your own food & stay at{" "}
        <Text style={className`text-orange-500`}>home</Text>
      </Text>

      {/* Search Bar */}
      <View style={className`bg-gray-100 p-2 px-4 rounded-full flex-row items-center justify-between shadow-sm`}>
        <TextInput
          placeholder="Search any recipe..."
          style={className`flex-1 text-lg font-medium text-gray-700 p-3`}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={className`bg-orange-500 p-2 rounded-full`}>
          <Ionicons name="search-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeSection;