terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"  
      version = "~> 2.13"  
    }
  }
}
provider "docker" {
  host = "unix:///var/run/docker.sock"
}

provider "azurerm" {
  features {}
  skip_provider_registration = true
}

provider "kubernetes" {
  host                   = data.azurerm_kubernetes_cluster.aks.kube_config.0.host
  client_certificate     = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.client_certificate)
  client_key             = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.client_key)
  cluster_ca_certificate = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.cluster_ca_certificate)
}
