terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"  
      version = "~> 2.13"  
    }
  }
}
provider "azurerm" {
  features {}
  subscription_id = "14d51dca-be7f-45d5-83f7-bc5ba5a5cfcb"
  tenant_id       = "fe2cf472-1615-4350-ae39-21441d02fbf1"
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}
