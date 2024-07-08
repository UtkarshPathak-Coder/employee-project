terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.59.0"
    }
  }
  backend "azurerm" {
    resource_group_name   = 
    storage_account_name  = "Sagar-Heera–VS-MPN"
    container_name        = "akscontainer"
    key                   = "terraform.tfstate"
    subscription_id       = "14d51dca-be7f-45d5-83f7-bc5ba5a5cfcb"
    tenant_id             = "fe2cf472-1615-4350-ae39-21441d02fbf1"
  }
}

# Configure the Azure provider
provider "azurerm" {
  features {}
  environment     = "public"
  subscription_id = "14d51dca-be7f-45d5-83f7-bc5ba5a5cfcb"
  tenant_id       = "fe2cf472-1615-4350-ae39-21441d02fbf1"
}
