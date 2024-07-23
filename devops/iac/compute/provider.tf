terraform {
  
}

provider "azurerm" {
  features {}
  subscription_id = "14d51dca-be7f-45d5-83f7-bc5ba5a5cfcb"
  tenant_id       = "fe2cf472-1615-4350-ae39-21441d02fbf1"
}

provider "kubernetes" {
  host                   = data.azurerm_kubernetes_cluster.aks.kube_config.0.host
  client_certificate     = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.client_certificate)
  client_key             = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.client_key)
  cluster_ca_certificate = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.cluster_ca_certificate)
}
