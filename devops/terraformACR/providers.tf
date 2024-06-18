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
  skip_provider_registration = true
  
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}
