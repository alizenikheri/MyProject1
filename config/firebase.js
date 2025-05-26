import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdnYI-zTvdq71BOtbFn-y67vqelpcic1I",
  authDomain: "foody-5d5b0.firebaseapp.com",
  projectId: "foody-5d5b0",
  storageBucket: "foody-5d5b0.firebasestorage.app",
  messagingSenderId: "953786465306",
  appId: "1:953786465306:web:bd05d16520c805c1bb65a3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Named export