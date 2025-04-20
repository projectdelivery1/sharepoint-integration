

2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```plaintext
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_client_secret
MICROSOFT_TENANT_ID=your_tenant_id
REDIRECT_URI=http://localhost:3000/api/auth/callback
```


4. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Configuration

### SharePoint App Registration

1. Register a new application in the Azure Portal
2. Set up the required permissions:

1. Sites.Read.All
2. Sites.ReadWrite.All
3. Files.ReadWrite.All



3. Configure the redirect URI to match your environment
4. Generate a client secret


### eGain API Setup

1. Obtain API credentials from your eGain administrator
2. Configure the API username and password in the application


## Usage

### Setting Up a SharePoint Integration

1. Navigate to the "Add a SharePoint Instance" page
2. Choose an authentication method (delegated or app-level)
3. Complete the required configuration fields
4. Save the configuration to establish the connection


### Managing Content Synchronization

1. Access the Overview tab to view synchronization status
2. Use the "Sync Now" button to trigger manual synchronization
3. Monitor indexing progress through the dashboard


### Configuring Settings

1. Navigate to the Settings tab
2. Adjust sync frequency, content types, and permission settings
3. Save changes to update the configuration


## Project Structure

```
egain-sharepoint-integration/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── overview/         # Overview page
│   ├── query/            # Query interface
│   └── page.tsx          # Main page
├── components/           # React components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions and services
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Microsoft Graph API](https://developer.microsoft.com/en-us/graph)


