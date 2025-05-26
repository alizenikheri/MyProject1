import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import className from "twrnc";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
  title?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  title = "Categories" 
}) => {
  return (
    <View style={className`mb-6`}>
      <Text style={className`px-5 text-xl font-bold text-gray-800 mb-4`}>
        {title}
      </Text>
      
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={className`gap-4 px-5`}
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={className`items-center`}
            onPress={() => onCategorySelect(item.strCategory)}
          >
            <View style={className`${
              selectedCategory === item.strCategory 
                ? 'border-2 border-orange-500' 
                : 'border border-gray-200'
            } rounded-full p-1 bg-white shadow-sm`}>
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={className`h-16 w-16 rounded-full`}
              />
            </View>
            <Text style={className`${
              selectedCategory === item.strCategory 
                ? 'text-orange-500 font-bold' 
                : 'text-gray-600 font-semibold'
            } mt-2 text-center max-w-20`}>
              {item.strCategory}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryList;