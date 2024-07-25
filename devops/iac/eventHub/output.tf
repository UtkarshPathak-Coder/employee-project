output "eventhub_namespace_id" {
  value = azurerm_eventhub_namespace.ehub.id
}

output "eventhub_id" {
  value = azurerm_eventhub.eventhub.id
}

output "consumer_group_id" {
  value = azurerm_eventhub_consumer_group.consumer_group.id
}
output "eventhub_queue_send_listen_primary_connection_string" {
  value = azurerm_eventhub_authorization_rule.send_listen_rule.primary_connection_string
  sensitive = true
}