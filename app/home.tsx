// Home.tsx (Updated with improved logout functionality)
import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import className from "twrnc";
import axios from "axios";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; // Adjust the import path as necessary
import Header from "./components/Header";
import WelcomeSection from "./components/WelcomeSection";
import CategoryList from "./components/CategoryList";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetail from "./components/RecipeDetail";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Beef");
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch default category (Beef) recipes on mount
  useEffect(() => {
    if (selectedCategory) {
      fetchMealsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE}/categories.php`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Alert.alert("Error", "Failed to fetch categories");
    }
  };

  const fetchMealsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/filter.php?c=${category}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
      Alert.alert("Error", "Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    fetchMealsByCategory(category);
  };

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDetail(true);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              // Show loading state (optional)
              // console.log("Logging out...");
              
              // Sign out from Firebase
              await signOut(auth);
              
              // Clear local state
              setSelectedCategory("Beef");
              setRecipes([]);
              setSelectedRecipe(null);
              setShowRecipeDetail(false);
              setCategories([]);
              
              // console.log("Logout successful, navigating to sign in...");
              
              // Navigate to sign in screen
              router.replace("/(auth)/SignInScreen");
              
            } catch (error) {
              console.error("Error logging out:", error);
              Alert.alert(
                "Logout Error", 
                "Failed to logout. Please try again.",
                [{ text: "OK" }]
              );
            }
          }
        }
      ]
    );
  };

  return (
    <View style={className`flex-1 bg-gray-50`}>
      <Header onLogout={handleLogout} />
      
      <ScrollView style={className`flex-1`} showsVerticalScrollIndicator={false}>
        <WelcomeSection />
        
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        
        <RecipeGrid
          recipes={recipes}
          selectedCategory={selectedCategory}
          loading={loading}
          onRecipePress={handleRecipePress}
        />
      </ScrollView>

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          visible={showRecipeDetail}
          onClose={() => {
            setShowRecipeDetail(false);
            setSelectedRecipe(null);
          }}
        />
      )}
    </View>
  );
};

export default Home;