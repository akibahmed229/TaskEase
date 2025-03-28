import 'package:flutter/material.dart';
import 'package:frontend/features/auth/pages/login_page.dart';

class SignupPage extends StatefulWidget {
  static MaterialPageRoute route() => MaterialPageRoute(
        builder: (context) => const SignupPage(),
      );

  const SignupPage({super.key});

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  // Create controllers for the text fields to store the user input
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final nameController = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    // Dispose of the controllers when the widget is removed from the tree
    emailController.dispose();
    passwordController.dispose();
    nameController.dispose();
    super.dispose();
  }

  void signUpUser() {
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
                "Sign Up",
                style: TextStyle(
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                ),
              ),

              // Name
              const SizedBox(height: 30),
              TextFormField(
                controller: nameController,
                validator: (value) {
                  if (value!.trim().isEmpty) {
                    return "Name is required!";
                  }
                },
                decoration: const InputDecoration(
                  labelText: "Name",
                ),
              ),
              // Email
              const SizedBox(height: 20),
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
                onPressed: signUpUser,
                child: const Text(
                  "Sign Up",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                  ),
                ),
              ),

              // Already have an account? Login
              const SizedBox(height: 20),
              GestureDetector(
                onTap: () {
                  Navigator.of(context).pushReplacement(LoginPage.route());
                },
                child: RichText(
                  text: TextSpan(
                    text: "Already have an account? ",
                    style: Theme.of(context).textTheme.titleMedium,
                    children: const [
                      TextSpan(
                        text: "Login",
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
