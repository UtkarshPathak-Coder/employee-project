output "eventhub_namespace_id" {
  value = azurerm_eventhub_namespace.ehub.id
}

output "eventhub_id" {
  value = azurerm_eventhub.eventhub.id
}

output "consumer_group_id" {
  value = azurerm_eventhub_consumer_group.consumer_group.id
}
