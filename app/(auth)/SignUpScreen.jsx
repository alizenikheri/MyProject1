import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import className from 'twrnc';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigation to home is handled by auth state change in _layout.js
      // Don't manually navigate - let the layout handle it
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={className`flex-1 justify-center bg-white p-5`}
    >
      <View style={className`items-center mb-10`}>
        <View style={className`w-32 h-32 bg-orange-500 rounded-full items-center justify-center mb-4`}>
          <Text style={className`text-white text-4xl font-bold`}>F</Text>
        </View>
        <Text style={className`text-2xl font-bold mt-4`}>Create Account</Text>
      </View>

      {error ? (
        <View style={className`bg-red-100 p-3 rounded-lg mb-5`}>
          <Text style={className`text-red-600 text-center`}>{error}</Text>
        </View>
      ) : null}

      <View style={className`mb-5`}>
        <Text style={className`text-gray-600 mb-2`}>Email</Text>
        <TextInput
          style={className`border border-gray-300 rounded-lg p-3`}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={className`mb-5`}>
        <Text style={className`text-gray-600 mb-2`}>Password</Text>
        <TextInput
          style={className`border border-gray-300 rounded-lg p-3`}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={className`mb-5`}>
        <Text style={className`text-gray-600 mb-2`}>Confirm Password</Text>
        <TextInput
          style={className`border border-gray-300 rounded-lg p-3`}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={className`bg-orange-500 p-3 rounded-lg mb-5`}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={className`text-white text-center font-bold`}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <View style={className`flex-row justify-center`}>
        <Text style={className`text-gray-600`}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/SignIn')}>
          <Text style={className`text-orange-500 font-bold`}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;