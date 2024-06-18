terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"  # Update to the correct provider source
      version = "~> 2.13"  # Specify the version constraint if needed
    }
  }
}
provider "azurerm" {
  features {}
  skip_provider_registration = true
  # Add other provider configuration here as needed
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}
