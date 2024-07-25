data "azurerm_resource_group" "existing" {
  name = "Utkarsh-Pathak-rg" 
}

resource "azurerm_eventhub_namespace" "ehub" {
  name                = var.namespace_name
  location            = var.location
  resource_group_name = data.azurerm_resource_group.existing.name
  sku                 = var.sku
}

resource "azurerm_eventhub" "eventhub" {
  name                = var.eventhub_name
  resource_group_name = data.azurerm_resource_group.existing.name
  namespace_name      = azurerm_eventhub_namespace.ehub.name
  partition_count     = var.partition_count
  message_retention   = var.message_retention
}

resource "azurerm_eventhub_consumer_group" "consumer_group" {
  name                = var.consumer_group_name
  resource_group_name = data.azurerm_resource_group.existing.name
  namespace_name      = azurerm_eventhub_namespace.ehub.name
  eventhub_name       = azurerm_eventhub.eventhub.name
}
resource "azurerm_eventhub_authorization_rule" "send_listen_rule" {
  name                = "${var.eventhub_name}-send-listen-rule"
  namespace_name      = azurerm_eventhub_namespace.ehub.name
  resource_group_name = data.azurerm_resource_group.existing.name
  eventhub_name       = azurerm_eventhub.eventhub.name
  listen              = true
  send                = true
}