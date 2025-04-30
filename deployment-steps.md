# Azure Container Apps Deployment Guide

This document outlines the steps taken to deploy the Content GPT application to Azure Container Apps.

## Prerequisites Installation

1. Install Azure CLI:
```bash
brew install azure-cli
```

2. Install Docker Desktop:
```bash
brew install --cask docker
```

## Environment Setup

1. Create a copy of the environment variables file:
```bash
cp environment.env.example .env
```

2. Update the environment variables in `.env` with your specific values:
```env
# Azure Resource Names
RESOURCE_GROUP=content-gpt-rg
LOCATION=eastus
ACR_NAME=contentgpt
CONTAINER_APP_ENV=content-gpt-env
CONTAINER_APP_NAME=content-gpt-app
KEY_VAULT_NAME=content-gpt-kv

# Container Configuration
IMAGE_NAME=content-gpt
IMAGE_TAG=latest
CONTAINER_PORT=80
MIN_REPLICAS=1
MAX_REPLICAS=10
CPU=0.5
MEMORY=1Gi

# Azure Container Registry
ACR_LOGIN_SERVER=your-acr-name.azurecr.io
FULL_IMAGE_NAME=${ACR_LOGIN_SERVER}/${IMAGE_NAME}:${IMAGE_TAG}

# Application URLs
APP_URL=https://your-container-app-url.azurecontainerapps.io

# Azure Subscription
SUBSCRIPTION_ID=your-subscription-id

# Azure Container Registry Credentials
# Note: These should be managed through Azure Managed Identity or Service Principal
# Do not store credentials in environment files

# Azure OpenAI Configuration
AZURE_OPENAI_KEY=your_key_here  # Replace with your actual OpenAI key
```

## Azure Resource Creation

1. Login to Azure:
```bash
az login
```

2. Create Resource Group:
```bash
az group create --name $RESOURCE_GROUP --location $LOCATION
```

3. Create Azure Container Registry:
```bash
az acr create --resource-group $RESOURCE_GROUP --name $ACR_NAME --sku Basic
```

4. Enable Admin Access for ACR:
```bash
az acr update --name $ACR_NAME --admin-enabled true
```

5. Create Azure Container Apps Environment:
```bash
az containerapp env create --name $CONTAINER_APP_ENV --resource-group $RESOURCE_GROUP --location $LOCATION
```

6. Create Azure Key Vault:
```bash
az keyvault create --name $KEY_VAULT_NAME --resource-group $RESOURCE_GROUP --location $LOCATION
```

## Docker Image Build and Push

1. Login to Azure Container Registry:
```bash
az acr login --name $ACR_NAME
```

2. Build Docker Image for AMD64 Architecture:
```bash
docker buildx build --platform linux/amd64 -t $FULL_IMAGE_NAME .
```

3. Push the image to Azure Container Registry:
```bash
docker push $FULL_IMAGE_NAME
```

## Security Best Practices

1. **Never store credentials in code or configuration files**
   - Use Azure Key Vault for secrets
   - Use Managed Identities for service authentication
   - Use Service Principals for CI/CD pipelines

2. **Environment Variables**
   - Use `.env.example` as a template
   - Add `.env` to `.gitignore`
   - Use placeholders for sensitive values

3. **Azure Container Registry**
   - Use Managed Identity for authentication
   - Enable admin access only when necessary
   - Regularly rotate credentials

4. **Azure Key Vault**
   - Store all secrets in Key Vault
   - Use RBAC for access control
   - Enable soft delete and purge protection

5. **Container Apps**
   - Use Managed Identity for authentication
   - Reference secrets from Key Vault
   - Enable HTTPS only
   - Configure proper scaling rules

## Deployment Verification

1. Check Container App Status:
```bash
az containerapp show --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP
```

2. Verify Environment Variables:
```bash
az containerapp env list --resource-group $RESOURCE_GROUP
```

3. Check Key Vault Access:
```bash
az keyvault secret list --vault-name $KEY_VAULT_NAME
```

## Troubleshooting

1. **Container App Issues**
   ```bash
   # Check logs
   az containerapp logs show --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP
   
   # Check status
   az containerapp show --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP --query "properties.runningStatus"
   ```

2. **Key Vault Access Issues**
   ```bash
   # Verify access
   az keyvault secret list --vault-name $KEY_VAULT_NAME
   
   # Check role assignments
   az role assignment list --assignee <principal-id> --scope /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.KeyVault/vaults/$KEY_VAULT_NAME
   ```

3. **Container Registry Issues**
   ```bash
   # Verify login
   az acr login --name $ACR_NAME
   
   # List images
   az acr repository list --name $ACR_NAME
   ```

## Container App Deployment

1. Create Initial Container App:
```bash
az containerapp create \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINER_APP_ENV \
  --image nginx \
  --target-port $CONTAINER_PORT \
  --ingress external
```

2. Update Container App with Custom Image:
```bash
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --image $FULL_IMAGE_NAME
```

## Application Access

The application is accessible at:
```
$APP_URL
```

## Resource Details

- Resource Group: `$RESOURCE_GROUP`
- Location: `$LOCATION`
- Container Registry: `$ACR_LOGIN_SERVER`
- Container Apps Environment: `$CONTAINER_APP_ENV`
- Container App: `$CONTAINER_APP_NAME`
- Key Vault: `$KEY_VAULT_NAME`

## Configuration Files

### Dockerfile
```dockerfile
# Build stage
FROM --platform=linux/amd64 node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM --platform=linux/amd64 nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### azure-container-app.yaml
```yaml
name: ${CONTAINER_APP_NAME}
location: ${LOCATION}
resourceGroup: ${RESOURCE_GROUP}
properties:
  managedEnvironmentId: /subscriptions/b127d0c6-3b4e-48e9-b991-dc8522af2d0f/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.App/managedEnvironments/${CONTAINER_APP_ENV}
  configuration:
    ingress:
      external: true
      targetPort: ${CONTAINER_PORT}
      transport: http
    secrets:
      - name: azure-openai-key
        keyVaultReference:
          secretIdentifier: https://${KEY_VAULT_NAME}.vault.azure.net/secrets/azure-openai-key
  template:
    containers:
      - name: ${IMAGE_NAME}
        image: ${FULL_IMAGE_NAME}
        resources:
          cpu: ${CPU}
          memory: ${MEMORY}
        env:
          - name: AZURE_OPENAI_KEY
            secretRef: azure-openai-key
    scale:
      minReplicas: ${MIN_REPLICAS}
      maxReplicas: ${MAX_REPLICAS}
      rules:
        - name: http-rule
          http:
            metadata:
              concurrentRequests: "100"
```

## Environment Variables
The deployment uses environment variables to maintain consistency across different environments. These variables are stored in a `.env` file (not tracked in git) and an example file `environment.env.example` is provided as a template.

### Important Notes:
1. Never commit the `.env` file to version control
2. Always update the environment variables before running the deployment commands
3. Make sure to set the correct `AZURE_OPENAI_KEY` value in your environment 