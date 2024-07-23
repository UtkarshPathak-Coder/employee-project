data "azurerm_resource_group" "existing" {
  name = "Utkarsh-Pathak-rg" 
}


resource "azurerm_container_registry" "main" {
  name                = var.acr_name
  resource_group_name = data.azurerm_resource_group.existing.name
  location            = var.location
  sku                 = "Standard"

  admin_enabled = true
}
