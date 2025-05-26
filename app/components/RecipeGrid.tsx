import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import className from "twrnc";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
  selectedCategory: string | null;
  loading: boolean;
  onRecipePress: (recipe: Recipe) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ 
  recipes, 
  selectedCategory, 
  loading, 
  onRecipePress 
}) => {
  if (loading) {
    return (
      <View style={className`flex-1 justify-center items-center py-10`}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={className`text-gray-500 mt-2`}>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={className`flex-1`}>
      <Text style={className`px-5 text-2xl font-bold text-gray-800 mb-4`}>
        {selectedCategory ? `${selectedCategory} Recipes` : "Featured Recipes"}
        <Text style={className`text-sm font-normal text-gray-500`}>
          {recipes.length > 0 && ` (${recipes.length} found)`}
        </Text>
      </Text>

      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          numColumns={2}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={className`px-5 pb-10`}
          columnWrapperStyle={className`justify-between`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={className`w-[48%] mb-4 bg-white rounded-xl shadow-sm overflow-hidden`}
              onPress={() => onRecipePress(item)}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={className`w-full h-32 bg-gray-200`}
                resizeMode="cover"
              />
              <View style={className`p-3`}>
                <Text 
                  style={className`font-semibold text-gray-800 text-sm leading-5`}
                  numberOfLines={2}
                >
                  {item.strMeal}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={className`flex-1 justify-center items-center py-10`}>
          <Text style={className`text-gray-500 text-lg mb-2`}>
            No recipes found
          </Text>
          <Text style={className`text-gray-400 text-center px-8`}>
            Try selecting a different category or search for something else
          </Text>
        </View>
      )}
    </View>
  );
};

export default RecipeGrid;