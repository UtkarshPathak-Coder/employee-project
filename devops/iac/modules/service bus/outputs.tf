output "servicebus_namespace_id" {
  value = azurerm_servicebus_namespace.sb.id
}

output "servicebus_queue_id" {
  value = azurerm_servicebus_queue.queue.id
}
output "servicebus_queue_send_listen_primary_connection_string" {
  value = azurerm_servicebus_queue_authorization_rule.send_listen_policy.primary_connection_string
  sensitive = true
}