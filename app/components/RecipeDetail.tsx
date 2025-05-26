import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import className from "twrnc";
import axios from "axios";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  visible: boolean;
}

interface RecipeDetails {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  [key: string]: any;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose, visible }) => {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && recipe) {
      fetchRecipeDetails();
    }
  }, [visible, recipe]);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
      );
      
      if (response.data.meals && response.data.meals[0]) {
        setRecipeDetails(response.data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = (meal: RecipeDetails) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
    return ingredients;
  };

  if (!visible) return null;

  return (
    <View style={className`absolute inset-0 bg-black bg-opacity-50 justify-center items-center`}>
      <View style={className`bg-white w-11/12 max-h-4/5 rounded-xl overflow-hidden`}>
        {/* Header */}
        <View style={className`flex-row justify-between items-center p-4 border-b border-gray-200`}>
          <Text style={className`text-lg font-bold flex-1`}>Recipe Details</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={className`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#f97316" />
            <Text style={className`text-gray-500 mt-2`}>Loading recipe...</Text>
          </View>
        ) : recipeDetails ? (
          <ScrollView style={className`flex-1`}>
            <Image
              source={{ uri: recipeDetails.strMealThumb }}
              style={className`w-full h-48`}
              resizeMode="cover"
            />
            
            <View style={className`p-4`}>
              <Text style={className`text-xl font-bold text-gray-800 mb-2`}>
                {recipeDetails.strMeal}
              </Text>
              
              <View style={className`flex-row mb-4`}>
                <Text style={className`bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm mr-2`}>
                  {recipeDetails.strCategory}
                </Text>
                <Text style={className`bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm`}>
                  {recipeDetails.strArea}
                </Text>
              </View>

              {/* Ingredients */}
              <Text style={className`text-lg font-bold text-gray-800 mb-2`}>Ingredients</Text>
              {getIngredients(recipeDetails).map((item, index) => (
                <Text key={index} style={className`text-gray-600 mb-1`}>
                  • {item.measure} {item.ingredient}
                </Text>
              ))}

              {/* Instructions */}
              <Text style={className`text-lg font-bold text-gray-800 mb-2 mt-4`}>Instructions</Text>
              <Text style={className`text-gray-600 leading-6`}>
                {recipeDetails.strInstructions}
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View style={className`flex-1 justify-center items-center`}>
            <Text style={className`text-gray-500`}>Failed to load recipe details</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RecipeDetail;