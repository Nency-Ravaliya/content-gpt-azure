# Content GPT

A web application that leverages Azure OpenAI to generate content. This application is deployed on Azure Container Apps with secure environment variable management using Azure Key Vault.

## Features

- Modern React-based frontend
- Azure OpenAI integration
- Secure environment variable management with Azure Key Vault
- Containerized deployment on Azure Container Apps
- Scalable architecture with automatic scaling

## Detailed Project Description

1. **AI-Driven Content Generation**: Developed an AI-driven content generation platform using Azure OpenAI services. The platform leverages GPT-4 models to generate high-quality content for various social media platforms.
2. **Scalable Cloud Infrastructure**: Implemented a scalable cloud infrastructure for the content generation platform using Azure services. The infrastructure supports high availability and fault tolerance.
3. **CI/CD Pipeline**: Established a CI/CD pipeline for the content generation platform to automate the build, test, and deployment processes. Utilized Azure DevOps for continuous integration and delivery.
4. **Content Analysis and Sentiment Detection**: Integrated Azure Cognitive Services for enhanced content analysis and sentiment detection.
5. **Content Generation**: Integrated Azure OpenAI to generate content based on user prompts.
6. **Platform-Specific Formatting**: Customized content generation to fit the style and format of different platforms like Twitter, LinkedIn, Facebook, Instagram, and WhatsApp.
7. **User Interface**: Developed a user-friendly interface using React and Tailwind CSS to allow users to input prompts and view generated content.
8. **Error Handling**: Implemented robust error handling to manage API errors and provide feedback to users.
9. **Deployment**: Deployed the application on Azure for high availability and scalability.
10. **Impact**: Cut content creation time by 70%, ensured high availability, and maintained consistent formatting across platforms.

## Tech Stack

### Languages
- Java
- JavaScript
- Python
- HTML
- CSS
- SQL
- C
- C++

### Strongest Area
- Problem Solving
- System Design
- Data Structures
- Algorithms
- OOPs
- Databases
- Networking

### Frameworks
- Java Spring
- Maven
- Gradle
- Flask
- Node.js
- React

### Tools
- Spring Tool Suite
- PostgreSQL
- Git
- Terraform
- MySQL
- Postman
- DBMS

### Cloud
- Helm
- Kubernetes
- AWS
- Azure DevOps
- OpenShift Container Platform

## Prerequisites

- Node.js (v20 or later)
- Docker
- Azure CLI
- Azure subscription
- Azure OpenAI service
- Azure Container Registry
- Azure Key Vault

## Environment Variables

The application uses the following environment variables, which are securely stored in Azure Key Vault:

- `VITE_AZURE_OPENAI_ENDPOINT`: Azure OpenAI endpoint URL
- `VITE_AZURE_OPENAI_KEY`: Azure OpenAI API key
- `VITE_AZURE_OPENAI_DEPLOYMENT`: Azure OpenAI deployment name

## Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd content-gpt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   VITE_AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
   VITE_AZURE_OPENAI_KEY=your_azure_openai_key
   VITE_AZURE_OPENAI_DEPLOYMENT=your_azure_openai_deployment
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Building the Docker Image

1. Build the Docker image:
   ```bash
   docker buildx build --platform linux/amd64 -t contentgpt.azurecr.io/content-gpt:latest .
   ```

2. Push the image to Azure Container Registry:
   ```bash
   az acr login --name contentgpt
   docker push contentgpt.azurecr.io/content-gpt:latest
   ```

## Azure Deployment

### 1. Azure Key Vault Setup

1. Create secrets in Azure Key Vault:
   ```bash
   az keyvault secret set --vault-name content-gpt-kv --name azure-openai-endpoint --value "your_azure_openai_endpoint"
   az keyvault secret set --vault-name content-gpt-kv --name azure-openai-key --value "your_azure_openai_key"
   az keyvault secret set --vault-name content-gpt-kv --name azure-openai-deployment --value "your_azure_openai_deployment"
   ```

2. Grant access to the Container App's managed identity:
   ```bash
   az role assignment create --assignee <container-app-principal-id> --scope /subscriptions/<subscription-id>/resourceGroups/content-gpt-rg/providers/Microsoft.KeyVault/vaults/content-gpt-kv --role "Key Vault Secrets User"
   ```

### 2. Azure Container App Deployment

1. Deploy using the Azure Container App configuration:
   ```bash
   az containerapp update --name content-gpt-app --resource-group content-gpt-rg --image contentgpt.azurecr.io/content-gpt:latest
   ```

2. Verify the deployment:
   ```bash
   az containerapp show --name content-gpt-app --resource-group content-gpt-rg
   ```

## Application URL

The application is accessible at:
```
https://content-gpt-app.redtree-8bacaf91.eastus.azurecontainerapps.io
```

## Security

- All sensitive credentials are stored in Azure Key Vault
- Environment variables are securely managed through Azure Container Apps
- The application uses HTTPS for all communications
- Access to the Key Vault is restricted to the Container App's managed identity

## Monitoring

- Application logs can be viewed through Azure Monitor
- Container App metrics are available in the Azure Portal
- Key Vault access logs can be monitored for security purposes

## Troubleshooting

1. Check Container App logs:
   ```bash
   az containerapp logs show --name content-gpt-app --resource-group content-gpt-rg
   ```

2. Verify Key Vault access:
   ```bash
   az keyvault secret list --vault-name content-gpt-kv
   ```

3. Check Container App status:
   ```bash
   az containerapp show --name content-gpt-app --resource-group content-gpt-rg --query "properties.runningStatus"
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
