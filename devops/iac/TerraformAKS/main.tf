data "azurerm_resource_group" "existing" {
  name = "Utkarsh-Pathak-rg" 
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_name
  location            = var.location
  resource_group_name = data.azurerm_resource_group.existing.name
  dns_prefix          = var.dns_prefix

  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.vm_size
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Development"
  }
}

data "azurerm_kubernetes_cluster" "aks" {
  name                = azurerm_kubernetes_cluster.aks.name
  resource_group_name = data.azurerm_resource_group.existing.name

  depends_on = [azurerm_kubernetes_cluster.aks]
}

