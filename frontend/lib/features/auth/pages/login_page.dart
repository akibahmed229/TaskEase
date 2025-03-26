import 'package:flutter/material.dart';
import 'package:frontend/features/auth/pages/signup_page.dart';

class LoginPage extends StatefulWidget {
  static MaterialPageRoute route() => MaterialPageRoute(
        builder: (context) => const LoginPage(),
      );

  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // Create controllers for the text fields to store the user input
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    // Dispose of the controllers when the widget is removed from the tree
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  void loginUser() {
    if (_formKey.currentState!.validate()) {
      // If the form is valid, perform the sign up operation
      // Call the API to sign up the user
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.all(15),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Login",
                style: TextStyle(
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                ),
              ),

              // Email
              const SizedBox(height: 30),
              TextFormField(
                controller: emailController,
                validator: (value) {
                  if (value!.trim().isEmpty || !value.contains("@")) {
                    return "Enter a valid email!";
                  }
                },
                decoration: const InputDecoration(
                  labelText: "Email",
                ),
              ),
              // Password
              const SizedBox(height: 20),
              TextFormField(
                controller: passwordController,
                validator: (value) {
                  if (value!.trim().isEmpty || value.length < 6) {
                    return "Password must be at least 6 characters long!";
                  }
                },
                decoration: const InputDecoration(
                  labelText: "Password",
                ),
              ),

              // Sign Up Button
              const SizedBox(height: 30),
              ElevatedButton(
                onPressed: loginUser,
                child: const Text(
                  "Login",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                  ),
                ),
              ),

              // Don't have an account? Sign In
              const SizedBox(height: 20),
              GestureDetector(
                onTap: () {
                  // Navigate to the sign up page and destroy the current page from the stack
                  Navigator.of(context).pushReplacement(SignupPage.route());
                },
                child: RichText(
                  text: TextSpan(
                    text: "Don't have an account? ",
                    style: Theme.of(context).textTheme.titleMedium,
                    children: const [
                      TextSpan(
                        text: "Sign In",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
