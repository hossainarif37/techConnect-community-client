# TechConnect - Tech Community Platform

TechConnect is a social platform designed to solve the tech community’s need for organized,
accessible information and professional networking. By categorizing posts (e.g., Web Development, Freelancing) users can easily find relevant content, engage with others, and access resources that support their career growth.

This project showcases my expertise in **full-stack web development** and includes core functionalities such as content categorization, community interactions, secure authentication, and an admin dashboard.

---

## 🚀 Features
### **1. Post Management**
- Create, update, and delete posts.
- Like/unlike posts and view likes.
- Category-based post filtering for better content organization.

### **2. Comments Section**
- Add, update, and delete comments on posts.
- Fetch latest comments efficiently for each post.
- Load additional comments only when requested, optimizing performance.

### **3. Profile Management**
- User profiles with personalized data.
- Tabs to display posts, comments, or liked posts by the user.

---

## 🔜 Upcoming Features
### **1. User Management**
- **Role-based access**: Users, Moderators, Admins.
- Moderator and admin roles for managing content and users.

### **2. Admin Dashboard**
- Manage users, moderators, and content.
- Monitor platform activities and enforce community guidelines.
- Analytics and reporting tools for platform insights.

### **3. OAuth Integration**
- Third-party sign-ins (e.g., Google, GitHub).

### **4. Additional Features**
- User-contributed Resources: Users will be able to add their own books and courses, enhancing the platform’s library.
- Location-Based Job/Meetup Filtering
- Categorized Course Filtering and Books
- Real-Time Notifications
- Direct Messaging System
- User Following System

---

## 🛠️ Technologies I Used
- **Frontend**: Next.js, Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend**: Node.js, Express.js (see [backend repository](https://github.com/hossainarif37/techConnect-community-server.git))
- **Authentication**: JWT
- **Payment Integration**: Stripe

---

## 💡 Project Goals
This project was built to:
1. **Enhance my skills** in designing a full-stack application from scratch.
2. Implement **real-world functionality** for content management, community interactions, and secure authentication.
3. Showcase my ability to build scalable and maintainable systems.

---

## 📦 Workflow
1. **User**: Create and interact with content, engage with the community, and manage their profile.
2. **Moderator**: Oversee content quality, manage user interactions, and enforce community guidelines.
3. **Admin**: Manage users, moderators, content, and platform settings.

---

## 🔗 Project Links
- **Backend Repository**: [TechConnect Server Repository](https://github.com/hossainarif37/techConnect-community-server.git)
- **Live Demo**: [TechConnect Platform](https://tech-connect-community.vercel.app)

---

## ⚙️ Local Setup

### **Frontend Setup**
1. **Clone the repository**:
    ```bash
    git clone https://github.com/hossainarif37/techConnect-community-client.git
    cd techConnect-community-client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment**:
    Create a `.env` file with:
    ```bash
    NEXT_PUBLIC_SERVER_BASE_URL="http://localhost:5000/api/v1"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_cloudinary_upload_preset"
    ```

4. **Run the application**:
    ```bash
    npm run dev
    ```

5. **Access the app**:
    Open your browser at `http://localhost:3000`