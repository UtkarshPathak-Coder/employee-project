data "azurerm_resource_group" "existing" {
  name = "Utkarsh-Pathak-rg" 
}

resource "azurerm_servicebus_namespace" "sb" {
  name                = var.namespace_name
  location            = var.location
   resource_group_name = data.azurerm_resource_group.existing.name
  sku                 = var.sku
}

resource "azurerm_servicebus_queue" "queue" {
  name                = var.queue_name
  namespace_id      = azurerm_servicebus_namespace.sb.id
}
resource "azurerm_servicebus_queue_authorization_rule" "send_listen_policy" {
  name                = "send-listen-policy"
  queue_id          = azurerm_servicebus_queue.queue.id
  listen              = true
  send                = true
  manage              = false
}
