# Study Resource Manager

A modern web application for organizing and tracking your study resources across different subjects.

## Features

- **Subject-Based Organization**: Group resources by topics (React, System Design, etc.)
- **Resource Management**: Add websites, GitHub repos, notes, videos, books, and courses
- **Progress Tracking**: Monitor completion status and time spent
- **Search & Filter**: Find resources quickly with advanced filtering
- **Local Storage**: All data persists automatically in your browser
- **Toast Notifications**: Get feedback on all actions using React Toastify
- **Responsive Design**: Works perfectly on desktop and mobile

## How to Use

### Creating Subjects
1. Go to the "Groups" page
2. Click "Create Group"
3. Add a name, description, priority, and choose colors/icons
4. Save your subject

### Adding Resources
1. Click on any subject card to open it
2. Click "Add Resource" 
3. Fill in the details and select the resource type
4. Resources are automatically saved to the subject

### Managing Resources
- **Click subject cards** to view all resources for that topic
- **Use "Open All Links"** to open all URLs from a subject in new tabs
- **Track progress** by updating status (not started → in progress → completed)
- **Search and filter** to find specific resources quickly

## Project URL

**Lovable Project**: https://lovable.dev/projects/cf3d0efc-4faa-413d-9964-382eadd0ff60

## Technology Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Toastify for notifications
- Local Storage for data persistence
- Shadcn/ui components
- Lucide React icons
- Vite for development

## Publishing Your App

To publish this app and get a live link:

1. **In Lovable**: Click the "Publish" button in the top-right corner of the Lovable interface
2. **Deploy**: Lovable will automatically build and deploy your app
3. **Get your link**: You'll receive a live URL like `your-project-name.lovable.app`

### Custom Domain (Optional)
If you want a custom domain:
1. Go to Project Settings → Domains in Lovable
2. Click "Connect Domain" and enter your domain name
3. Configure DNS settings as instructed (A record pointing to 185.158.133.1)
4. Wait for DNS propagation and SSL certificate provisioning (up to 48 hours)

## Local Development

If you want to work locally using your own IDE:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start development server
npm run dev
```

## Data Storage

All your data is stored locally in your browser using localStorage. Your subjects and resources will persist between sessions, but remember to export/backup important data if needed.

## Support

For issues or questions:
- Check the Lovable project interface for editing
- Use the browser console for debugging
- Refer to [Lovable Documentation](https://docs.lovable.dev)