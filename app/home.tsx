import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import className from "twrnc";
import axios from "axios";

// Assuming these are your imported icons
import PersonIcon from "@/assets/PersonIcon";
import BellIcon from "@/assets/BellIcon";
import SearchIcon from "@/assets/SearchIcon";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch meal categories using Axios
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE}/categories.php`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch meals by category using Axios
  const fetchMealsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/filter.php?c=${category}`);
      if (response.data.meals) {
        setRecipes(response.data.meals);
      } else {
        setRecipes([]); // Clear recipes if no meals found for the category
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category click
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchMealsByCategory(category);
  };

  return (
    <View style={className`flex-1`}>
      {/* Header */}
      <View style={className`p-5 flex-row items-center justify-between`}>
        <PersonIcon />
        <BellIcon />
      </View>

      {/* Texts */}
      <View style={className`p-5 pt-0`}>
        <Text style={className`text-semibold text-lg`}>Salam 3liqom</Text>
        <Text style={className`text-bold text-3xl`}>
          Make your own food ^ stay at{" "}
          <Text style={className`text-orange-500`}>home</Text>
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={className`bg-gray-200 p-1 px-2 rounded-full mx-5 flex-row items-center justify-between`}
      >
        <TextInput
          placeholder="Search any recipe"
          style={className`flex-1 text-lg font-semibold text-gray-500 p-3 rounded-l-full`}
        />
        <SearchIcon />
      </View>

      {/* Categories Section */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={className`gap-5 p-5`}
          data={categories}
          keyExtractor={(item) => item.idCategory}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={className`items-center`}
              onPress={() => handleCategoryClick(item.strCategory)}
            >
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={className`h-13 w-17 bg-gray-300 rounded-full`}
              />
              <Text style={className`font-semibold text-gray-500 mt-1`}>{item.strCategory}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Recipes Section */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={className`px-5 text-3xl font-semibold`}>
            Recipes {selectedCategory ? `: ${selectedCategory}` : ""}
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#f97316" />
          ) : (
            // If no recipes are found, show categories again
            recipes.length > 0 ? (
              <FlatList
                data={recipes}
                numColumns={2}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                  <View style={className`flex-1 p-5 items-center`}>
                    <Image
                      source={{ uri: item.strMealThumb }}
                      style={className`h-28 w-42 rounded-lg`}
                    />
                    <Text style={className`text-center font-semibold text-gray-500 mt-1`}>
                      {item.strMeal}
                    </Text>
                  </View>
                )}
              />
            ) : (
              <View style={className`p-5`}>
                <Text style={className`px-5 text-gray-500`}>
                  No recipes found for this category.
                </Text>
                <Text style={className`px-5 text-gray-500`}>
                  You can explore other categories or try searching.
                </Text>
                {/* Show categories list again when no recipes are found */}
                <FlatList
                  
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={className`gap-5 p-5`}
                  data={categories}
                  keyExtractor={(item) => item.idCategory}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={className`items-center`}
                      onPress={() => handleCategoryClick(item.strCategory)}
                    >
                      <Image
                        source={{ uri: item.strCategoryThumb }}
                        style={className`h-13 w-17 bg-gray-300 rounded-full`}
                      />
                      <Text style={className`font-semibold text-gray-500 mt-1`}>
                        {item.strCategory}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
