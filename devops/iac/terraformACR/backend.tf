terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.59.0"
    }
  }
  backend "azurerm" {
    resource_group_name   = var.backend_resource_group
    storage_account_name  = var.backend_storage_account
    container_name        = var.backend_container_name
    key                   = var.backend_key
    subscription_id       = var.azure_subscription_id
    tenant_id             = var.azure_tenant_id
  }
}

# Configure the Azure provider
provider "azurerm" {
  features {}
  environment     = "public"
  subscription_id = var.azure_subscription_id
  tenant_id       = var.azure_tenant_id
}
