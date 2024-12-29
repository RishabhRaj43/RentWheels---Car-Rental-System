PrivateRoute has been used to protect routes that need authentication.

# Backend
Api calls in backend

## Routes

### User
- Login - /api/auth/login
- Register - /api/auth/register
- Logout - /api/auth/logout
- GetUser - /api/auth/getUser/:id
- UpdateUser - /api/auth/updateUser/:id
- DeleteUser - /api/auth/deleteUser/:id

### Contact
- Add to Contact - /api/contact/:id

### Chat



Folder Structure

src
- Components <!-- Reusables components used in the app -->
- Pages <!-- Pages of the app -->
- Utils <!-- Global State (Zustand is used) for the app -->
- Services <!-- API Services used in the app -->